import '../css/style.scss';
import 'bootstrap';
import 'popper.js';
import 'bootstrap/scss/bootstrap.scss';
import { cy, nodeTypes } from './cinit';
import exportModule from './modules/export';
import adjustLayoutModule from './modules/adjustLayout';
// import ElCounter from './js/utils/idGenerator';
import importModule from './modules/import';
import contextMenusModule from './modules/contextMenus';
import copyModule from './modules/copy';

contextMenusModule(cy, nodeTypes);

cy.edgehandles({
  noEdgeEventsInDraw: true,
  start(sourceNode) {
    console.log(cy.$('node[numOperands>0]').length);
    cy.$('node[numOperands>0]')
      .filter(
        node =>
          node.indegree() >= node.data('numOperands') && !node.same(sourceNode),
      )
      .addClass('invalid');
  },
  stop() {
    console.log(cy.$('node[numOperands>0]').length);
    cy.$('node[numOperands>0]').removeClass('invalid');
  },
  edgeType(sourceNode, targetNode) {
    if (targetNode.indegree() >= targetNode.data('numOperands')) {
      return null;
    }
    // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
    // returning null/undefined means an edge can't be added between the two nodes
    return {};
  },

  complete(sourceNode, targetNode, _) {
    if (targetNode.hasClass('reducible') && targetNode.indegree() > 2)
      targetNode.addClass('reduce');
  },
  // previewon() {
  //   cy.$('.eh-ghost-edge').ad;
  // },
  // previewoff() {

  // },
  // hoverover(sourceNode, targetNode) {
  //   console.log('node', cy.$('.eh-ghost-edge'));
  //   if (targetNode.indegree() >= targetNode.data('numOperands')) {
  //     // console.log('MAX');
  //   }
  // },
  // hoverout() {
  //   cy.$('.eh-preview.eh-preview-active, .eh-ghost-edge, .eh-hover').removeClass('invalid');
  // },
});

// cy.on('ehcomplete', (event, sourceNode, targetNode) => {

// });

$('#export').click(() => {
  exportModule(cy);
});

$('#import').click(() => {
  importModule(cy);
});

$('#adjust-layout').click(() => {
  adjustLayoutModule(cy);
});

copyModule(cy);
