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
  const modalBody = $('.modal-body');
  $('.modal-dialog').addClass('modal-lg');
  modalBody.children().remove();
  const htmlstring = `<div class="row">
    <form class="col">
      <label for="data" class="col-form-label-lg">Input</label>
      <div class="form-group">
        <label for="data" class="col-form-label">Data:</label>
        <input type="text" class="form-control" id="data-input">
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="id">Id</label>
          <input type="text" class="form-control" id="data-input-id" placeholder="">
        </div>
        <div class="form-group col-md-6">
          <label for="size">Size</label>
          <input type="number" class="form-control" id="data-input-size" placeholder="">
        </div>
      </div>
    </form>
    <form class="col">
      <label for="data" class="col-form-label-lg">Output</label>
      <div class="form-group">
        <label for="data" class="col-form-label">Data:</label>
        <input type="text" class="form-control" id="data-input">
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="id">Id</label>
          <input type="text" class="form-control" id="data-input-id" placeholder="">
        </div>
        <div class="form-group col-md-6">
          <label for="size">Size</label>
          <input type="number" class="form-control" id="data-input-size" placeholder="">
        </div>
      </div>
    </form>
  </div>`;
  modalBody.html(htmlstring);
  $('#modalTitle').text('Simular CPU');
  $('#btn-save').text('Simular');
  $('#btn-close').text('Fechar');
  $('#modal-div').modal();
});

$('#cgra_conf').click(() => {
  const htmlstring = `<form class="col">
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="id">id</label>
      <input type="text" class="form-control" id="modal-input-id" placeholder="">
    </div>
    <div class="form-group col-md-6">
      <label for="word_size">word_size</label>
      <input type="text" class="form-control" id="modal-input-word_size" placeholder="">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="num_pe">num_pe</label>
      <input type="text" class="form-control" id="modal-input-num_pe" placeholder="">
    </div>
    <div class="form-group col-md-4">
      <label for="num_in">num_in</label>
      <input type="text" class="form-control" id="modal-input-num_in" placeholder="">
    </div>
    <div class="form-group col-md-4">
      <label for="num_out">num_out</label>
      <input type="text" class="form-control" id="modal-input-num_out" placeholder="">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="net_radix">net_radix</label>
      <input type="text" class="form-control" id="modal-input-net_radix" placeholder="">
    </div>
    <div class="form-group col-md-6">
      <label for="net_extra_stagies">net_extra_stagies</label>
      <input type="text" class="form-control" id="modal-input-net_extra_stagies" placeholder="">
    </div>
  </div>
</form>`;
  $('.modal-dialog').removeClass('modal-lg');
  const modalBody = $('.modal-body');
  modalBody.children().remove();
  modalBody.html(htmlstring);
  $('#modalTitle').text('Configurações CGRA');
  $('#btn-save').text('Salvar');
  $('#btn-close').text('Fechar');
  $('#modal-div').modal();
});

copyModule(cy);
