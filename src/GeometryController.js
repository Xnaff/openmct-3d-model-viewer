define([], function () {

    function GeometryController(geometryObject, domainObject, openmct) {
        this.geometryObject = geometryObject;
        this.openmct = openmct;
        this.domainObject = domainObject;
        this.geometryObject.object();
        this.unsubscribes = [];
        this.latest = {};
        this.queue = [];
        this.metadata = {};

        this.refresh = this.refresh.bind(this);
        this.bounds = this.bounds.bind(this);

        this.openmct.time.on('bounds', this.bounds);
        this.openmct.time.on('timeSystem', this.refresh);

        this.refresh();
    }

    GeometryController.prototype.bounds = function (bounds, wasTick) {
        if (!wasTick) {
            this.refresh();
        }
    };

    GeometryController.prototype.refresh = function () {
        var domainObject = this.domainObject;
        var requests = [];

        this.unsubscribes.forEach(function (unsubscribe) {
            unsubscribe();
        });
        this.unsubscribes = [];
        this.requesting = true;

        ['roll', 'pitch', 'yaw'].forEach(function (property) {
            var idParts = domainObject[property].split(":");
            var identifier = {namespace:domainObject['namespace'].split(":")[0], key: idParts[0]};

            requests.push(this.openmct.objects.get(identifier).then(function (obj) {
                this.metadata[property] = this.openmct.telemetry.getMetadata(obj);
                this.unsubscribes.push(this.openmct.telemetry.subscribe(
                    obj,
                    this.datum.bind(this, property)
                ));
                return this.openmct.telemetry.request(
                    obj,
                    this.openmct.time.bounds()
                );
            }.bind(this)));
        }.bind(this));

        Promise.all(requests).then(this.handleResponses.bind(this));
    }

    GeometryController.prototype.datum = function (property, datum) {
        if (this.requesting) {
            this.queue.push({ property: property, datum: datum });
            return;
        }

        var metadata = this.metadata[property];
        var metadataValues = metadata.valuesForHints(["range"]);
        if (metadataValues.length > 0) {
            this.latest[property] = datum[metadataValues[0].key];
            if (Object.keys(this.latest).length === 3) {
                this.geometryObject.updateX(this.latest.roll);
                this.geometryObject.updateY(this.latest.pitch);
                this.geometryObject.updateZ(this.latest.yaw);
                this.latest = { roll: this.latest.roll, pitch: this.latest.pitch, yaw: this.latest.yaw };
            }
        }
    };

    GeometryController.prototype.handleResponses = function (responses) {
        responses = { roll: responses[0], pitch: responses[1], yaw: responses[2] };

        var index = { roll: 0, pitch: 0, yaw: 0 };
        var domain = this.openmct.time.timeSystem().key;
        var recordDatum = function (property) {
            this.datum(property, responses[property][index[property]]);
        }.bind(this);
        var keys = {};

        ['roll', 'pitch', 'yaw'].forEach(function (property) {
            var meta = this.metadata[property].valuesForHints(['domain']).find(function (m) {
                return m.source === domain || m.key === domain;
            });
            keys[property] = meta.source || meta.key || domain;
        }.bind(this));

        this.requesting = false;

        console.log(responses);

        this.flush();
    };

    GeometryController.prototype.flush = function () {
        this.queue.forEach(function (item) {
            this.datum(item.property, item.datum);
        }, this);
        this.queue = [];
    };

    GeometryController.prototype.destroy = function () {
        this.openmct.time.off('bounds', this.refresh);
        this.openmct.time.off('timeSystem', this.refresh);
        this.unsubscribes.forEach(function (unsubscribe) {
            unsubscribe();
        });
        this.unsubscribes = [];
    };

    return GeometryController;
})
