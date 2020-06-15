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

contextMenusModule(cy);

cy.edgehandles({
  noEdgeEventsInDraw: true,
});

cy.on('ehcomplete', (event, sourceNode, targetNode) => {
  if (
    targetNode.data('type') === 'add'
        || targetNode.data('type') === 'mult'
  ) {
    if (targetNode.indegree() > 2) {
      targetNode.addClass('reduce');
    }
  }
  console.log(targetNode.classes());
});

cy.filter(
  (node) => (node.data('type') === 'add' || node.data('type') === 'mult')
        && node.indegree() > 2,
).addClass('reduce');

$('#export').click(() => {
  exportModule(cy);
});

$('#import').click(() => {
  importModule(cy, idgen);
});

$('#adjust-layout').click(() => {
  adjustLayoutModule(cy);
});
