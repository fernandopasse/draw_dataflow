import { v4 } from 'uuid';

export function group(elements, cy) {
  const parentNode = cy.add({
    group: 'nodes',
    data: {
      id: v4(),
    },
    classes: ['parent'],
  });

  const childNodes = elements.filter('node');
  console.log(parentNode.data());
  childNodes.forEach(node => {
    node.move({
      parent: parentNode.id(),
    });
  });
  console.log('data', childNodes.data());
  console.log(childNodes.parent().data());
}

export function ungroup(parent, cy) {
  console.log('children', parent.children());
}
