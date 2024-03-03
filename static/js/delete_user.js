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
            if (data['success'] === true) { alert("删除成功"); }
            else {
                if (data['msg'] === 1) { alert("删除失败，用户已不存在"); }
                else if (data['msg'] === 3) { alert('删除失败'); window.location.href = "/"; }
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

window.onload = () => {
    // 定义背景图片列表
    backgroundImageChange();

    let deleteButton = document.getElementById('deleteButton');
    let cancelButton = document.getElementById('cancelButton'); 

    deleteButton.onclick = registerButtonClick;
    cancelButton.onclick = cancelButtonClick;
    
}

