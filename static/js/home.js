

function createPrevButton(audioIndex) {
    let trangle = document.createElement('div');
    let prevButton = document.createElement('button');
    trangle.classList.add("prevButtonTriangle");
    prevButton.append(trangle);
    prevButton.onclick = function () {
        let audio = document.querySelector(".BGMAudio");
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
        let audio = document.querySelector(".BGMAudio");
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

    let prevButtonLi = document.createElement('li');
    let nextButtonLi = document.createElement('li');

    let audioIndex = 0;

    audioIndex = audioPlayerInit(audioIndex, ".BGMAudio");
    prevButtonLi.append(createPrevButton(audioIndex));
    nextButtonLi.append(createNextButton(audioIndex));

    prevButtonLi.classList.add("audioControls");
    nextButtonLi.classList.add("audioControls");
    const audioLi = document.querySelector("#BGMAudio");

    audioLi.insertAdjacentElement('afterend', prevButtonLi);
    audioLi.insertAdjacentElement('beforebegin', nextButtonLi);
}