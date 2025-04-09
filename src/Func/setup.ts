import * as THREE from "three"
import * as OBC from "@thatopen/components"
import * as OBCF from "@thatopen/components-front"
export function setup(world, components, container)
{
world.scene = new OBC.SimpleScene(components);
world.renderer = new OBCF.PostproductionRenderer(components, container);
world.camera = new OBC.OrthoPerspectiveCamera(components);
 
components.init();
world.scene.setup();
world.camera.controls.setLookAt(20, 20, 20, 0, 0, 0);
 
 
//Adding 3D Elements to the scene
 
const grids = components.get(OBC.Grids);
grids.create(world);
const axesHelpers = new THREE.AxesHelper(10);
world.scene.three.add(axesHelpers);
// world.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);
// world.scene.three.background = null;
} 