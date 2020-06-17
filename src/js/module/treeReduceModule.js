import { uuid } from 'uuidv4';
import adjustLayoutModule from './adjustLayout';
import nodeTypes from './nodeTypes';

export default function treeReduceModule(opnode, cy) {
  // console.log(opnode.data(),opnode.openNeighborhood('edge').map(ele => ele.data()))
  const currentEdges = opnode.incomers('edge');
  const nodesarray = currentEdges.map((edge) => edge.source());
  const type = opnode.data('type');
  const nodeClasses = nodeTypes[type].classes;

  //   const allnodes = nodesarray.add(opnode);
  //   const bbox = allnodes.boundingBox();

  //   const position = {
  //     x: (bbox.x1 + bbox.x2)/2,
  //     y: (bbox.y1 + bbox.y2)/2,
  //   };

  let arrlength = nodesarray.length;
  let newEdges = cy.collection();
  let newNodes = cy.collection();
  let newNode; let nid;
  //   nodesarray = nodesarray;// .toArray()
  while (arrlength > 2) {
    for (let i = 0; i < parseInt(arrlength / 2, 10); i += 1) {
      console.log('i', i);
      nid = uuid();
      newNode = cy.add({
        group: 'nodes',
        data: { id: nid, type },
        // data: { type },
        // position : position,
        classes: nodeClasses,
      }); // .toArray()[0]

      // nid = newNode.id();

      newEdges = newEdges.union(
        cy.add([
          {
            group: 'edges',
            data: { id: uuid(), source: nodesarray[2 * i].id(), target: nid },
          },
          {
            group: 'edges',
            data: {
              id: uuid(),
              source: nodesarray[2 * i + 1].id(),
              target: nid,
            },
          },
        ]),
      );

      nodesarray[i] = newNode;
      newNodes = newNodes.add(newNode);
    }

    if (arrlength % 2 === 0) {
      arrlength /= 2;
    } else {
      arrlength -= 1;
      nodesarray[arrlength / 2] = nodesarray[arrlength];
      arrlength = arrlength / 2 + 1;
    }
  }

  newEdges = newEdges.union(
    cy.add([
      {
        group: 'edges',
        data: {
          id: uuid(),
          // id: `${idgen.next}`,
          source: nodesarray[0].data('id'),
          target: opnode.id(),
        },
      },
      {
        group: 'edges',
        data: {
          id: uuid(),
          // id: `${idgen.next}`,
          source: nodesarray[1].data('id'),
          target: opnode.id(),
        },
      },
    ]),
  );

  currentEdges.remove();
  opnode.removeClass('reduce');

  adjustLayoutModule(cy);
} // .addClass('selected')
