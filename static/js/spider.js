// 定义背景图片列表
const images = [
    "阿波尼亚.jpg",
    "爱酱.jpg",
    "爱莉.jpg",
    "赤鸢.jpg",
    "不灭星锚.jpg",
    "六周年.jpg",
    "第二部.jpg",
    "李素裳.jpg",
    "三周年.jpg",
    "七周年.jpg"
];

let currentIndex = 5; // 当前背景图片索引

setInterval(() => {
    url = `../static/img/${images[currentIndex]}`
    document.body.style.backgroundImage = `url("${url}")`;
    currentIndex = Math.floor(Math.random() * images.length); // 循环切换图片
}, 3000); // 每隔3秒切换一次背景图片

window.onload = () => {
    fetch("/bangumi", {
        method: "POST",
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
    })
        .then(response => response.json())
        .then(data => {
            data = data.response;
            console.log(data);
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
                div.appendChild(a);

                bangumiList.appendChild(div);

                // 添加 .show 类以触发渐入效果
                bangumiList.classList.add('show');

            }

        })
        .catch(error => console.log(error));
}
