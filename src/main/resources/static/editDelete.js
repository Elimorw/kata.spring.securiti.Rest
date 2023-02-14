const dbRoles = [{id: 1, name: "ADMIN", authority: "ADMIN"}, {id: 2, name: "USER", authority: "USER"}]
let idForm = 0
let idFormDEL = 0

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            console.log("btnEditClick")
            handler(e)
        }
    })
}

// EDIT USER
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    $('#editModal').modal("show")
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        document.getElementById('idEdit').value = user.id
        document.getElementById('usernameEdit').value = user.username
        document.getElementById('ageEdit').value = user.age
        document.getElementById('emailEdit').value = user.email
        document.getElementById('passwordEdit').value = ''
        document.getElementById('rolesEdit').innerHTML =
            `<option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>`
        Array.from(document.getElementById('rolesEdit').options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
    }
    document.getElementById('formedit').addEventListener('submit', (e) => {
        e.preventDefault()
        let listRoles = roleArray(document.getElementById('rolesEdit'))
        const csrfToken = document.getElementsByName("_csrf")[0].value
        fetch(url, {
            method: 'PATCH',
            headers: {
                "X-CSRF-Token": csrfToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idForm,
                username: document.getElementById('usernameEdit').value,
                age: document.getElementById('ageEdit').value,
                email: document.getElementById('emailEdit').value,
                password: document.getElementById('passwordEdit').value,
                roles: listRoles
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
            .then(reloadShowUsers)
        $('#editModal').modal("hide")
    })
})


// DELETE USER
on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode
    idFormDEL = row.firstElementChild.innerHTML
    $('#deleteModal').modal("show")
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        document.getElementById('idDelete').value = user.id
        document.getElementById('usernameDelete').value = user.username
        document.getElementById('ageDelete').value = user.age
        document.getElementById('emailDelete').value = user.email
        document.getElementById('rolesDelete').innerHTML =
            `<option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>`
        Array.from(document.getElementById('rolesDelete').options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
    }
    document.getElementById('formdelete').addEventListener('submit', (e) => {
        e.preventDefault()
        const csrfToken = document.getElementsByName("_csrf")[0].value
        fetch(url + idFormDEL, {
            method: 'DELETE',
            headers: {
                "X-CSRF-Token": csrfToken
            },
        })
            .then(data => console.log(data))
            .catch(error => console.log(error))
            .then(reloadShowUsers)
        $('#deleteModal').modal("hide")
    })
})

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: dbRoles[i].id}
            array.push(role)
        }
    }
    return array
}

const reloadShowUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            result = ''
            show(data)
        })
}