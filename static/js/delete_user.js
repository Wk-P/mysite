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
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data['success'] === true) {
                alert("删除成功");
                window.location.assign('/');
            }
            else {
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
    window.location.href = "/";
}

let tabId;

window.onload = () => {
    tabId = pageAdd();
    // 定义背景图片列表
    backgroundImageChange();
    
    
    let deleteButton = document.getElementById('deleteButton');
    let cancelButton = document.getElementById('cancelButton');

    deleteButton.onclick = registerButtonClick;
    cancelButton.onclick = cancelButtonClick;
}

window.addEventListener('unload', function() {
    // 从列表中删除界面
    pageDel(tabId);

    // 若是最后一个界面，则退出用户登录状态
    if (pageList.length < 1) {
        autoLogout();
        // 必须把pageList设为空
        localStorage.removeItem('pageList');
    }
})