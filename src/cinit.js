let initconfig = {
    container: document.getElementById('cy'),

    layout: {
        name: 'cola',
        fit: false,
    },

    style: [
        {
            selector: '.soma',
            css: {
                'background-color': '#fff',
                'background-image': './images/add.png',
            },
        },
        {
            selector: '.subtracao',
            css: {
                'background-color': '#fff',
                'background-image': './images/minus.png',
            },
        },
        {
            selector: '.multiplicacao',
            css: {
                'background-color': '#fff',
                'background-image': './images/multiply.png',
            },
        },
        {
            selector: '.input',
            css: {
                'background-color': '#fff',
                'background-image': './images/input.png',
            },
        },
        {
            selector: '.input_selected',
            css: {
                'background-color': 'blue',
                'border-color': 'blue',
                'background-image': './images/input.png',
            },
        },
        {
            selector: '.output',
            css: {
                'background-color': '#fff',
                'background-image': './images/output.png',
            },
        },
        {
            selector: 'node',
            css: {
                'background-fit': 'contain',
                'border-color': '#000',
                'border-width': 1,
                'border-opacity': 0.5,
                width: 50,
                height: 50,
            },
        },
        {
            selector: '.eh-handle',
            css: {
                'background-color': 'red',
                width: 15,
                height: 15,
                shape: 'ellipse',
                'overlay-opacity': 0,
                'border-width': 5, // makes the handle easier to hit
                'border-opacity': 0,
                'background-color': '#e53935',
                'border-color': '#ab000d',
            },
        },
        {
            selector: 'edge',
            css: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
            },
        },
        {
            selector: ':selected',
            css: {
                'background-color': '#90caf9',
                'border-color': '#002171',
            },
        },
    ],

    elements: {
        nodes: [
            {
                group: 'nodes',
                data: { id: 'n0', type: '-' },
                position: { x: 700, y: 100 },
                classes: ['subtracao'],
            },
            {
                group: 'nodes',
                data: { id: 'n1', type: '-' },
                position: { x: 800, y: 200 },
                classes: ['subtracao'],
            },
            {
                group: 'nodes',
                data: { id: 'n2', type: 'input' },
                position: { x: 600, y: 300 },
                classes: ['input'],
            },
            {
                group: 'nodes',
                data: { id: 'n3', type: 'input' },
                position: { x: 700, y: 400 },
                classes: ['input'],
            },
            {
                group: 'nodes',
                data: { id: 'n4', type: 'input' },
                position: { x: 700, y: 300 },
                classes: ['input'],
            },
            {
                group: 'nodes',
                data: { id: 'n5', type: 'input' },
                position: { x: 700, y: 200 },
                classes: ['input'],
            },
            {
                group: 'nodes',
                data: { id: 'n6', type: '+' },
                position: { x: 600, y: 200 },
                classes: ['soma'],
            },
            {
                group: 'nodes',
                data: { id: 'n7', type: '+' },
                position: { x: 800, y: 400 },
                classes: ['soma'],
            },
            {
                group: 'nodes',
                data: { id: 'n8', type: 'input' },
                classes: ['input'],
            },
        ],
        edges: [
            {
                group: 'edges',
                data: { id: 'e0', source: 'n2', target: 'n6' },
            },
            {
                group: 'edges',
                data: { id: 'e1', source: 'n3', target: 'n6' },
            },
            {
                group: 'edges',
                data: { id: 'e2', source: 'n4', target: 'n6' },
            },
            {
                group: 'edges',
                data: { id: 'e3', source: 'n5', target: 'n6' },
            },
            {
                group: 'edges',
                data: { id: 'e4', source: 'n6', target: 'n1' },
            },
            {
                group: 'edges',
                data: { id: 'e5', source: 'n8', target: 'n6' },
            },
        ],
    },
}

export default initconfig
