import './css/style.scss';
import 'bootstrap';
import 'popper.js';
import 'bootstrap/scss/bootstrap.scss';
import cy from './cinit';
import exportModule from './js/module/export';
import adjustLayoutModule from './js/module/adjustLayout';
// import ElCounter from './js/utils/idGenerator';
import importModule from './js/module/import';
import contextMenusModule from './js/module/contextMenus';
import copyModule from './js/module/copy';

contextMenusModule(cy);

cy.edgehandles({
  noEdgeEventsInDraw: false,
  complete(sourceNode, targetNode, addedEles) {
    if (targetNode.hasClass('reducible') && targetNode.indegree() > 2) targetNode.addClass('reduce');
    console.log(targetNode.classes());
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
