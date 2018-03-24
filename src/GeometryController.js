define([], function () {

    function GeometryController(geometryObject, domainObject, openmct) {
        this.geometryObject = geometryObject;
        this.geometryObject.object();
    }

    return GeometryController;
})