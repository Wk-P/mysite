function bangumiButtonClick() {
    window.location.assign("/bangumi");
}

function usercenterButtonClick() {
    window.location.assign("/usercenter");
}

// 记录页面Id
let tabId;

window.onload = () => {
    tabId = pageAdd();
    // 定义背景图片列表
    backgroundImageChange();

    var usercenterButton = document.getElementById('usercenterButton');
    var bangumiButton = document.getElementById('bangumiButton');
    usercenterButton.onclick = usercenterButtonClick;
    bangumiButton.onclick = bangumiButtonClick;
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