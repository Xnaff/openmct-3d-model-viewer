var THREE = require('three');

function initViewProvider(openmct) {
    'use strict';
    return {
        name: 'Geometry View',
        view: function (domainObject) {
            return {
                show: function (container) {
                    container.innerHTML = '<div id="plugin_geometry"></div>';

                    var camera, scene, geometry, renderer, material, cube, html;

                    function init() {
                        html = container.querySelector('#plugin_geometry');

                        scene = new THREE.Scene();
                        camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
                        camera.position.z = 2;

                        renderer = new THREE.WebGLRenderer({ antialias: true });
                        renderer.setPixelRatio(window.devicePixelRatio);
                        renderer.setSize(500, 500);
                        renderer.setClearColor(0x000000, 1);
                        html.appendChild(renderer.domElement);

                        var lights = [];
                        lights[ 0 ] = new THREE.PointLight(0xffffff, 1, 0);
                        lights[ 1 ] = new THREE.PointLight(0xffffff, 1, 0);
                        lights[ 2 ] = new THREE.PointLight(0xffffff, 1, 0);

                        lights[ 0 ].position.set(0, 200, 0);
                        lights[ 1 ].position.set(100, 200, 100);
                        lights[ 2 ].position.set(-100, -200, -100);

                        scene.add(lights[ 0 ]);
                        scene.add(lights[ 1 ]);
                        scene.add(lights[ 2 ]);

                        geometry = new THREE.BoxGeometry(1, 1, 1);
                        material = new THREE.MeshPhongMaterial({
                            color: 0x156289,
                            emissive: 0x072534,
                            side: THREE.DoubleSide,
                            flatShading: true});
                        cube = new THREE.Mesh(geometry, material);

                        scene.add(cube);
                    }

                    function animate() {
                        requestAnimationFrame(animate);

                        cube.rotation.x += 0.0065;
                        //cube.rotation.y += 0.0065;
                        //cube.rotation.z += 0.0065;

                        renderer.render(scene, camera);
                    }

                    init();
                    animate();
                },
                destroy: function (container) {
                    // Do any cleanup here (eg. event observers, etc).
                }
            };
        },
        canView: function (domainObject) {
            return (domainObject.type === 'plugin.geometry');
        },
        editable: true,
        key: 'pluginGeometry'
    };
}

define([], function () {
    return function Openmct3dModelViewerPlugin() {
        'use strict';
        return function install(openmct) {

            openmct.types.addType('plugin.geometry', {
                key: 'plugin.geometry',
                name: '3D Model Viewer',
                cssClass: 'icon-object',
                description: 'Display a 3D Model.',
                creatable: true
            });

            openmct.objectViews.addProvider(initViewProvider(openmct));
        };
    }
})
