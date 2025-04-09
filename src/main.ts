import * as THREE from "three";
import * as OBC from "@thatopen/components";
import * as OBCF from "@thatopen/components-front";
import * as FRAGS from "@thatopen/fragments";
import * as WEBIFC from "web-ifc";
import { setup } from "./Func/setup";
import { loadIfc } from "./Func/loader.ts"
import { clip } from "./Func/clipper.ts";
import { LengthMeasurement } from "./Func/measurment.ts";

//For Container
const container = document.getElementById("app") as HTMLElement;
var loadBtn = document.getElementById("loadBtn");
var clipBtn = document.getElementById("clipBtn");
var lenBtn=document.getElementById("lenBtn")

//For Componenet
const components = new OBC.Components();
const fragments = components.get(OBC.FragmentsManager);
const fragmentIfcLoader = components.get(OBC.IfcLoader);
const cullers = new OBC.Cullers(components);
const worlds = components.get(OBC.Worlds);
const highlighter = components.get(OBCF.Highlighter);
const clipper = components.get(OBC.Clipper);
const edges = components.get(OBCF.ClipEdges);
const length_measurement = components.get(OBCF.LengthMeasurement);
// const outliner = components.get(OBCF.Outliner);
// const casters = components.get(OBC.Raycasters);

const world: OBC.World = worlds.create<
  OBC.SimpleScene,
  OBC.OrthoPerspectiveCamera,
  OBCF.PostproductionRenderer
>();

// Setups
setup(world, components, container);
const culler = cullers.create(world);
length_measurement.world=world;
highlighter.setup({
  world: world,
  autoHighlightOnClick: true,
  hoverColor: new THREE.Color("#490fb5"),
  selectionColor: new THREE.Color("#759c05"),
});
highlighter.zoomToSelection = true;




// Events
loadBtn?.addEventListener("click", async () => {
  await loadIfc(world, fragmentIfcLoader)
});

clipBtn?.addEventListener("click", () => {
  clipBtn?.classList.toggle("active");
  clip(clipper, edges, world, clipBtn, OBCF, THREE);

  container.ondblclick = () => {
    if (clipper.enabled) {
      clipper.create(world);
    }
  };
});


lenBtn?.addEventListener("click", () => {
  lenBtn?.classList.toggle("active");
  LengthMeasurement(lenBtn, length_measurement, container);
});



fragments.onFragmentsLoaded.add((model) => {
  model.items.forEach((item) => {
    const mesh = item.mesh;
    world.meshes.add(mesh);
    culler.add(mesh);
    culler.needsUpdate = true;
  });
});

world.camera.controls.addEventListener("sleep",() => {
  culler.needsUpdate =true;
})


