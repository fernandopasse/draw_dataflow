import './css/style.scss';
import 'bootstrap';
import 'popper.js';
import 'bootstrap/scss/bootstrap.scss';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import cola from 'cytoscape-cola';
// import dagre from 'cytoscape-dagre'
// import klay from 'cytoscape-klay'
// import coseb from 'cytoscape-cose-bilkent'
// import avsdf from 'cytoscape-avsdf'
import config from './cinit';
import exportModule from './js/module/export';
import adjustLayoutModule from './js/module/adjustLayout';
import ElCounter from './js/utils/idGenerator';
import importModule from './js/module/import';
import contextMenusModule from './js/module/contextMenus';

const idgen = new ElCounter();

cytoscape.use(edgehandles);
cytoscape.use(cola);

const cy = cytoscape(config);

contextMenusModule(cy, cytoscape, idgen);

cy.edgehandles({
  noEdgeEventsInDraw: true,
});

cy.on('ehcomplete', (event, sourceNode, targetNode) => {
  if (targetNode.data('type') === 'add' || targetNode.data('type') === 'mult') {
    if (targetNode.indegree() > 2) {
      targetNode.addClass('reduce');
    }
  }
  console.log(targetNode.classes());
});

cy.filter((node) => ((node.data('type') === 'add'
  || node.data('type') === 'mult')
  && node.indegree() > 2)).addClass('reduce');

$('#export').click(() => {
  exportModule(cy);
});

$('#import').click(() => {
  importModule(cy, idgen);
});

$('#adjust-layout').click(() => {
  adjustLayoutModule(cy);
});
