import contextMenus from 'cytoscape-context-menus'
import 'bootstrap/js/dist/dropdown'
import $ from 'jquery'

export default function menus(cy, cytoscape, idgen) {

    cytoscape.use(contextMenus, $)

    let treeReduce = function(opnode) {
        //console.log(opnode.data(),opnode.openNeighborhood('edge').map(ele => ele.data()))
        let currentEdges = opnode.incomers('edge') 
        let nodesarray = currentEdges.sources()
        let nodetype = opnode.data('type')
        let nodeclass = ( nodetype === '+' ? 'add' : 'mult')
       
        let allnodes = nodesarray.add(opnode)
        let bbox = allnodes.boundingBox()

        let position = {
            x: (bbox.x1 + bbox.x2)/2,
            y: (bbox.y1 + bbox.y2)/2
        }
        
        let arrlength = nodesarray.length
        let newEdges = cy.collection()
        let newNodes = cy.collection()
        let newNode;
        nodesarray = nodesarray//.toArray()
        while(arrlength > 2) {
            for( let i = 0; i < parseInt(arrlength/2); i++) {
                console.log("i",i)
                let nid = `${idgen.next}`
                newNode = cy.add({
                    group: 'nodes',
                    data: { id: nid, type: nodetype },
                    //position : position,
                    classes: [nodeclass],
                })//.toArray()[0]
                newEdges = newEdges.union(cy.add([{
                    group: 'edges',
                    data: { id: `${idgen.next}`, source: nodesarray[2*i].id(), target: nid }
                },{
                    group: 'edges',
                    data: { id: `${idgen.next}`, source: nodesarray[2*i+1].id(), target: nid }
                }]))

                nodesarray[i] = newNode
                newNodes = newNodes.add(newNode)
            }
           
            if( arrlength % 2 === 0 ) {
                arrlength /= 2
            } else {
                arrlength -=1
                nodesarray[arrlength/2] = nodesarray[arrlength]
                arrlength = arrlength/2 + 1       
            }
        }
    
        newEdges = newEdges.union(cy.add([{
            group: 'edges',
            data: { id: `${idgen.next}`, source: nodesarray[0].data("id"), target: opnode.id() }
        },{
            group: 'edges',
            data: { id: `${idgen.next}`, source: nodesarray[1].data("id"), target: opnode.id() }
        }]))
            
        currentEdges.remove()
        opnode.removeClass('reduce')
        cy.layout({
        //allnodes.union(newNodes).layout({
            name: 'cola',
            animate: true,
            fit: false,
            //boundingBox: bbox
        }).run()

    
    } //.addClass('selected')



    let selectAllOfTheSameType = function (ele) {
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

    let checkReduce = (node) => {
        if(node.indegree() > 2) {
            node.addClass('reduce')
        }
    }

    cy.contextMenus({
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
                selector: 'node, edge',
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
                        classes: [`${data.type}`],
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
                        classes: [`${data.type}`],
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
                        type: 'add',
                    }
                    var pos = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x: pos.x,
                            y: pos.y,
                        },
                        classes: [`${data.type}`],
                    })
                },
            },
            {
                id: 'and-node',
                content: 'Adicionar nodo AND',
                tooltipText: 'Adicione um NODO com a função de and',
                coreAsWell: true,
                onClickFunction: function (event) {
                    var data = {
                        //group: 'nodes',
                        //id: Math.round(Math.random() * 100),
                        type: 'and',
                    }
                    var pos = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x: pos.x,
                            y: pos.y,
                        },
                        classes: [`${data.type}`],
                    })
                },
            },
            {
                id: 'min-node',
                content: 'Adicionar nodo MIN',
                tooltipText: 'Adicione um NODO com a função de min',
                coreAsWell: true,
                onClickFunction: function (event) {
                    var data = {
                        //group: 'nodes',
                        //id: Math.round(Math.random() * 100),
                        type: 'min',
                    }
                    var pos = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x: pos.x,
                            y: pos.y,
                        },
                        classes: [`${data.type}`],
                    })
                },
            },
            {
                id: 'max-node',
                content: 'Adicionar nodo MAX',
                tooltipText: 'Adicione um NODO com a função de max',
                coreAsWell: true,
                onClickFunction: function (event) {
                    var data = {
                        //group: 'nodes',
                        //id: Math.round(Math.random() * 100),
                        type: 'max',
                    }
                    var pos = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x: pos.x,
                            y: pos.y,
                        },
                        classes: [`${data.type}`],
                    })
                },
            },
            {
                id: 'not-node',
                content: 'Adicionar nodo NOT',
                tooltipText: 'Adicione um NODO com a função de not',
                coreAsWell: true,
                onClickFunction: function (event) {
                    var data = {
                        //group: 'nodes',
                        //id: Math.round(Math.random() * 100),
                        type: 'not',
                    }
                    var pos = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x: pos.x,
                            y: pos.y,
                        },
                        classes: [`${data.type}`],
                    })
                },
            },
            {
                id: 'soma-node',
                content: 'Adicionar nodo OR',
                tooltipText: 'Adicione um NODO com a função de or',
                coreAsWell: true,
                onClickFunction: function (event) {
                    var data = {
                        //group: 'nodes',
                        //id: Math.round(Math.random() * 100),
                        type: 'or',
                    }
                    var pos = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x: pos.x,
                            y: pos.y,
                        },
                        classes: [`${data.type}`],
                    })
                },
            },
            {
                id: 'xor-node',
                content: 'Adicionar nodo XOR',
                tooltipText: 'Adicione um NODO com a função de xor',
                coreAsWell: true,
                onClickFunction: function (event) {
                    var data = {
                        //group: 'nodes',
                        //id: Math.round(Math.random() * 100),
                        type: 'xor',
                    }
                    var pos = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x: pos.x,
                            y: pos.y,
                        },
                        classes: [`${data.type}`],
                    })
                },
            },
            {
                id: 'soma-node-inteiro',
                content: 'Adicionar nodo SOMA com inteiro',
                tooltipText: 'Adicione um NODO com a função de soma',
                coreAsWell: true,
                onClickFunction: function (event) {
                    var data = {
                        //group: 'nodes',
                        //id: Math.round(Math.random() * 100),
                        type: 'addi',
                    }
                    var pos = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x: pos.x,
                            y: pos.y,
                        },
                        classes: [`${data.type}`],
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
                        type: 'sub',
                    }
                    var pos = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x: pos.x,
                            y: pos.y,
                        },
                        classes: [`${data.type}`],
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
                        type: 'mult',
                    }
                    var pos = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x: pos.x,
                            y: pos.y,
                        },
                        classes: [`${data.type}`],
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
            {
                id: 'reduzir',
                content: 'Reduzir operação',
                tooltipText: 'Reduzir operação',
                selector: '.reduce',
                onClickFunction: function (event) {
                    treeReduce(event.target || event.cyTarget)
                },
            }
        ],
        menuItemClasses: [ "dropdown-item" ],
        contextMenuClasses: [ 'dropdown-menu' ]
    })
}
