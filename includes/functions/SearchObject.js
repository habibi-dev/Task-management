export const SearchObject = async (objects, search, parent = true) => {

    let results = {};

    if (search !== '')
        await Object.keys(objects).map(Key => {
            if (objects[Key]['title'].indexOf(search) !== -1 || objects[Key]['keywords'].indexOf(search) !== -1) {
                results[Key.toString()] = objects[Key]['title'];
                if (parent)
                    results[objects[Key]['parent_id'].toString()] = objects[Key]['title']
            }
        });

    if (search.length && !Object.keys(results).length)
        results = {d: 5};

    return results;
};
