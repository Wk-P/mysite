function registerButtonClick() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password1 = document.getElementById('password1').value;

    if (username == null || username == "" || password == null || password == "") {
        alert("用户名或密码不能为空");
        return false;
    }

    if (password !== password1) {
        alert("两次密码输入不一致");
        return false;
    }

    fetch('/register', {
        method: "POST",
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data['success'] === true) {
                var alertDiv = document.getElementById("alert");
                alertDiv.style.display = "block";
                setTimeout(function () {
                    alertDiv.style.display = "none";
                }, 3000);
                window.location.href = "./usercenter";
            }
            else {
                if (data['msg'] === 1) { alert("注册失败，用户已存在"); }
                else { alert("未知错误"); }
            }
        })
        .catch(error => {
            alert("未知错误");
        })
}

function loginButtonClick() {
    window.location.assign("/login");
}

function cancelButtonClick() {
    window.location.assign("/");
}


window.onload = () => {
    backgroundImageChange();
    var registerButton = document.getElementById('registerButton');
    var cancelButton = document.getElementById('cancelButton');
    var loginButton = document.getElementById('loginButton');

    registerButton.onclick = registerButtonClick;
    cancelButton.onclick = cancelButtonClick;
    loginButton.onclick = loginButtonClick;
}