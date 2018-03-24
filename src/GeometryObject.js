define([
    'three'
], function (
    THREE
) {
    function GeometryObject(html) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
        this.camera.position.z = 2;

        this.lights = [];
        this.lights[ 0 ] = new THREE.PointLight(0xffffff, 1, 0);
        this.lights[ 1 ] = new THREE.PointLight(0xffffff, 1, 0);
        this.lights[ 2 ] = new THREE.PointLight(0xffffff, 1, 0);

        this.lights[ 0 ].position.set(0, 200, 0);
        this.lights[ 1 ].position.set(100, 200, 100);
        this.lights[ 2 ].position.set(-100, -200, -100);

        this.scene.add(this.lights[ 0 ]);
        this.scene.add(this.lights[ 1 ]);
        this.scene.add(this.lights[ 2 ]);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(500, 500);
        this.renderer.setClearColor(0x000000, 1);
        html.appendChild(this.renderer.domElement);


    }

    GeometryObject.prototype.object = function () {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshPhongMaterial({
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true});
        this.cube = new THREE.Mesh(this.geometry, this.material);

        this.scene.add(this.cube);
        this.renderer.render(this.scene, this.camera);
    }

    GeometryObject.prototype.animate = function () {
        requestAnimationFrame(this.animate);

        this.cube.rotation.x += 0.0065;
        //cube.rotation.y += 0.0065;
        //cube.rotation.z += 0.0065;

        this.renderer.render(this.scene, this.camera);
    }

    return GeometryObject;
})