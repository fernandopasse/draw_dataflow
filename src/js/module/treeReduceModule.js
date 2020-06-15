import adjustLayoutModule from './adjustLayout';

export default function treeReduceModule(opnode, cy) {
  // console.log(opnode.data(),opnode.openNeighborhood('edge').map(ele => ele.data()))
  const currentEdges = opnode.incomers('edge');
  const nodesarray = currentEdges.sources();
  const type = opnode.data('type');
  const nodeclass = type === 'add' ? 'add' : 'mult';

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
      // const nid = `${idgen.next}`;
      newNode = cy.add({
        group: 'nodes',
        // data: { id: nid, type },
        data: { type },
        // position : position,
        classes: [nodeclass],
      }); // .toArray()[0]

      nid = newNode.id();

      newEdges = newEdges.union(
        cy.add([
          {
            group: 'edges',
            data: { source: nodesarray[2 * i].id(), target: nid },
          },
          {
            group: 'edges',
            data: {
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
          // id: `${idgen.next}`,
          source: nodesarray[0].data('id'),
          target: opnode.id(),
        },
      },
      {
        group: 'edges',
        data: {
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
