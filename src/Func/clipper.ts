
export async function clip(clipper, edges, world, clipBtn, OBCF, THREE) {

    const active = clipBtn.classList.contains("active");

    if (active){
        clipper.enabled = true;
        clipper.Type = OBCF.EdgesPlane;
        
        const blueFill = new THREE.MeshBasicMaterial({ color: "lightblue", side: 2 });
        const blueLine = new THREE.LineBasicMaterial({ color: "blue" });
        const blueOutline = new THREE.MeshBasicMaterial({
          color: "blue",
          opacity: 0.5,
          side: 2,
          transparent: true,
        });
        edges.styles.create(
          "Red lines",
          world.meshes,
          world,
          blueLine,
          blueFill,
          blueOutline
        );
        await edges.update(true);
    }
    else{
        clipper.enabled = false;
        clipBtn.classList.remove("active");
        clipper.deleteAll();
    }
}