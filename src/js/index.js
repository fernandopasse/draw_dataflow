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
    cy.$('node[numOperands>0]')
      .filter(
        node =>
          node.indegree() >= node.data('numOperands') && !node.same(sourceNode),
      )
      .addClass('invalid');
  },
  stop() {
    cy.$('node[numOperands>0]').removeClass('invalid');
  },
  edgeType(sourceNode, targetNode) {
    if (targetNode.indegree() >= targetNode.data('numOperands')) {
      return null;
    }
    if (targetNode.hasClass('parent')) {
      return null;
    }
    return 'flat';
  },

  edgeParams(sourceNode, targetNode, _) {
    if (targetNode.data('commutative') === false) {
      // console.log('incomers', targetNode.incomers('edge').data());
      const opNum = targetNode.incomers('edge').data('opNum') === 1 ? 2 : 1;

      return {
        data: {
          opNum,
        },
        classes: ['operand'],
      };
    }
    return {};
  },

  complete(sourceNode, targetNode, addedEles) {
    if (targetNode.hasClass('reducible') && targetNode.indegree() > 2)
      targetNode.addClass('reduce');
    console.log(targetNode.data());
    if (targetNode.data('commutative') === false) {
      console.log('commute', addedEles.data(), addedEles.classes());
    }
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

$('#sim_cpu').click(() => {
  const htmlstring = label => `<div class="form-group">
      <label for="message-text" class="col-form-label">${label}:</label>
      <input type="text" class="form-control" id="data-input">
      </div>`;

  $('#modalLongTitle').text('Simular alguma coisa');
  $('.modal-body>form').html(htmlstring('Data'));

  $('#modal-div').modal();
});

$('#cgra_conf').click(() => {
  $('#modal-div').modal();
});

copyModule(cy);
