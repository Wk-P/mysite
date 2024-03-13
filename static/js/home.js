

function createPrevButton(audioIndex) {
    let trangle = document.createElement('div');
    let prevButton = document.createElement('button');
    trangle.classList.add("prevButtonTriangle");
    prevButton.append(trangle);
    prevButton.onclick = function () {
        let audio = document.querySelector("#player");
        audioIndex = (audioIndex - 1) % nameList.length;
        audio.src = src = `../static/audio/${nameList[audioIndex]}`;
    };
    return prevButton;
}

function createNextButton(audioIndex) {
    let nextButton = document.createElement('button');
    let trangle = document.createElement('div');
    trangle.classList.add("nextButtonTriangle");
    nextButton.append(trangle);
    nextButton.onclick = function () {
        let audio = document.querySelector("#player");
        audioIndex = (audioIndex + 1) % nameList.length;
        audio.src = src = `../static/audio/${nameList[audioIndex]}`;
    };
    return nextButton;
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
    homePageButton.onclick = homePageButtonClick;
    bangumiPageButton.onclick = bangumiPageButtonClick;

    timeClock();

    const player = new Plyr('#player', {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume'],
        autoplay: true,
    });

    let prevButtonLi = document.createElement('li');
    let nextButtonLi = document.createElement('li');

    let audioIndex = 0;

    audioIndex = audioPlayerInit(audioIndex, "#player");
    prevButtonLi.append(createPrevButton(audioIndex));
    nextButtonLi.append(createNextButton(audioIndex));

    prevButtonLi.classList.add("audioControls");
    nextButtonLi.classList.add("audioControls");
    const audioLi = document.querySelector("#BGMAudio");

    audioLi.insertAdjacentElement('afterend', prevButtonLi);
    audioLi.insertAdjacentElement('beforebegin', nextButtonLi);

    // 获取音频元素
    const audio = player.media;

    // 监听拖动事件
    player.on('seeking', event => {
        // 计算进度条位置
        const progress = (audio.currentTime / audio.duration) * 100;
        // 更新 Plyr 进度条
        player.elements.progress.value = progress;
    });

    // 在拖动进度条时更新音频的播放位置
    player.elements.progress.addEventListener('input', event => {
        // 计算新的播放位置
        const seekTime = (event.target.value / 100) * audio.duration;
        // 更新音频的当前时间
        audio.currentTime = seekTime;
    });

}