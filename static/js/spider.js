function logoutButtonClick() {
    logout();
}

window.onload = () => {
    // 背景图片生成
    backgroundImageChange();

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

    fetch("/bangumi", {
        method: "POST",
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
            request_class: "spider"
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data = data.response;

            if (data != "null") {
                const bangumiList = document.getElementById('bangumi-list');
                for (const [index, d] of data.entries()) {
                    var div = document.createElement('div');
                    div.className = 'bangumi-item';

                    // 创建番剧编号
                    var number = document.createElement('span');
                    number.className = 'bangumi-number';
                    number.textContent = (index + 1) + '.';
                    div.appendChild(number);

                    // 创建番剧链接
                    var a = document.createElement('a');
                    a.textContent = d.title;
                    a.href = d.url;
                    a.className = 'bangumi-link';
                    a.target = "_blank";
                    div.appendChild(a);

                    // 添加缩略图
                    var image = document.createElement("img");
                    image.src = d.cover;
                    image.className = "bangumi-image";
                    image.alt = 'img';
                    div.appendChild(image);

                    bangumiList.appendChild(div);

                    // 添加 .show 类以触发渐入效果
                    bangumiList.classList.add('show');

                }
            }
            else {
                alert("数据错误，请检查请求Cookies是否正确!");
                window.href = '/';
            }

        })
        .catch(error => console.log(error));
}