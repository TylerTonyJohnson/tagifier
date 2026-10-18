export function getMostSpecificTags(tags, definitions) {
    const ancestors = new Set();

    for (const tag of tags) {
        let parent = definitions[tag]?.isA;

        while (parent) {
            ancestors.add(parent);
            parent = definitions[parent]?.isA;
        }
    }

    return [...new Set(tags)].filter((tag) => !ancestors.has(tag));
}