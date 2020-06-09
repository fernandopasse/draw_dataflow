import './style.css'
import './navbar-top.css'
import 'bootstrap';
import 'popper.js';
import "bootstrap/scss/bootstrap.scss";
import './cytoscape-context-menus.css'
import { saveAs } from 'file-saver';
import cytoscape from 'cytoscape'
import edgehandles from 'cytoscape-edgehandles'
import cola from 'cytoscape-cola'
// import dagre from 'cytoscape-dagre'
// import klay from 'cytoscape-klay'
//import coseb from 'cytoscape-cose-bilkent'
// import avsdf from 'cytoscape-avsdf'
import menus from './contextmenus'
import config from './cinit'
import ElCounter from './utils'

let idgen = new ElCounter();

cytoscape.use(edgehandles)
cytoscape.use(cola)

var cy = cytoscape(config)

const entradaNode = document.createElement('input');

entradaNode.type = 'file';

entradaNode.onchange = e => {
    const files = e.target.files;
    if (!files) return;
    const reader = new FileReader();
    cy.remove('node');
    cy.remove('edge');
    cy.removeData();
    reader.onload = (e) => {
        let nodes = JSON.parse(e.target.result);
        console.log(nodes);
        nodes.forEach(e => {
            cy.add(e);
        });
    };
    reader.readAsText(files[0]);
}

menus(cy,cytoscape,idgen);

const eh = cy.edgehandles({
    noEdgeEventsInDraw: true,
})

cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {
    if(targetNode.data('type') === "add" || targetNode.data('type') === "mult")
        if(targetNode.indegree() > 2) {
            targetNode.addClass('reduce')
        }
        console.log(targetNode.classes())
});

let layoutopt = {
    name: 'cola',
    fit: false,
}

cy.filter((node) => {
    return ((node.data('type') === "add" || node.data('type') === "mult" ) && node.indegree() > 2)
}).addClass("reduce")

$('#export').click(() => {
        const json = cy.elements().jsons();
        const blob = new Blob([JSON.stringify(json)], {type: "application/json;charset=utf-8"});
        saveAs(blob, 'circuit.json');
});

$('#import').click(() => {
    entradaNode.click();
});

