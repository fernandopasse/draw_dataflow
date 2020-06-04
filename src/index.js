import './style.css'
import './cytoscape-context-menus.css'
import cytoscape from 'cytoscape'
import edgehandles from 'cytoscape-edgehandles'
import cola from 'cytoscape-cola'
import menus from './contextmenus'
import config from './cinit'
import ElCounter from './utils'


let idgen = new ElCounter();

cytoscape.use(edgehandles)
cytoscape.use(cola)

var cy = cytoscape(config)
menus(cy,cytoscape);

const eh = cy.edgehandles({
    noEdgeEventsInDraw: true,
})



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

cy.nodes(`[type = "+"]`).forEach((inputnode) => {
    //console.log(inputnode.data(),inputnode.openNeighborhood('edge').map(ele => ele.data()))

    let nodesarray = inputnode.openNeighborhood('edge').sources('[type = "input"]')
    .map(node => { 
        return {
            group: 'nodes',
            data: node.data(),
            classes: ['input']
        }
    })
    
    //console.log(nodesarray)
    let arrlength = nodesarray.length
    let links = []
    let newnodes = []
    let t_node = {}
    while(arrlength > 2) {
        if( arrlength % 2 === 0 ) {
            for( let i = 0; i < arrlength/2; i++) {
                let nid = `${idgen.next}`
                t_node = {
                    group: 'nodes',
                    data: { id: nid, type: '+' },
                    classes: ['soma'],
                }
                links.push({
                    group: 'edges',
                    data: { id: `${idgen.next}`, source: nodesarray[2*i].data.id, target: nid }
                },{
                    group: 'edges',
                    data: { id: `${idgen.next}`, source: nodesarray[2*i+1].data.id, target: nid }
                })
                nodesarray[i] = t_node
                newnodes.push(t_node)
            }
            //console.log(nodesarray)
            arrlength /= 2
        } else {
            arrlength -=1
            for( let i = 0; i < arrlength/2; i++) {
                let nid = `${idgen.next}`
                t_node = {
                    group: 'nodes',
                    data: { id: nid, type: '+' },
                    classes: ['soma'],
                }
                links.push({
                    group: 'edges',
                    data: { id: `${idgen.next}`, source: nodesarray[2*i].data.id, target: nid }
                },{
                    group: 'edges',
                    data: { id: `${idgen.next}`, source: nodesarray[2*i+1].data.id, target: nid }
                })
                nodesarray[i] = t_node
                newnodes.push(t_node)
            }
            nodesarray[arrlength/2] = nodesarray[arrlength-1]
            arrlength = arrlength/2 + 1       
        }
    }

    console.log("nodes",nodesarray[0],nodesarray[1].data,nodesarray)
    links.push({
        group: 'edges',
        data: { id: `${idgen.next}`, source: nodesarray[0].data.id, target: inputnode.id() }
    },{
        group: 'edges',
        data: { id: `${idgen.next}`, source: nodesarray[1].data.id, target: inputnode.id() }
    })

    console.log(inputnode.incomers())


    console.log(nodesarray)
    console.log(links)
    console.log(newnodes)

    

    
}) //.addClass('selected')


// console.log(cy.zoom())

// document.getElementById('exportar').addEventListener("click", ()=> {
//   console.log("okok")
// });
