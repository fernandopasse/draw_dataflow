import './style.css'
import './cytoscape-context-menus.css'
import cytoscape from 'cytoscape'
import edgehandles from 'cytoscape-edgehandles'
import contextMenus from 'cytoscape-context-menus'
import cola from 'cytoscape-cola'
import $ from 'jquery'

cytoscape.use(edgehandles)
cytoscape.use(contextMenus, $)
cytoscape.use(cola)

class ElCounter {
    constructor() {
        this.counter = 0;
    }

    get next() {
        this.counter+=1
        return this.counter.toString();
    }
}

let idgen = new ElCounter();

var cy = cytoscape({
    container: document.getElementById('cy'),

    layout: {
        name: 'cola',
        fit: false,
    },

    style: [
        {
            selector: '.soma',
            css: {
                'background-color': '#fff',
                'background-image': './images/add.png',
            },
        },
        {
            selector: '.subtracao',
            css: {
                'background-color': '#fff',
                'background-image': './images/minus.png',
            },
        },
        {
            selector: '.multiplicacao',
            css: {
                'background-color': '#fff',
                'background-image': './images/multiply.png',
            },
        },
        {
            selector: '.input',
            css: {
                'background-color': '#fff',
                'background-image': './images/input.png',
            },
        },
        {
            selector: '.input_selected',
            css: {
                'background-color': 'blue',
                'border-color': 'blue',
                'background-image': './images/input.png',
            },
        },
        {
            selector: '.output',
            css: {
                'background-color': '#fff',
                'background-image': './images/output.png',
            },
        },
        {
            selector: 'node',
            css: {
                'background-fit': 'contain',
                'border-color': '#000',
                'border-width': 1,
                'border-opacity': 0.5,
                'width': 50,
                'height': 50,
            },
        },
        {
            selector: '.eh-handle',
            css: {
                'background-color': 'red',
                'width': 15,
                'height': 15,
                'shape': 'ellipse',
                'overlay-opacity': 0,
                'border-width': 5, // makes the handle easier to hit
                'border-opacity': 0,
                'background-color': '#e53935',
                'border-color': '#ab000d',
            },
        },
        {
            selector: 'edge',
            css: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
            },
        },
        {
            selector: ':selected',
            css: {
                'background-color': '#90caf9',
                'border-color': '#002171',
            },
        },
    ],

    elements: {
        nodes: [],
        edges: [],
    },
})

const selectAllOfTheSameType = function (ele) {
    cy.elements().unselect()
    if (ele.isNode()) {
        console.log(ele.data())
        cy.nodes(`[type = "${ele.data('type')}"]`).select() //.addClass('selected')
        //   console.log(node)
        // }).select()
        //cy.nodes().select().filter('.input').addClass('selected')
        //cy.$(':selected').addClass('selected');
        //console.log(cy.$(':selected'))
    } else if (ele.isEdge()) {
        cy.edges().select()
    }
}

const eh = cy.edgehandles({
    noEdgeEventsInDraw: true,
})

const contextMenu = cy.contextMenus({
    menuItems: [
        {
            id: 'remover',
            content: 'Remover',
            tooltipText: 'Remove uma ARESTA ou NODO',
            selector: 'node, edge',
            onClickFunction: function (event) {
                var target = event.target || event.cyTarget
                target.remove()
            },
            hasTrailingDivider: true,
        },
        {
            id: 'hide',
            content: 'hide',
            tooltipText: 'hide',
            selector: '*',
            onClickFunction: function (event) {
                var target = event.target || event.cyTarget
                target.hide()
            },
            disabled: false,
        },
        {
            id: 'input-node',
            content: 'Adicionar nodo INPUT',
            tooltipText: 'Adicione um NODO com a função de input',
            coreAsWell: true,
            onClickFunction: function (event) {
                var data = {
                    //group: 'nodes',
                    //id: Math.round(Math.random() * 100),
                    type: 'input',
                }
                var pos = event.position || event.cyPosition
                cy.add({
                    group: 'nodes',
                    data: data,
                    position: {
                        x: pos.x,
                        y: pos.y,
                    },
                    classes: ['input'],
                })
            },
        },
        {
            id: 'output-node',
            content: 'Adicionar nodo OUTPUT',
            tooltipText: 'Adicione um NODO com a função de output',
            coreAsWell: true,
            onClickFunction: function (event) {
                var data = {
                    //group: 'nodes',
                    //id: Math.round(Math.random() * 100),
                    type: 'output',
                }
                var pos = event.position || event.cyPosition
                cy.add({
                    group: 'nodes',
                    data: data,
                    position: {
                        x: pos.x,
                        y: pos.y,
                    },
                    classes: ['output'],
                })
            },
        },
        {
            id: 'soma-node',
            content: 'Adicionar nodo SOMA',
            tooltipText: 'Adicione um NODO com a função de soma',
            coreAsWell: true,
            onClickFunction: function (event) {
                var data = {
                    //group: 'nodes',
                    //id: Math.round(Math.random() * 100),
                    type: '+',
                }
                var pos = event.position || event.cyPosition
                cy.add({
                    group: 'nodes',
                    data: data,
                    position: {
                        x: pos.x,
                        y: pos.y,
                    },
                    classes: ['soma'],
                })
            },
        },
        {
            id: 'subtracao-node',
            content: 'Adicionar nodo SUBTRAÇÃO',
            tooltipText: 'Adicione um NODO com a função de subtração',
            coreAsWell: true,
            onClickFunction: function (event) {
                var data = {
                    //group: 'nodes',
                    //id: Math.round(Math.random() * 100),
                    type: '-',
                }
                var pos = event.position || event.cyPosition
                cy.add({
                    group: 'nodes',
                    data: data,
                    position: {
                        x: pos.x,
                        y: pos.y,
                    },
                    classes: ['subtracao'],
                })
            },
        },
        {
            id: 'multiplicacao-node',
            content: 'Adicionar nodo MULTIPLICAÇãO',
            tooltipText: 'Adicione um NODO com a função de multiplicar',
            coreAsWell: true,
            onClickFunction: function (event) {
                var data = {
                    //group: 'nodes',
                    type: '*',
                }
                var pos = event.position || event.cyPosition
                cy.add({
                    group: 'nodes',
                    data: data,
                    position: {
                        x: pos.x,
                        y: pos.y,
                    },
                    classes: ['multiplicacao'],
                })
                //cy.$('nodes').forEach((node) => console.log(node.data()))
            },
        },
        {
            id: 'remover-selecionado',
            content: 'Remover selecionados',
            tooltipText: 'Remover NODOs ou ARESTAS selecionadas',
            coreAsWell: true,
            onClickFunction: function (event) {
                cy.$(':selected').remove()
            },
        },
        {
            id: 'selecionar-nodos',
            content: 'Seleciona todos os NODOS do mesmo tipo',
            tooltipText: 'Selecionar todos os NODOS',
            selector: 'node',
            onClickFunction: function (event) {
                selectAllOfTheSameType(event.target || event.cyTarget)
            },
        },
        {
            id: 'selecionar-aresta',
            content: 'Seleciona todas as ARESTAS',
            tooltipText: 'Seleciona todas as ARESTAS',
            selector: 'edge',
            onClickFunction: function (event) {
                selectAllOfTheSameType(event.target || event.cyTarget)
            },
        },
    ],
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
cy.add([
    {
        group: 'nodes',
        data: { id: 'n0', type: '-' },
        position: { x: 700, y: 100 },
        classes: ['subtracao'],
    },
    {
        group: 'nodes',
        data: { id: 'n1', type: '-' },
        position: { x: 800, y: 200 },
        classes: ['subtracao'],
    },
    {
        group: 'nodes',
        data: { id: 'n2', type: 'input' },
        position: { x: 600, y: 300 },
        classes: ['input'],
    },
    {
        group: 'nodes',
        data: { id: 'n3', type: 'input' },
        position: { x: 700, y: 400 },
        classes: ['input'],
    },
    {
        group: 'nodes',
        data: { id: 'n4', type: 'input' },
        position: { x: 700, y: 300 },
        classes: ['input'],
    },
    {
        group: 'nodes',
        data: { id: 'n5', type: 'input' },
        position: { x: 700, y: 200 },
        classes: ['input'],
    },
    {
        group: 'nodes',
        data: { id: 'n6', type: '+' },
        position: { x: 600, y: 200 },
        classes: ['soma'],
    },
    {
        group: 'nodes',
        data: { id: 'n7', type: '+' },
        position: { x: 800, y: 400 },
        classes: ['soma'],
    },
    {
        group: 'nodes',
        data: { id: 'n8', type: 'input' },
        classes: ['input'],
    },
    {
        group: 'edges',
        data: { id: 'e0', source: 'n2', target: 'n6' },
    },
    {
        group: 'edges',
        data: { id: 'e1', source: 'n3', target: 'n6' },
    },
    {
        group: 'edges',
        data: { id: 'e2', source: 'n4', target: 'n6' },
    },
    {
        group: 'edges',
        data: { id: 'e3', source: 'n5', target: 'n6' },
    },
    {
        group: 'edges',
        data: { id: 'e4', source: 'n6', target: 'n1' },
    },
    {
        group: 'edges',
        data: { id: 'e5', source: 'n8', target: 'n6' },
    },

])

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
