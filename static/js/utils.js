function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function logout() {
    fetch('/usercenter', {
        method: "POST",
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
            request_class: "logout",
        })
    })  
        .then(response => {
            
            // 登录成功，根据 HTTP 状态码进行相应的处理
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }
            else {
                alert("用户已退出");
                window.location.assign("/");
            }
        })
        .then(data => {
            if (data['msg'] === 1) {
                alert("后端错误");
            } else if (data['msg'] === 2) {
                alert("用户未登录");
            }
        })
        .catch(error => console.log(error));
}

function logoutButtonClick() {
    logout();
}

function loginPageButtonClick() {
    window.location.assign("/login");
}

function deletePageButtonClick() {
    window.location.assign("/delete");
}

function registerPageButtonClick() {
    window.location.assign("/register");
}

function homePageButtonClick() {
    window.location.assign("/");
}

function bangumiPageButtonClick() {
    window.location.assign("/bangumi");
}

function backgroundImageChange() {
    // 定义背景图片列表
    const images = [
        '七周年.jpg', '七夕.jpg', '三周年.jpg',
        '不灭星锚.jpg', '不灭星锚2.jpg', '云墨丹心.jpg', '五周年.jpg', '公主与骑士.jpg',
        '六周年.jpg', '千年之羽.jpg', '卡萝尔.jpg', '原神客串.jpg', '原罪猎人.jpg',
        '双子.jpg', '后崩坏书.jpg', '四周年.jpg', '圣夜幻想.jpg', '圣芙蕾雅学园.jpg', '夜隐重霞.jpg',
        '大鸭鸭.jpg', '天使重构.jpg', '天元骑英.jpg', '天命之战.jpg', '天父启动.jpg',
        '始源之律者.jpg', '小识.jpg', '幻海童谣.jpg', '幽兰戴尔.jpg', '彼岸双生.jpg',
        '律者御三家.jpg', '德丽莎·出击.jpg', '德莉莎诸葛.jpg', '快雪迎春.jpg', '断罪.jpg', '新春.jpg', '春节.jpg', '暗蔷薇.jpg', '暮光裁决.jpg',
        '月下初拥.jpg', '月下誓约.jpg', '月影逐龙.jpg', '李素裳.jpg', '极地战刃.jpg',
        '格蕾修.jpg', '格蕾修绘星.jpg', '梅比乌斯.jpg', '樱桃核心.jpg', '樱色轮回.jpg', '死生之律者.jpg',
        '永寂之赫勒尔.jpg', '爱莉.jpg', '爱莉希娅.jpg', '爱酱.jpg', '猎袭装·影铁.jpg', '真理之律者.jpg',
        '真红之剑.jpg', '砂糖.jpg', '空之律者.jpg', '第二部.jpg', '第四律者觉醒.jpg', '绯樱.jpg', '维尔薇.jpg',
        '羽兔.jpg', '背叛的银狼.jpg', '苍骑士·月魂.jpg', '苏莎娜.jpg', '英桀.jpg', '薪炎.jpg', '薪炎之律者.jpg', '西琳.jpg',
        '识宝.jpg', '赤染御魂.jpg', '赤鸢.jpg', '辉骑士·月魄.jpg', '逐梦双星.jpg', '逐火十三英桀.jpg',
        '银狼.jpg', '银狼的献身.jpg', '银狼觉醒.jpg', '阿波尼亚.jpg', '雷律.jpg', '首页.jpg', '黑希.jpg'
    ]

    let currentIndex = Math.floor(Math.random() * images.length); // 当前背景图片索引

    function loadNextImage() {
        const img = new Image();
        img.src = `../static/img/${images[currentIndex]}`;
        img.onload = function () {
            // 图片加载完成后应用新的背景图片
            document.body.style.backgroundImage = `url("${img.src}")`;
            // 更新索引以加载下一张图片
            currentIndex = Math.floor(Math.random() * images.length);
            // 间隔5秒后加载下一张图片
            setTimeout(loadNextImage, 5000);
        };
    }

    // 初始加载第一张图片
    loadNextImage();
}