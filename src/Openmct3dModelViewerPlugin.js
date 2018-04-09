define([
    './GeometryView'
], function (
    GeometryView
) {
    return function Openmct3dModelViewerPlugin() {
        'use strict';
        return function install(openmct) {

            openmct.types.addType('plugin.geometry', {
                key: 'plugin.geometry',
                name: '3D Model Viewer',
                cssClass: 'icon-object',
                description: 'Display a 3D Model.',
                creatable: true,
                initialize: function (obj) {
                },
                form: [
                    {
                        key: "roll",
                        name: "Roll",
                        control: "textfield",
                        required: true
                    },
                    {
                        key: "pitch",
                        name: "Pitch",
                        control: "textfield",
                        required: true
                    },
                    {
                        key: "yaw",
                        name: "Yaw",
                        control: "textfield",
                        required: true
                    },
                    {
                        key: "namespace",
                        name: "Namespace",
                        control: "textfield",
                        required: true
                    },
                ]
            });

            (openmct.mainViews || openmct.objectViews).addProvider({
                name: 'Geometry View',
                key: 'pluginGeometry',
                cssClass: 'icon-object',
                canView: function (d) {
                    return d.type === 'plugin.geometry';
                },
                view: function (domainObject) {
                    return new GeometryView(domainObject, openmct, document);
                }
            });
        };
    }
})
