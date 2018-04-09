define([
    './GeometryObject',
    './GeometryController',
    './geometry.html',
    './geometry.scss'
], function (
    GeometryObject,
    GeometryController,
    GeometryTemplate
) {
    function GeometryView(domainObject, openmct, document) {
        this.domainObject = domainObject;
        this.openmct = openmct;
        this.objectAPI = openmct.objects;
        this.document = document;
    }


    GeometryView.prototype.show = function (container) {
        console.log(this.domainObject.telemetryPoint);
        var self = this;
        container.innerHTML = GeometryTemplate;
        var object = new GeometryObject(container.querySelector('#plugin_geometry'));

        self.controller = new GeometryController(
            object,
            self.domainObject,
            self.openmct
        );
    }

    GeometryView.prototype.destroy = function () {
        if (this.controller) {
            this.controller.destroy();
            delete this.controller;
        }
    };

    return GeometryView;
})