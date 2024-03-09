function loginButtonClick() {
    // TODO
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

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
        .then(response => {
            // 登录成功，根据 HTTP 状态码进行相应的处理
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // 响应为 JSON 格式，解析为 JSON
                return response.json();
            } else {
                // 不是 JSON 格式的响应
                alert("登录成功");
                window.location.assign('/');
            }
        })
        .then(data => {
            if (typeof data === 'object') {
                if (data['msg'] === 1) { alert("用户名或密码错误"); }
                else if (data['msg'] === 2) { alert("用户不存在"); }
                else { alert("网页错误"); }
            } else {

            }
        })
        .catch(error => {
            alert("未知错误");
        })
}

function cancelButtonClick() {
    // TODO
    window.location.assign("/");
}

window.onload = () => {
    backgroundImageChange();
    var loginButton = document.getElementById('loginButton');
    var cancelButton = document.getElementById('cancelButton');
    var registerPageButton = document.getElementById('registerPageButton');

    loginButton.onclick = loginButtonClick;
    cancelButton.onclick = cancelButtonClick;
    registerPageButton.onclick = registerPageButtonClick;
}