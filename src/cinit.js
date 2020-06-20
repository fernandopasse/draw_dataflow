import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import contextMenus from 'cytoscape-context-menus';
import clipboard from 'cytoscape-clipboard';
import undoRedo from 'cytoscape-undo-redo';
import cola from 'cytoscape-cola';

import $ from 'jquery';
import nodeTypes from './js/module/nodeTypes';
// import idgen from './js/utils/idGenerator';

cytoscape.use(contextMenus, $);
cytoscape.use(clipboard, $);
cytoscape.use(edgehandles);
undoRedo(cytoscape);
cytoscape.use(cola);

// for (let i = 0; i < 10; i += 1) {
//   console.log(`idgen: ${idgen.next}`);
// }

const initconfig = {
  container: document.getElementById('cy'),

  layout: {
    name: 'cola',
    fit: false,
    maxSimulationTime: 1000,
  },

  style: [
    {
      selector: '.abs',
      css: {
        'background-color': '#fff',
        'background-image': './images/abs.png',
      },
    },
    {
      selector: '.xor',
      css: {
        'background-color': '#fff',
        'background-image': './images/xor.png',
      },
    },
    {
      selector: '.or',
      css: {
        'background-color': '#fff',
        'background-image': './images/or.png',
      },
    },
    {
      selector: '.not',
      css: {
        'background-color': '#fff',
        'background-image': './images/not.png',
      },
    },
    {
      selector: '.min',
      css: {
        'background-color': '#fff',
        'background-image': './images/min.png',
      },
    },
    {
      selector: '.max',
      css: {
        'background-color': '#fff',
        'background-image': './images/max.png',
      },
    },
    {
      selector: '.and',
      css: {
        'background-color': '#fff',
        'background-image': './images/and.png',
      },
    },
    {
      selector: '.add',
      css: {
        'background-color': '#fff',
        'background-image': './images/add.png',
      },
    },
    {
      selector: '.addi',
      css: {
        'background-color': '#fff',
        // 'background-image': './images/add.png',
      },
    },
    {
      selector: '.sub',
      css: {
        'background-color': '#fff',
        'background-image': './images/minus.png',
      },
    },
    {
      selector: '.mult',
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
        width: 50,
        height: 50,
      },
    },
    {
      selector: '.selected',
      css: {
        'background-color': '#90caf9',
        'border-color': '#002171',
        'line-color': '#002171',
        'target-arrow-color': '#002171',
      },
    },
    {
      selector: '.eh-handle',
      css: {
        'background-color': 'red',
        width: 15,
        height: 15,
        shape: 'ellipse',
        'overlay-opacity': 0,
        'border-width': 5, // makes the handle easier to hit
        'border-opacity': 0,
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
    {
      selector: '.reduce',
      css: {
        'border-color': '#1b5e20',
        'border-width': 3,
      },
    },
  ],

  elements: {
    nodes: [
      {
        group: 'nodes',
        data: { id: 'n0', type: 'sub' },
        classes: ['sub'],
      },
      {
        group: 'nodes',
        data: { id: 'n1', type: 'sub' },
        classes: ['sub'],
      },
      {
        group: 'nodes',
        data: { id: 'i1', type: 'input' },
        classes: ['input'],
      },
      {
        group: 'nodes',
        data: { id: 'i2', type: 'input' },
        classes: ['input'],
      },
      {
        group: 'nodes',
        data: { id: 'i3', type: 'input' },
        classes: ['input'],
      },
      {
        group: 'nodes',
        data: { id: 'i4', type: 'input' },
        classes: ['input'],
      },
      {
        group: 'nodes',
        data: { id: 'n6', type: 'or' },
        classes: ['or', 'reducible'],
      },
      {
        group: 'nodes',
        data: { id: 'n7', type: 'add' },
        classes: ['add', 'reducible'],
      },
      {
        group: 'nodes',
        data: { id: 'i5', type: 'input' },
        classes: ['input'],
      },
    ],
    edges: [
      {
        group: 'edges',
        data: { id: 'e0', source: 'i1', target: 'n6' },
      },
      {
        group: 'edges',
        data: { id: 'e1', source: 'i2', target: 'n6' },
      },
      {
        group: 'edges',
        data: { id: 'e2', source: 'i3', target: 'n6' },
      },
      {
        group: 'edges',
        data: { id: 'e3', source: 'i4', target: 'n6' },
      },
      {
        group: 'edges',
        data: { id: 'e4', source: 'n6', target: 'n1' },
      },
      // {
      //     group: 'edges',
      //     data: { id: 'e5', source: 'i5', target: 'n6' },
      // },
    ],
  },
};

const cy = cytoscape(initconfig);
// cy.idgen = idgen;

cy.filter((node) => node.hasClass('reducible') && node.indegree() > 2).addClass('reduce');

cy.on('mouseover', 'node,edge', (evt) => {
  const element = evt.target;
  element.toggleClass('selected');
});

cy.on('mouseout', 'node,edge', (evt) => {
  const element = evt.target;
  element.toggleClass('selected');
});

cy.on('add', 'edge', (evt) => {
  console.log(evt.target.data());
});
export default cy;
// export default (function () {
//   //let idgen = idgen;
//   const cy = cytoscape(initconfig);
//   cy.add = function (el) {
//     return cy.add(el.map(e => {
//       return {
//       ...e, id: `${idgen.next}`
//       }
//     }));
//   };
//   //cy.idgen = idgen;

//   return cy;
// }());
