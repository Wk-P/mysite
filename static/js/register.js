function registerButtonClick() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const password1 = document.getElementById('passwordInput1').value;

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
            if (data.success === true) {
                alert("注册成功");
                window.location.href = "./usercenter";
            }
            else {
                if (data['msg'] === 1) { alert("注册失败，用户已存在"); }
                else { alert("注册失败，未知错误"); }
            }
        })
        .catch(error => {
            alert("未知错误");
        })
}

function cancelButtonClick() {
    window.location.assign("/");
}


window.onload = () => {
    backgroundImageChange();
    // header nav buttons
    var registerPageButton = document.getElementById('registerPageButton');
    var logoutButton = document.getElementById('logoutButton');
    var deletePageButton = document.getElementById(`deletePageButton`);
    var homePageButton = document.getElementById("homePageButton");
    var bangumiPageButton = document.getElementById("bangumiPageButton");

    registerPageButton.onclick = registerPageButtonClick;
    logoutButton.onclick = logoutButtonClick;
    deletePageButton.onclick = deletePageButtonClick;
    homePageButton.onclick = homePageButtonClick;
    bangumiPageButton.onclick = bangumiPageButtonClick;


    // form buttons
    var registerButton = document.getElementById('registerButton');
    var cancelButton = document.getElementById('cancelButton');
    var loginPageButton = document.getElementById('loginPageButton');

    registerButton.onclick = registerButtonClick;
    cancelButton.onclick = cancelButtonClick;
    loginPageButton.onclick = loginPageButtonClick;


}