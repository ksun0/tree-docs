import axios from "axios";

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

    let documents = [test1, test2, test3];

    // const xhttp = new XMLHttpRequest();

    // xhttp.open("GET", "http://localhost:3000/documents", false);
    // xhttp.send();

    // const documents = JSON.parse(xhttp.responseText);
    return documents;
}

/*
 * getSummary
 * Gets a summary of the document (e.g. who created it, when last modified) just any relevant metadata we have
 * TODO: Implement getting the summary of a document based on did (this is to be displayed as you hover over a node in the tree display)
 */

function getSummary(did) {}

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
        { child_did: 2, parent_did: 1, author_name: "Bob" },
        { child_did: 3, parent_did: 1, author_name: "Maria" },
        { child_did: 4, parent_did: 2, author_name: "Clarisse" },
        { child_did: 5, parent_did: 4, author_name: "Tom" },
        { child_did: 6, parent_did: 1, author_name: "Larry" },
        { child_did: 7, parent_did: 1, author_name: "David" },
        { child_did: 8, parent_did: 2, author_name: "Anya" },
    ];

    // const xhttp = new XMLHttpRequest();

    // xhttp.open("GET", "http://localhost:3000/get_tree/" + root_did, false);
    // xhttp.send();

    // const data = JSON.parse(xhttp.responseText);
    console.log(data);

    let graphRep = data.reduce((graph, record) => {
        if (!graph[record.child_did]) {
            graph[record.child_did] = { children: [], indegree: 0 };
        }
        if (!graph[record.parent_did]) {
            graph[record.parent_did] = { children: [], indegree: 0 };
        }
        graph[record.child_did]["author_name"] = record.author_name;
        graph[record.child_did].indegree++;
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
        return { value: root, name: graph[root].author_name };
    }

    let children = [];
    for (let i = 0; i < graph[root].children.length; i++) {
        children.push(collapseGraph(graph[root].children[i], graph));
    }
    return { value: root, name: graph[root].author_name, children: children };
}

function getDocument(did) {
    var dummy_data = {
        title: "Summit Notes",
        body: `Sed cursus dolor orci, vitae pretium risus porta ut. Quisque lobortis erat scelerisque leo convallis, at bibendum mi tempus. Cras suscipit dui a nisi ornare fermentum vel at massa. Maecenas nec fermentum enim, ut porttitor eros. Cras sed egestas justo, at semper massa. Phasellus finibus sem est, id faucibus ipsum mollis et. Curabitur tempor tellus ante, ac hendrerit nisl malesuada ut. Aliquam nec pulvinar tellus. Vivamus et sagittis turpis. Phasellus vehicula augue convallis, maximus sapien semper, placerat augue. Duis at erat ac ante scelerisque vestibulum quis sed quam. Nulla gravida nulla ligula, eget feugiat massa pharetra dignissim. Aliquam ornare dui id felis placerat, sed cursus felis faucibus.
        Duis vel nibh et felis pulvinar facilisis ut a lectus. Donec sagittis velit sed ex porttitor, id lobortis tellus lacinia. Ut pretium, est id aliquam sollicitudin, mi augue ullamcorper dolor, a ullamcorper mauris sapien hendrerit diam. Nunc pulvinar mattis magna ut dignissim. Mauris non ligula varius, commodo purus sit amet, feugiat elit. Fusce sit amet velit at est pharetra luctus sed non ipsum. Phasellus rutrum quam id ligula porta, tempor condimentum lectus efficitur. Nunc ut pretium lacus. Sed ultrices mollis nisi eu faucibus. Aenean nec mauris at purus mollis laoreet et vel felis. Aliquam ornare sapien a eros tempor luctus.`,
    };

    if (did == 3 || did == "3") {
        dummy_data = {
            title: "Summit Notes",
            body: `Sed cursus dolora orci, vitae risus porta ut. Quisque lobortis erat scelerisque leo convallis, at bibendum mi tempus. Ipsum lorem dolor amet nec sit tu illoc. Maecenas nec fermentum enim, ut porttitor eros. Cras sed egestas justo, at semper massa. Phasellus finibus sem est, id faucibus ipsum mollis et. Curabitur tempor tellus ante, ac hendrerit nisl malesuada ut. Aliquam nec pulvinar tellus. Vivamus et sagittis turpis. Phasellus vehicula augue convallis, maximus sapien semper, placerat augue. Duis at erit ac scelerisque vestibulum quis sed quam. Nulla gravida nulla ligula, eget feugiat massa pharetra est dignissim. Aliquam ornare dui id felis placerat, sed cursus felis faucibus.
            Duis vel nibh et felis pulvinar facilisis ut a lectus. Donec sagittis velit sed ex porttitor, id lobortis tellus lacinia. Ut pretium, est id aliquam sollicitudin, mi augue ullamcorper dolor, a ullamcorper mauris sapien hendrerit diam. Nunc pulvinar mattis magna ut dignissim. Mauris non ligula varius, commodo purus sit amet, feugiat elit. Fusce sit amet velit at est pharetra luctus sed non ipsum. Phasellus rutrum quam id ligula porta, tempor condimentum lectus efficitur. Nunc ut pretium lacus. Sed ultrices mollis nisi eu faucibus. Aenean nec mauris at purus mollis laoreet et vel felis. Aliquam ornare sapien a eros tempor luctus.
            awefwhoi`,
        };
    }

    return dummy_data;
}

async function getDiff(did1, did2) {
    let did1body = getDocument(did1).body;
    let did2body = getDocument(did2).body;

    const promise = axios.post(
        "https://api.diffchecker.com/public/text?output_type=json&email=gsr.coolest@gmail.com",
        {
            output_type: "json",
            email: "gsr.coolest@gmail.com",
            left: did1body,
            right: did2body,
        }
    );

    const promiseData = await promise.then((response) => response.data);

    return promiseData;
}

export { getDocuments, getTree, getDocument, getDiff };
