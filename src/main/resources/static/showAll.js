const url = "http://localhost:7070/rest/"
let result = ''
let resultOne = ''

const show = (users) => {
    console.log(users);
    if (users.length > 0) {
        users.forEach(user => {
            result += "<tr>";
            result += "<td>" + user.id + "</td>";
            result += "<td>" + user.username + "</td>";
            result += "<td>" + user.age + "</td>";
            result += "<td>" + user.email + "</td>";
            result += "<td>";
            for (i in user.roles) {
                for (j in user.roles[i].name) {
                    result += user.roles[i].name[j];
                }
                result += " ";
            }
            ;
            result += "</td>";
            result += "<td><a class='btn btn-info btnEdit text-white'>Edit</a></td>";
            result += "<td><a class='btn btn-danger btnDelete text-white'>Delete</a></td></tr>";
        })
        document.getElementById("data").innerHTML = result
    }
}

fetch(url)
    .then(response => response.json())
    .then(data => show(data))
    .catch(error => console.log(error))

const showOne = (one) => {
    resultOne += "<tr>";
    resultOne += "<td>" + one.id + "</td>";
    resultOne += "<td>" + one.username + "</td>";
    resultOne += "<td>" + one.age + "</td>";
    resultOne += "<td>" + one.email + "</td>";
    resultOne += "<td>";
    for (i in one.roles) {
        for (j in one.roles[i].name) {
            resultOne += one.roles[i].name[j];
        }
        resultOne += " ";
    };
    resultOne += "</td></tr>";

    document.getElementById("dataUser").innerHTML = resultOne
}

fetch('api/user/')
    .then(response => response.json())
    .then(data => showOne(data))
    .catch(error => console.log(error))
