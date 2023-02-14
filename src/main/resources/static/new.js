window.onload = function () {
    const url = "http://localhost:7070/rest"
    const dbRoles = [{id: 1, name: "ADMIN", authority: "ADMIN"}, {id: 2, name: "USER", authority: "USER"}]
    const formNew = document.getElementById('formnew')
    const name = document.getElementById('username')
    const age = document.getElementById('age')
    const email = document.getElementById('email')
    const password = document.getElementById('password')

    formNew.addEventListener('submit', (e) => {
        e.preventDefault()
        let listRoles = roleArray(document.getElementById('roles'))
        console.log(
            name.value, age.value, email.value, password.value, listRoles
        )
        const csrfToken = document.getElementsByName("_csrf")[0].value
        fetch(url, {
            method: 'POST',
            headers: {
                "X-CSRF-Token": csrfToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name.value,
                age: age.value,
                email: email.value,
                password: password.value,
                roles: listRoles
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
            .then(reloadShowUsers)
        $('.nav-tabs a[href="#userstable"]').tab('show')
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
}