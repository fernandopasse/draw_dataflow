import contextMenus from 'cytoscape-context-menus'
import $ from 'jquery'

export default function menus(cy,cytoscape) {

    cytoscape.use(contextMenus, $)

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
}
