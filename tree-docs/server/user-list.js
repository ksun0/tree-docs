const setEditModal = (uid) => {
    // Get information about the user using uid
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/user/${uid}`, false);
    xhttp.send();

    const user = JSON.parse(xhttp.responseText);

    const {
        full_name
    } = user;

    // Filling information about the user in the form inside the modal
    document.getElementById('uid').value = uid;
    document.getElementById('full_name').value = full_name;

    // Setting up the action url for the user
    document.getElementById('editForm').action = `http://localhost:3000/user/${uid}`;
}

const deleteUser = (uid) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/user/${uid}`, false);
    xhttp.send();

    // Reloading the page
    location.reload();
}

const loadUsers = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/users", false);
    xhttp.send();

    const users = JSON.parse(xhttp.responseText);

    for (let user of users) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">${user.uid}</h6>
                        <h5 class="card-title">${user.full_name}</h5>
                        <div>More Info</div>
                        <hr>

                        <button type="button" class="btn btn-danger" onClick="deleteUser(${user.uid})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editUserModal" onClick="setEditModal(${user.uid})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('users').innerHTML = document.getElementById('users').innerHTML + x;
    }
}

loadUsers();