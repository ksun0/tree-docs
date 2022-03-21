/*
 * getDocuments
 * Outputs all documents stored in database (will maybe add authentication later)
 * TODO: Implement document 
 */
function getDocuments() {
    let test1 = {
        id: 1,
        name: "Test 1",
        author: "John Doe",
        date: "September 30, 2021",
    };
    let test2 = {
        id: 2,
        name: "Test 2",
        author: "Sara Ma",
        date: "September 30, 2021",
    };
    let test3 = {
        id: 3,
        name: "Test 3",
        author: "Allison Smith",
        date: "September 30, 2021",
    };
    return [test1, test2, test3];
}

/*
 * getSummary
 * Gets a summary of the document (e.g. who created it, when last modified) just any relevant metadata we have
 * TODO: Implement getting the summary of a document based on did (this is to be displayed as you hover over a node in the tree display)
 */

function getSummary(did) {

}

/*
 * getTree
 * Gets all relevant documents related to the document id 
 * (Maybe should change the schema to have a field called root_did that keeps track of the original doc.
 * This would make it easier to get all the docs).
 * TODO: Implement document collection based on the root_did and return all docs with the specified did and have it
 * return a list in the form [{   child_did: 2,
                                  parent_did: 1,
                                  author_name: "Bob"
                              }]
        See below for examples
 */

function getTree(root_did) {
    // Need to join Hierarchy, Documents, + Users
    let data = [
        {   child_did: 2,
            parent_did: 1,
            author_name: "Bob"
        },
        {   child_did: 3,
            parent_did: 1,
            author_name: "Maria"
        },
        {   child_did: 4,
            parent_did: 2,
            author_name: "Clarisse"
        },
        {   child_did: 5,
            parent_did: 4,
            author_name: "Tom"
        },
        {   child_did: 6,
            parent_did: 1,
            author_name: "Larry"
        },
        {   child_did: 7,
            parent_did: 1,
            author_name: "David"
        },
        {   child_did: 8,
            parent_did: 2,
            author_name: "Anya"
        },
    ];

    let graphRep = data.reduce((graph, record) => {
        if (!graph[record.child_did]) {
            graph[record.child_did] = {children: [], indegree: 0};
        }
        if (!graph[record.parent_did]) {
            graph[record.parent_did] = {children: [], indegree: 0};
        }
        graph[record.child_did]["author_name"] = record.author_name;
        graph[record.child_did].indegree ++ ;
        graph[record.parent_did].children.push(record.child_did);
        return graph;
    }, {});

    let root = 0;
    for (const [key, value] of Object.entries(graphRep)) {
       if (value.indegree === 0) {
           root = key;
           break;
       }
    }

    console.log(root);
    console.log(graphRep);

    let ret = collapseGraph(root, graphRep);
    ret.name = "root";

    console.log(ret);

    return ret;

}

function collapseGraph(root, graph) {
    if (graph[root].children.length < 1) {
        return { value: root, 
                 name: graph[root].author_name };
    }

    let children = [];
    for (let i = 0; i < graph[root].children.length; i ++) {
        children.push(collapseGraph(graph[root].children[i], graph));
    }
    return { value: root, 
             name: graph[root].author_name,
             children: children };
}

export {getDocuments, getTree};