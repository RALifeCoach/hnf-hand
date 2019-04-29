function flatten(items, flattened) {
    return items.reduce((array, item) => {
        if (Array.isArray(item)) {
            flatten(item, array);
        } else {
            array.push(item);
        }
        return array;
    }, flattened || []);
}

console.log(flatten([1, 2, [3],
    [
        [
            [4]
        ]
    ]
]));