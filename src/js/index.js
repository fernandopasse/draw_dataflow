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

const menus = contextMenusModule(cy, nodeTypes);

cy.edgehandles({
  noEdgeEventsInDraw: false,
  complete(sourceNode, targetNode, addedEles) {
    if (targetNode.hasClass('reducible') && targetNode.indegree() > 2) targetNode.addClass('reduce');
    // console.log(targetNode.classes());
  },
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
