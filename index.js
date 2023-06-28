import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });

// Create grid and axes
viewer.grid.setGrid();
viewer.axes.setAxes();

async function loadIfc(url) {
		// Load the model
    const model = await viewer.IFC.loadIfcUrl(url);

		// Add dropped shadow and post-processing efect
    await viewer.shadowDropper.renderShadow(model.modelID);
    
    viewer.context.renderer.postProduction.active = true;

    const properties = await viewer.IFC.properties.serializeAllProperties(model);

    const file = new File(properties, 'properties.json');
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.download = 'properties.json';
    link.href = URL.createObjectURL(file);
    link.click();
    link.remove();
}
loadIfc('./01.ifc');
