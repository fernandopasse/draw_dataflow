let initconfig = {
    container: document.getElementById('cy'),

    layout: {
        name: 'cola',
        fit: false,
        maxSimulationTime: 1000,
    },

    style: [
        {
            selector: '.add',
            css: {
                'background-color': '#fff',
                'background-image': './images/add.png',
            },
        },
        {
            selector: '.addi',
            css: {
                'background-color': '#fff',
                // 'background-image': './images/add.png',
            },
        },
        {
            selector: '.sub',
            css: {
                'background-color': '#fff',
                'background-image': './images/minus.png',
            },
        },
        {
            selector: '.mult',
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
        {
            selector: '.reduce',
            css: {
                'border-color': '#1b5e20',
                'border-width': 3
            },
        },
    ],

    elements: {
        nodes: [
            {
                group: 'nodes',
                data: { id: 'n0', type: 'sub' },
                classes: ['sub'],
            },
            {
                group: 'nodes',
                data: { id: 'n1', type: 'sub' },
                classes: ['sub'],
            },
            {
                group: 'nodes',
                data: { id: 'i1', type: 'input' },
                classes: ['input'],
            },
            {
                group: 'nodes',
                data: { id: 'i2', type: 'input' },
                classes: ['input'],
            },
            {
                group: 'nodes',
                data: { id: 'i3', type: 'input' },
                classes: ['input'],
            },
            {
                group: 'nodes',
                data: { id: 'i4', type: 'input' },
                classes: ['input'],
            },
            {
                group: 'nodes',
                data: { id: 'n6', type: 'add' },
                classes: ['add'],
            },
            {
                group: 'nodes',
                data: { id: 'n7', type: 'add' },
                classes: ['add'],
            },
            {
                group: 'nodes',
                data: { id: 'i5', type: 'input' },
                classes: ['input'],
            },
        ],
        edges: [
            {
                group: 'edges',
                data: { id: 'e0', source: 'i1', target: 'n6' },
            },
            {
                group: 'edges',
                data: { id: 'e1', source: 'i2', target: 'n6' },
            },
            {
                group: 'edges',
                data: { id: 'e2', source: 'i3', target: 'n6' },
            },
            {
                group: 'edges',
                data: { id: 'e3', source: 'i4', target: 'n6' },
            },
            {
                group: 'edges',
                data: { id: 'e4', source: 'n6', target: 'n1' },
            },
            // {
            //     group: 'edges',
            //     data: { id: 'e5', source: 'i5', target: 'n6' },
            // },
        ],
    },
}

export default initconfig
