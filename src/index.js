import './style.css'
import './navbar-top.css'
import 'bootstrap';
import 'popper.js';
import "bootstrap/scss/bootstrap.scss";
//import './cytoscape-context-menus.css'
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
    reader.onload = (e) => {
        let nodes = JSON.parse(e.target.result);
        let map = []
        let elements = []
       
        nodes.forEach(e => {
            if(e.group == 'nodes'){
                if(map[e.data.id] === undefined){
                    map[e.data.id] = `${idgen.next}`
                    e.data.id =  map[e.data.id]
                    elements.push(e)
                } else {
                    throw new Error("Não pode continuar o processamento do arquivo!")
                }
            }
        });

        
        nodes.forEach(e => {
            if(e.group == 'edges'){
                console.log(e,map[e.data.id])
                if(map[e.data.id] !== undefined || map[e.data.source] === undefined || map[e.data.target] === undefined){
                    throw new Error("Não pode continuar o processamento do arquivo!")
                }else{
                    map[e.data.id] = `${idgen.next}`
                    e.data.id = map[e.data.id]
                    e.data.source = map[e.data.source]
                    e.data.target = map[e.data.target]
                    elements.push(e)
                } 
            }
        }); 

        console.log(' ')
        cy.add(elements)
        cy.layout({
        //allnodes.union(newNodes).layout({
            name: 'cola',
            animate: true,
            fit: false,
            //boundingBox: bbox
        }).run()
        
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
     
});

