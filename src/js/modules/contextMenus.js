import 'bootstrap/js/dist/dropdown';
import { v4 } from 'uuid';
import treeReduceModule from './treeReduceModule';
import {
  group,
  ungroup,
  subgroup,
  removeFromGroup,
  removeElements,
} from './groupModule';
// import removeElements from './removeModule';

// import idgen from '../utils/idGenerator';

export default function contextMenus(cy, nodeTypes) {
  // const selectAllOfTheSameType = (ele) => {
  //   cy.elements().unselect();
  //   if (ele.isNode()) {
  //     // console.log(ele.data());
  //     cy.nodes(`[type = "${ele.data('type')}"]`).select(); // .addClass('selected')
  //   } else if (ele.isEdge()) {
  //     cy.edges().select();
  //   }
  // };
  // function addMenus() {
  //   return {
  //     type: op,
  //     nodeopt: {
  //       classes: ['reducible'],
  //     },
  //   };
  // }

  const addNodeMenus = () => {
    const menuOption = function (type) {
      return {
        id: `${type}-node`,
        content: `Adicionar nodo ${type.toUpperCase()}`,
        tooltipText: `Adicione um NODO com a função de ${type}`,
        coreAsWell: true,
        onClickFunction(event) {
          const { x, y } = event.position || event.cyPosition;
          const node = nodeTypes.node({
            type,
            data: { id: v4() },
            position: { x, y },
          });
          cy.add(node);
        },
      };
      // ...(menuopt || {}),
    };

    return nodeTypes.types.map(type => menuOption(type));

    // console.log(nodeTypes.node(node));
    // if (typeof theNode === 'string') {
    //   theNode = { type: theNode };
    // }

    // const { type, menuopt, nodeopt } = theNode;

    // let data = { type };
    // let classes = [type];

    // if (nodeopt !== undefined) {
    //   if (nodeopt.data !== undefined) {
    //     data = { ...data, ...nodeopt.data };
    //     delete nodeopt.data;
    //   }

    //   if (nodeopt.classes !== undefined) {
    //     classes = [...classes, ...nodeopt.classes];
    //     delete nodeopt.classes;
    //   }
    // }

    // data.id = `${idgen.next}`
    // console.log(`ID Gerado: ${data.id}`);
  };

  const menus = cy.contextMenus({
    menuItems: [
      // {
      //   id: 'hide',
      //   content: 'Ocultar Nodo',
      //   tooltipText: 'Ocultar NODO selecionado',
      //   selector: 'node, edge',
      //   onClickFunction(event) {
      //     const target = event.target || event.cyTarget;
      //     target.hide();
      //   },
      //   disabled: false,
      // },
      ...addNodeMenus(),
      {
        id: 'remover-selecionado',
        content: 'Remover selecionados',
        tooltipText: 'Remover NODOs ou ARESTAS selecionadas',
        coreAsWell: true,
        onClickFunction() {
          const target = cy.$(':selected');

          removeElements(target, cy);
          cy.$('.reduce').forEach(node => {
            if (node.indegree() < 3) node.removeClass('reduce');
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
          // target.remove();
          removeElements(target, cy);
          cy.$('.reduce').forEach(node => {
            if (node.indegree() < 3) node.removeClass('reduce');
          });
        },
      },
      {
        id: 'remover-aresta',
        content: 'Remover aresta',
        tooltipText: 'Remover aresta',
        selector: 'edge',
        onClickFunction(event) {
          const target = event.target || event.cyTarget;
          // const reduceNodeTargets = target.targets('reduce');
          target.remove();
          cy.$('.reduce').forEach(node => {
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
          treeReduceModule(event.target || event.cyTarget, cy, nodeTypes);
        },
      },
      {
        id: 'group',
        content: 'Agrupar elementos',
        tooltipText: 'Agrupar elementos',
        onClickFunction() {
          const selectedElements = cy.$('.nodes,:selected');
          console.log(selectedElements.length);
          group(selectedElements, cy);
          selectedElements.unselect();
        },
      },
      {
        id: 'ungroup',
        content: 'Desagrupar elementos',
        tooltipText: 'Desagrupar elementos',
        selector: '.parent',
        onClickFunction(event) {
          ungroup(event.target || event.cyTarget, cy);
          // const selectedElements = cy.$(':selected');
          // ungroup(selectedElements, cy);
        },
      },
      {
        id: 'subgroup',
        content: 'Criar subgrupo',
        tooltipText: 'Criar subgrupo',
        onClickFunction(_) {
          subgroup(cy.$('.nodes,:selected'), cy);
          cy.nodes().unselect();
          // const selectedElements = cy.$(':selected');
          // ungroup(selectedElements, cy);
        },
      },
      {
        id: 'removeGroup',
        content: 'Remover do grupo',
        tooltipText: 'Remover do grupo',
        selector: 'node > node',
        onClickFunction(event) {
          const target = event.target || event.cyTarget;
          removeFromGroup(target);
        },
      },
    ],
    menuItemClasses: ['dropdown-item'],
    contextMenuClasses: ['dropdown-menu'],
  });

  cy.on('cxttap', () => {
    console.log(cy.$(':selected').length);
    const selectedElements = cy.$(':selected');
    if (selectedElements.length > 0) {
      menus.showMenuItem('remover-selecionado');
    } else {
      menus.hideMenuItem('remover-selecionado');
    }

    // Group menus
    const selectedNodes = selectedElements.filter('node');
    if (selectedNodes.length > 1) {
      menus.showMenuItem('group');

      if (
        selectedNodes.parent().length === 1 &&
        selectedNodes.parent().children().contains(selectedNodes) &&
        selectedNodes.parent().children().length !== selectedNodes.length
      ) {
        menus.showMenuItem('subgroup');
        // menus.hideMenuItem('group');
      } else {
        menus.hideMenuItem('subgroup');
      }
    } else {
      menus.hideMenuItem('group');
    }

    // }
  });
}
