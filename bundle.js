define([
    "./src/controllers/GeometryViewController",
    "text!./res/templates/geometry-view.html",
    'legacyRegistry'
], function (
    GeometryViewController,
    geometryView,
    legacyRegistry
) {
    "use strict";

    legacyRegistry.register("plugins/openmct-3d-model-viewer", {
        "extensions": {
            "types": [
                {
                    "key": "geometry",
                    "name": "3D Model Viewer",
                    "cssClass": "icon-object",
                    "description": "Display a 3D model.",
                    "priority": 100,
                    "features": "creation",
                    "libraries": [
                        "lib/three.js"
                    ]
                }
            ],
            "controllers": [
                {
                    "key": "GeometryViewController",
                    "implementation": GeometryViewController,
                    "depends": ["$scope", "$element", "$attrs"]
                }

            ],
            "views": [
                {
                    "key": "geometry",
                    "name": "3D Model",
                    "cssClass": "icon-image",
                    "template": geometryView
                }
            ],
            "stylesheets": [
                {
                    "stylesheetUrl": "css/geometryView.css",
                    "priority": "mandatory"
                }
            ]
        }
    });
});
