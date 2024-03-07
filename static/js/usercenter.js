function logoutButtonClick() {
    fetch('/usercenter', {
        method: "POST",
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
            request_class: "logout",
        })
    }).then(response => response.json())
        .then(data => {
            if (data.success === true) {
                alert("用户已退出");
                window.location.assign("/");
            }
            else {
                alert("未知错误");
            }
        })
        .catch(error => console.log(error));
}

function deleteButtonClick() {
    window.location.assign("/delete");
}

function registerButtonClick() {
    window.location.assign("/register");
}

// 记录页面Id
let tabId;

window.onload = () => {
    tabId = pageAdd();
    // 定义背景图片列表
    backgroundImageChange();
    var registerButton = document.getElementById('registerButton');
    var logoutButton = document.getElementById('logoutButton');
    var deleteButton = document.getElementById(`deleteButton`);
    registerButton.onclick = registerButtonClick;
    logoutButton.onclick = logoutButtonClick;
    deleteButton.onclick = deleteButtonClick;
}

window.addEventListener('unload', function() {
    // 从列表中删除界面
    pageDel(tabId);

    // 若是最后一个界面，则退出用户登录状态
    if (pageList.length < 1) {
        autoLogout();
    }
})