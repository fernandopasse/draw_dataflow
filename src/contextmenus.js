import contextMenus from 'cytoscape-context-menus'
import 'bootstrap/js/dist/dropdown'
import $ from 'jquery'

export default function menus(cy, cytoscape, idgen) {

    cytoscape.use(contextMenus, $)

    let treeReduce = function(opnode) {
        //console.log(opnode.data(),opnode.openNeighborhood('edge').map(ele => ele.data()))
        let currentEdges = opnode.incomers('edge') 
        let nodesarray = currentEdges.sources()
        let type = opnode.data('type')
        let nodeclass = ( type === '+' ? 'add' : 'mult')
       
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
                    data: { id: nid, type: type },
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

    let nodeAddMenus = () => {
        let nodeMenuBase = (node) => {
            if(typeof node === 'string')
                node = {type: node}

            const {
                type,
                menuopt,
                nodeopt
            } = node

            let data = { type : type }
            let classes = [type]
            

            if(nodeopt !== undefined) {
                if(nodeopt['data'] !== undefined) {
                    data = {...data,...nodeopt.data}
                    delete options.data
                }

                if(nodeopt['classes'] !== undefined) {
                    classes = [...classes,...nodeopt.classes]
                    delete options.classes
                }
            }

            
            data.id = idgen.next  

            return { 
                id: `${type}-node`,
                content: `Adicionar nodo ${type.toUpperCase()}`,
                tooltipText: `Adicione um NODO com a função de ${type}`,
                coreAsWell: true,
                onClickFunction: function (event) {
                    let {x,y} = event.position || event.cyPosition
                    cy.add({
                        group: 'nodes',
                        data: data,
                        position: {
                            x,
                            y
                        },
                        classes: classes
                    })
                },
                ...(menuopt || {})
            }
        }
        
        let node_types = [
            'input',
            'output',
            'add',
            { 
                type: "addi", 
                menuopt: {
                    id: 'soma-node-inteiro',
                    content: 'Adicionar nodo SOMA com inteiro',
                    tooltipText: 'Adicione um NODO com a função de soma com inteiro',
                        
                }
            }
            ,'and','min','max','not','or','xor','sub','mult']
        
        return node_types.map((type) => {
            console.log(nodeMenuBase(type))
            return nodeMenuBase(type)
        })
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
            ...nodeAddMenus(),
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
