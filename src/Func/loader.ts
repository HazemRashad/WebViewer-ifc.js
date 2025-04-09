


export async function loadIfc(world,fragmentIfcLoader) {
    await fragmentIfcLoader.setup();

    const fileOpener = document.createElement("input");
    fileOpener.type = "file";
    fileOpener.accept = ".ifc";
  
    fileOpener.onchange = async () => {
      if (fileOpener.files === null || fileOpener.files.length === 0) return;
      const file = fileOpener.files[0];
      fileOpener.remove();
  
      const data = await file.arrayBuffer();
      const buffer = new Uint8Array(data);
      const model = await fragmentIfcLoader.load(buffer);
      model.name = "example";
      world.scene.three.add(model);
    };
  
    fileOpener.click(); // Trigger the file input dialog
  }