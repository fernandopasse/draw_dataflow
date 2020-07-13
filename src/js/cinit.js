import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import contextMenus from 'cytoscape-context-menus';
import clipboard from 'cytoscape-clipboard';
import undoRedo from 'cytoscape-undo-redo';
import cola from 'cytoscape-cola';
import nodeHtmlLabel from 'cytoscape-node-html-label';
// import compoundDragAndDrop from 'cytoscape-compound-drag-and-drop';

import $ from 'jquery';
import nodeTypes from './modules/nodeTypes';
import styles from '../assets/json/styles.json';
// import styles from
// import idgen from './js/utils/idGenerator';

cytoscape.use(contextMenus, $);
cytoscape.use(clipboard, $);
cytoscape.use(edgehandles);
undoRedo(cytoscape);
cytoscape.use(cola);
nodeHtmlLabel(cytoscape);

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

  style: [...nodeTypes.styles, ...styles],

  elements: {
    nodes: [
      {
        group: 'nodes',
        data: { id: 'np' },
        classes: ['parent'],
      },
      ...[
        { type: 'sub', data: { id: 'n0' } },
        { type: 'sub', data: { id: 'n1' } },
        { type: 'input', data: { id: 'i1', parent: 'np' } },
        { type: 'input', data: { id: 'i2', parent: 'np' } },
        { type: 'input', data: { id: 'i3' } },
        { type: 'input', data: { id: 'i4', parent: 'np' } },
        { type: 'or', data: { id: 'n6' } },
        { type: 'add', data: { id: 'n7', parent: 'np' } },
        { type: 'addi', data: { id: 'i5', iVal: 58010 } },
      ].map(node => nodeTypes.node(node)),
      // {
      //   group: 'nodes',
      //   data: { id: 'n0', type: 'sub', numOperands: 2, commutative: false },
      //   classes: ['sub'],
      // },
      // {
      //   ...nodeTypes.node('sub'),
      //   id: 'n1',
      // },
      // {
      //   group: 'nodes',
      //   data: { id: 'n1', type: 'sub', numOperands: 2, commutative: false },
      //   classes: ['sub'],
      // },
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
      {
        group: 'edges',
        data: { id: 'e5', source: 'n6', target: 'n1' },
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

cy.filter(node => node.hasClass('reducible') && node.indegree() > 2).addClass(
  'reduce',
);

cy.on('mouseover', 'node,edge', evt => {
  const element = evt.target;
  element.toggleClass('selected');
});

cy.on('mouseout', 'node,edge', evt => {
  const element = evt.target;
  element.toggleClass('selected');
});

cy.on('click', 'node', evt => {
  evt.target.incomers().forEach(elem => {
    console.log(elem);
    elem.removeClass('eh-preview');
    // console.log(elem.classes());
  });

  console.log('nodeInfo', evt.target.data());
});

cy.nodeHtmlLabel([
  {
    query: '.IOperator',
    cssClass: 'iopbox',
    tpl(data) {
      return `<p>${data.type}</p><p>${data.iVal}</p>`;
    },
  },
]);

// cy.on('add', 'edge', (evt) => {
//   console.log(evt.target.data());
// });

// cy.
export { cy, nodeTypes };
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
