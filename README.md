# Open MCT 3D Model Viewer

A plugin for [Open MCT](https://nasa.github.io/openmct) adding a 3d geometry visualization of gyroscope telemetry data. You can use the telemetry data roll (x-axis), pitch (y-axis) and yaw (z-axis) of your spacecraft to use this plugin.

## Build

```bash
$ git clone https://github.com/Xnaff/openmct-3d-model-viewer.git
$ cd openmct-3d-model-viewer
$ npm install
$ npm run build
```

A UMD module with associated source maps will be written to the
`dist` directory. When installed as a global, the plugin will be
available as `Openmct3dModelViewerPlugin`.

## Usage

Insert the `openmct-3d-model-viewer.js` from the `dist` directory in the `head` of your `index.html`.
```
<script src="< path to the direktory you cloned this plugin >/openmct-3d-model-viewer/dist/openmct-3d-model-viewer.js"></script>
```
Then install the plugin in `openmct` 
```
openmct.install(Openmct3dModelViewerPlugin());
```