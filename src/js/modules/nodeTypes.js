const baseNodeTypes = require('../../assets/json/nodeTypes.json');

const c = (function () {
  // function getClasses(props) {
  //   const classes = [];
  //   if (props.reducible) { classes.push('reducible'); }
  //   return classes;
  // }
  // console.log(baseNodeTypes);
  const nodeTypes = {};
  const types = [];
  const styles = [];

  baseNodeTypes.forEach((node) => {
    const {
      reducible,
      comutative,
      optype,
    } = node.props;

    const classes = [node.name];
    types.push(node.name);

    if (reducible) { classes.push('reducible'); }
    if (optype === 'binary' && !comutative) { classes.push('swap'); }

    nodeTypes[node.name] = {
      group: 'nodes',
      classes,
      data: { optype, type: node.name },
    };

    styles.push({
      selector: `.${node.name}`,
      style: node.style,
    });
  });

  return {
    get styles() {
      return styles;
      // return baseNodeTypes.map((node) => ({
      //   selector: `.${node.name}`,
      //   style: node.style,
      // }));
    },
    get nodes() {
      return nodeTypes;
      // return baseNodeTypes.map((node) => ({
      //   name: node.name,
      // }));
    },
    node(type) { // , indata, outdata) {
      // const baseNode = nodeTypes[type];
      // const data = { ...baseNode.data, ...(indata || {}) };
      // const newNode = {
      //   ...baseNode,
      //   ...data,
      //   ...(outdata || {}),
      // };
      // return newNode;
      return nodeTypes[type];
    },
    get types() {
      return types;
    },
    // add(style) {
    //   baseNodeTypes.push(style);
    // },
  };
}());

console.log(c.node('add'));
console.log(c.node('sub'));
export default c;
