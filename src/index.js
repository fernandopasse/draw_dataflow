import './style.css'
import './cytoscape-context-menus.css'
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
menus(cy,cytoscape,idgen);

const eh = cy.edgehandles({
    noEdgeEventsInDraw: true,
})

let layoutopt = {
    name: 'cola',
    fit: false,
}

// var data = {
//   group: 'nodes',
//   id: Math.round(Math.random() * 100),
//   type: '*'
// }
// var pos = event.position || event.cyPosition
// cy.add({
//   data: data,
//   position: {
//     x: pos.x,
//     y: pos.y
//   },
//   classes: ['multiplicacao']
// })
// }
let reducible = function() {
    cy.$('.reducible').forEach(node => {
        console.log(node)
        if(node.indegree() > 2) {
            node.addClass('reduce')

        }
    })
}

reducible()






// console.log(cy.zoom())

// document.getElementById('exportar').addEventListener("click", ()=> {
//   console.log("okok")
// });
