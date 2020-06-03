import './style.css';
import './cytoscape-context-menus.css';
import cytoscape from './cytoscape.umd';
import edgehandles from './cytoscape-edgehandles';
import $ from './jquery-3.5.1.min';
import contextMenus from './cytoscape-context-menus';
import cola from 'cytoscape-cola'

cytoscape.use(edgehandles);
cytoscape.use(contextMenus, $);
cytoscape.use(cola);

var cy = cytoscape({

      container: document.getElementById('cy'),

      layout: {
        name: 'cola', fit: false
      },

      style: [
        {
          selector: '.soma',
          css: {
            'background-color': '#fff',
            'background-image': './images/add.png'
          }
        },
        {
          selector: '.subtracao',
          css: {
            'background-color': '#fff',
            'background-image': './images/minus.png'
          }
        },
        {
          selector: '.multiplicacao',
          css: {
            'background-color': '#fff',
            'background-image': './images/multiply.png'
          }
        },
        {
          selector: '.input',
          css: {
            'background-color': '#fff',
            'background-image': './images/input.png'
          }
        },
        {
          selector: '.input_selected',
          css: {
            'background-color': 'blue',
            'border-color': 'blue',
            'background-image': './images/input.png'
          }
        },
        {
          selector: '.output',
          css: {
            'background-color': '#fff',
            'background-image': './images/output.png'
          }
        },
        {
          selector: 'nodes',
          css: {
            'background-fit': 'contain',
            'border-color': '#000',
            'border-width': 1,
            'border-opacity': 0.5,
            'width': 50,
            'height': 50
          }
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
          }
        },
        {
          selector: 'edge',
          css: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle'
          }
        },
        {
          selector: ':selected',
          css: {
            'background-color': '#90caf9',
            'border-color': '#002171',
          }
        }
      ],

      elements: {
        nodes: [],
        edges: []
      }

});

const selectAllOfTheSameType = function (ele) {
  cy.elements().unselect()
  if (ele.isNode()) {
    console.log(ele.data())
    cy.nodes(`[type = "${ele.data('type')}"]`).select()//.addClass('selected')
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
noEdgeEventsInDraw: true
});

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
      hasTrailingDivider: true
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
      disabled: false
    },
    {
      id: 'input-node',
      content: 'Adicionar nodo INPUT',
      tooltipText: 'Adicione um NODO com a função de input',
      coreAsWell: true,
      onClickFunction: function (event) {
        var data = {
          //group: 'nodes',
          id: Math.round(Math.random() * 100),
          type: 'input'
        }
        var pos = event.position || event.cyPosition
        cy.add({
          group: 'nodes',
          data: data,
          position: {
            x: pos.x,
            y: pos.y
          },
          classes: ['input']
        })
      }
    },
    {
      id: 'output-node',
      content: 'Adicionar nodo OUTPUT',
      tooltipText: 'Adicione um NODO com a função de output',
      coreAsWell: true,
      onClickFunction: function (event) {
        var data = {
          //group: 'nodes',
          id: Math.round(Math.random() * 100),
          type: 'output'
        }
        var pos = event.position || event.cyPosition
        cy.add({
          group: 'nodes',
          data: data,
          position: {
            x: pos.x,
            y: pos.y
          },
          classes: ['output']
        })
      }
    },
    {
      id: 'soma-node',
      content: 'Adicionar nodo SOMA',
      tooltipText: 'Adicione um NODO com a função de soma',
      coreAsWell: true,
      onClickFunction: function (event) {
        var data = {
          //group: 'nodes',
          id: Math.round(Math.random() * 100),
          type: '+'
        }
        var pos = event.position || event.cyPosition
        cy.add({
          group: 'nodes',
          data: data,
          position: {
            x: pos.x,
            y: pos.y
          },
          classes: ['soma']
        })
      }
    },
    {
      id: 'subtracao-node',
      content: 'Adicionar nodo SUBTRAÇÃO',
      tooltipText: 'Adicione um NODO com a função de subtração',
      coreAsWell: true,
      onClickFunction: function (event) {
        var data = {
          //group: 'nodes',
          id: Math.round(Math.random() * 100),
          type: '-'
        }
        var pos = event.position || event.cyPosition
        cy.add({
          group: 'nodes',
          data: data,
          position: {
            x: pos.x,
            y: pos.y
          },
          classes: ['subtracao']
        })
      }
    },
    {
      id: 'multiplicacao-node',
      content: 'Adicionar nodo MULTIPLICAÇãO',
      tooltipText: 'Adicione um NODO com a função de multiplicar',
      coreAsWell: true,
      onClickFunction: function (event) {
        var data = {
          //group: 'nodes',
          id: Math.round(Math.random() * 100),
          type: '*'
        }
        var pos = event.position || event.cyPosition
        cy.add({
          group: 'nodes',
          data: data,
          position: {
            x: pos.x,
            y: pos.y
          },
          classes: ['multiplicacao']
        })
      }
    },
    {
      id: 'remover-selecionado',
      content: 'Remover selecionados',
      tooltipText: 'Remover NODOs ou ARESTAS selecionadas',
      coreAsWell: true,
      onClickFunction: function (event) {
        cy.$(':selected').remove()
      }
    },
    {
      id: 'selecionar-nodos',
      content: 'Seleciona todos os NODOS do mesmo tipo',
      tooltipText: 'Selecionar todos os NODOS',
      selector: 'node',
      onClickFunction: function (event) {
        selectAllOfTheSameType(event.target || event.cyTarget)
      }
    },
    {
      id: 'selecionar-aresta',
      content: 'Seleciona todas as ARESTAS',
      tooltipText: 'Seleciona todas as ARESTAS',
      selector: 'edge',
      onClickFunction: function (event) {
        selectAllOfTheSameType(event.target || event.cyTarget)
      }
    }
  ]
});



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
  { group: 'nodes', data: { id: 'n0', type: '+' }, position: { x: 700, y: 100 }, classes: ['soma'] },
  { group: 'nodes', data: { id: 'n1', type: '-' }, position: { x: 800, y: 200 }, classes: ['subtracao'] },
  { group: 'nodes', data: { id: 'n2', type: 'input' }, position: { x: 600, y: 300 }, classes: ['input'] },
  { group: 'nodes', data: { id: 'n3', type: 'input' }, position: { x: 700, y: 400 }, classes: ['input'] },
  { group: 'nodes', data: { id: 'n4', type: '+' }, position: { x: 700, y: 300 }, classes: ['soma'] },
  { group: 'nodes', data: { id: 'n5', type: '-' }, position: { x: 700, y: 200 }, classes: ['subtracao'] },
  { group: 'nodes', data: { id: 'n6', type: '+' }, position: { x: 600, y: 200 }, classes: ['soma'] },
]);
console.log(cy.zoom())

document.getElementById('exportar').addEventListener("click", ()=> {
  console.log("okok")
});