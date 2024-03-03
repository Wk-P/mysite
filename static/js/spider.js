window.onload = () => {
    backgroundImageChange();
    fetch("/bangumi", {
        method: "POST",
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
    })
        .then(response => response.json())
        .then(data => {

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
