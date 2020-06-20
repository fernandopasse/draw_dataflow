import 'bootstrap/js/dist/dropdown';
import { uuid } from 'uuidv4';
import treeReduceModule from './treeReduceModule';
// import idgen from '../utils/idGenerator';

export default function menus(cy) {
  const selectAllOfTheSameType = (ele) => {
    cy.elements().unselect();
    if (ele.isNode()) {
      // console.log(ele.data());
      cy.nodes(`[type = "${ele.data('type')}"]`).select(); // .addClass('selected')
    } else if (ele.isEdge()) {
      cy.edges().select();
    }
  };

  const nodeAddMenus = () => {
    const nodeMenuBase = (node) => {
      let theNode = node;

      if (typeof theNode === 'string') {
        theNode = { type: theNode };
      }

      const { type, menuopt, nodeopt } = theNode;

      let data = { type };
      let classes = [type];

      if (nodeopt !== undefined) {
        if (nodeopt.data !== undefined) {
          data = { ...data, ...nodeopt.data };
          delete nodeopt.data;
        }

        if (nodeopt.classes !== undefined) {
          classes = [...classes, ...nodeopt.classes];
          delete nodeopt.classes;
        }
      }

      // data.id = `${idgen.next}`
      // console.log(`ID Gerado: ${data.id}`);

      return {
        id: `${type}-node`,
        content: `Adicionar nodo ${type.toUpperCase()}`,
        tooltipText: `Adicione um NODO com a função de ${type}`,
        coreAsWell: true,
        onClickFunction(event) {
          const { x, y } = event.position || event.cyPosition;
          data.id = uuid();
          cy.add({
            group: 'nodes',
            data,
            position: {
              x,
              y,
            },
            classes,
          });
        },
        ...(menuopt || {}),
      };
    };

    const nodeTypes = [
      'input',
      'output',
      ...['add', 'and', 'min', 'max', 'not', 'or', 'xor', 'mult'].map((op) => ({
        type: op,
        nodeopt: {
          classes: ['reducible'],
        },
      })),
      {
        type: 'addi',
        menuopt: {
          id: 'soma-node-inteiro',
          content: 'Adicionar nodo SOMA com inteiro',
          tooltipText: 'Adicione um NODO com a função de soma com inteiro',
        },
      },
      'sub',
    ];

    return nodeTypes.map((type) => {
      console.log(nodeMenuBase(type));
      return nodeMenuBase(type);
    });
  };

  const menus = cy.contextMenus({
    menuItems: [
      {
        id: 'hide',
        content: 'Ocultar Nodo',
        tooltipText: 'Ocultar NODO selecionado',
        selector: 'node, edge',
        onClickFunction(event) {
          const target = event.target || event.cyTarget;
          target.hide();
        },
        disabled: false,
      },
      ...nodeAddMenus(),
      {
        id: 'remover-selecionado',
        content: 'Remover selecionados',
        tooltipText: 'Remover NODOs ou ARESTAS selecionadas',
        coreAsWell: true,
        onClickFunction() {
          const reduceNodes = cy
            .$(':selected')
            .filter('edge')
            .targets()
            .filter('.reduce');
          cy.$(':selected').remove();
          reduceNodes.forEach((node) => {
            if (node.indegree() <= 2) {
              node.removeClass('reduce');
            }
          });
        },
      },
      {
        id: 'remover-nodo',
        content: 'Remover nodo',
        tooltipText: 'Remover nodo',
        selector: 'node',
        onClickFunction(event) {
          const target = event.target || event.cyTarget;
          const reduceNBTargets = target.outgoers().targets('reduce');
          target.remove();
          reduceNBTargets.forEach((node) => {
            if (node.indegree() < 3) node.removeClass('reduce');
          });
        },
      }, {
        id: 'remover-aresta',
        content: 'Remover aresta',
        tooltipText: 'Remover aresta',
        selector: 'edge',
        onClickFunction(event) {
          const target = event.target || event.cyTarget;
          const reduceNodeTargets = target.targets('reduce');
          target.remove();
          reduceNodeTargets.forEach((node) => {
            if (node.indegree() < 3) node.removeClass('reduce');
          });
        },
      },
      // {
      //   id: 'selecionar-nodos',
      //   content: 'Seleciona todos os NODOS do mesmo tipo',
      //   tooltipText: 'Selecionar todos os NODOS',
      //   selector: 'node',
      //   onClickFunction(event) {
      //     selectAllOfTheSameType(event.target || event.cyTarget);
      //   },
      // },
      // {
      //   id: 'selecionar-aresta',
      //   content: 'Seleciona todas as ARESTAS',
      //   tooltipText: 'Seleciona todas as ARESTAS',
      //   selector: 'edge',
      //   onClickFunction(event) {
      //     selectAllOfTheSameType(event.target || event.cyTarget);
      //   },
      // },
      {
        id: 'reduzir',
        content: 'Reduzir operação',
        tooltipText: 'Reduzir operação',
        selector: '.reduce',
        onClickFunction(event) {
          treeReduceModule(event.target || event.cyTarget, cy);
        },
      },
    ],
    menuItemClasses: ['dropdown-item'],
    contextMenuClasses: ['dropdown-menu'],
  });

  cy.on('cxttap', () => {
    console.log(cy.$(':selected').length);
    if (cy.$(':selected').length > 0) {
      menus.showMenuItem('remover-selecionado');
    } else {
      menus.hideMenuItem('remover-selecionado');
    }
  });

  // menus.appendMenuItem({
  //   id: 'remover',
  //   content: 'Remover',
  //   tooltipText: 'Remover',
  //   selector: 'node',
  //   coreAsWell: true,
  //   onClickFunction(event) {
  //     const target = event.target || event.cyTarget;
  //     // const target = event.target || event.cyTarget;
  //     // const targets = cy.$(':selected');
  //     // if (targets.length > 0) {
  //     //   console.log(targets.length);
  //     // } else {
  //     //   const { target } = event;
  //     //   if (target !== cy) {
  //     //     if (target.isEdge()) {
  //     //       const nodeTarget = target.target();
  //     //       if (nodeTarget.hasClass('reduce') && nodeTarget.indegree() === 3) {
  //     //         nodeTarget.removeClass('reduce');
  //     //       }
  //     //     }
  //     //     targets.remove();
  //     //   }
  //     // }
  //     //
  //     //
  //   },
  //   hasTrailingDivider: true,
  // });
}
