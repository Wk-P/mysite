function loginButtonClick() {
    // TODO
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username == null || username == "" || password == null || password == "") {
        alert("用户名或密码不能为空");
        return false;
    }

    fetch('/login', {
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
            if (data['success'] === true) {
                alert("登录成功");
                window.location.href = "/";
            } else {
                if (data['msg'] == 1) { alert("用户名或密码错误"); }
                else if (data['msg'] == 2) { alert("用户不存在"); }
                else { alert("网页错误"); }
            }
        })
        .catch(error => {
            alert("未知错误")
        })

}

function cancelButtonClick() {
    // TODO
    window.location.href = "/";
}


window.onload = () => {
    backgroundImageChange();
    var loginButton = document.getElementById('loginButton');
    var cancelButton = document.getElementById('cancelButton');

    loginButton.onclick = loginButtonClick;
    cancelButton.onclick = cancelButtonClick;
}