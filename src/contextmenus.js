import contextMenus from 'cytoscape-context-menus'
import $ from 'jquery'

export default function menus(cy, cytoscape, idgen) {

    cytoscape.use(contextMenus, $)

    let treeReduce = function(inputnode) {
        //console.log(inputnode.data(),inputnode.openNeighborhood('edge').map(ele => ele.data()))
        let currentEdges = inputnode.openNeighborhood('edge').filter(edge => {
            return edge.source().data('type') === 'input'
        })//.sources('[type = "input"]')
        //console.log(currentEdges)
        //currentEdges.sources().select()
        //inputnode.select()
        let allnodes = currentEdges.sources().add(inputnode)
        console.log("inputnodes", currentEdges.sources().add(inputnode))
        //console.log("bbox",bbox)
        let nodesarray = currentEdges.sources().map(node => { 
            return {
                group: 'nodes',
                data: node.data(),
                classes: ['input']
            }
        })
        
        let bbox = allnodes.boundingBox()
        let position = {
            x: (bbox.x1 + bbox.x2)/2,
            y: (bbox.y1 + bbox.y2)/2
        }
        //console.log(nodesarray)
        let arrlength = nodesarray.length
        let links = []
        let newnodes = []
        let t_node = {}
        while(arrlength > 2) {
            if( arrlength % 2 === 0 ) {
                for( let i = 0; i < arrlength/2; i++) {
                    console.log("i",i)
                    let nid = `${idgen.next}`
                    t_node = {
                        group: 'nodes',
                        data: { id: nid, type: 'add' },
                        //position : position,
                        classes: ['add','dagre'],
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
                console.log(newnodes)
                console.log("last el",nodesarray[arrlength/2-1])
                arrlength /= 2
            } else {
                arrlength -=1
                for( let i = 0; i < arrlength/2; i++) {
                    //console.log("i",i,arrlength/2)
                    let nid = `${idgen.next}`
                    t_node = {
                        group: 'nodes',
                        data: { id: nid, type: 'add' },
                        //position : position,
                        classes: ['add','dagre'],
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
                nodesarray[arrlength/2] = nodesarray[arrlength]
                arrlength = arrlength/2 + 1       
            }
        }
    
        //console.log("nodes",nodesarray[0].data,nodesarray[1],nodesarray)
        links.push({
            group: 'edges',
            data: { id: `${idgen.next}`, source: nodesarray[0].data.id, target: inputnode.id() }
        },{
            group: 'edges',
            data: { id: `${idgen.next}`, source: nodesarray[1].data.id, target: inputnode.id() }
        })
    
        currentEdges.remove()
        // console.log("incomers",inputnode.incomers().filter((edge) => {
        //     edge.
        // }))
        newnodes = cy.add(newnodes)
        cy.add(links)

        allnodes.union(newnodes)
        inputnode.removeClass('reduce')
        cy.layout({
        //allnodes.union(newnodes).layout({
            name: 'cose',
            animate: true,
            fit: true,
            //boundingBox: allnodes.boundingBox(),
        }).run()

        // console.log(links)
        // console.log(newnodes)    
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
                        classes: ['add'],
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
                        classes: ['addi'],
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
                        classes: ['sub'],
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
                        classes: ['mult'],
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
    })
}
