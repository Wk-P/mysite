function deleteButtonClick() {
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

    fetch('/delete', {
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
            // 删除成功，根据 HTTP 状态码进行相应的处理
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // 响应为 JSON 格式，解析为 JSON
                return response.json();
            } else {
                // 不是 JSON 格式的响应
                alert("删除成功");
                window.location.assign('/');
            }
        })
        .then(data => {
            if (typeof data === "object") {
                if (data['msg'] === 1) { alert("删除失败，用户已不存在"); window.location.assign('/'); }
                else if (data['msg'] === 3) { alert('删除失败'); window.location.assign('/'); }
                else { alert("未知错误"); }
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
    // 定义背景图片列表
    backgroundImageChange();


    var registerPageButton = document.getElementById('registerPageButton');
    var logoutButton = document.getElementById('logoutButton');
    var deletePageButton = document.getElementById(`deletePageButton`);
    var homePageButton = document.getElementById("homePageButton");
    var bangumiPageButton = document.getElementById("bangumiPageButton");

    registerPageButton.onclick = registerPageButtonClick;
    logoutButton.onclick = logoutButtonClick;
    deletePageButton.onclick = deletePageButtonClick;
    bangumiPageButton.onclick = bangumiPageButtonClick;
    homePageButton.onclick = homePageButtonClick;

    var deleteButton = document.getElementById("deleteButton");
    var cancelButton = document.getElementById("cancelButton");
    deleteButton.onclick = deleteButtonClick;
    cancelButton.onclick = cancelButtonClick;

}

window.addEventListener('unload', function () {
    // 从列表中删除界面
    pageDel(tabId);

    // 若是最后一个界面，则退出用户登录状态
    if (pageList.length < 1) {
        autoLogout();
        // 必须把pageList设为空
        localStorage.removeItem('pageList');
    }
})