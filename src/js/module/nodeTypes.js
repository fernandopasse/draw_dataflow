const baseNodeTypes = {
  input: { classes: ['input'] },
  output: { classes: ['output'] },
  ...['add', 'and', 'min', 'max', 'not', 'or', 'xor', 'mult'].reduce((nodes, nodeType) => {
    nodes[nodeType] = { classes: [nodeType, 'reducible'] };
    return nodes;
  }, {}),
  addi: { classes: ['addi'] },
  sub: { classes: ['sub'] },
};

export default baseNodeTypes;
