function createPrevButton() {
    let prevButton = document.createElement('button');
    let divInButton = document.createElement('div');
    divInButton.classList.add("prevTriangle"); 
    prevButton.append(divInButton);
    prevButton.onclick = function () {
        let audio = document.querySelector("#player");
        audioIndex = (audioIndex - 1) % nameList.length;
        audio.src = src = `../static/audio/${nameList[audioIndex]}.mp3`;
        console.log(audioIndex);
        audio.play();
    };
    return prevButton;
}

function createNextButton() {
    let nextButton = document.createElement('button');
    let divInButton = document.createElement('div');
    divInButton.classList.add("nextTriangle"); 
    nextButton.append(divInButton);
    nextButton.onclick = function () {
        let audio = document.querySelector("#player");
        audioIndex = (audioIndex + 1) % nameList.length;
        audio.src = src = `../static/audio/${nameList[audioIndex]}.mp3`;
        console.log(audioIndex);
        audio.play();
    };
    return nextButton;
}

function addSoundTitle() {
    let titleItem = document.createElement('li');
    titleItem.id = "soundTitle";
    titleItem.classList.add("soundTitle");
    return titleItem;
}

function changeSoundTitle(title) {
    let titleItem = document.getElementById("soundTitle");
    titleItem.innerHTML = title;
}

let audioIndex = 0;

window.onload = function () {
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

    let playerInitInfo = audioPlayerInit();

    // 生成player元素（并不添加src)或者添加src
    var player = document.getElementById('player');
    if (!player) {
        player = document.createElement('audio');
        var playerInnerContainer = document.createElement("li");
        playerInnerContainer.id = "BGMAudio";
        playerInnerContainer.append(player);
        document.querySelector("#playerContainer").appendChild(playerInnerContainer);

        player.id = "player";
        player = new Plyr('#player', {
            controls: ['play', 'progress', 'current-time','duration', 'volume', 'timeupdate'],
            autoplay: true,
            volume: 0.5,
        });
    } else {
        player.src = playerInitInfo.src;
        changeSoundTitle(nameList[playerInitInfo.index]);
    }

    let prevButtonLi = document.createElement('li');
    let nextButtonLi = document.createElement('li');

    prevButtonLi.append(createPrevButton(playerInitInfo.index));
    
    
    nextButtonLi.append(createNextButton(playerInitInfo.index));

    prevButtonLi.classList.add("audioControls");
    nextButtonLi.classList.add("audioControls");
    const audioLi = document.querySelector("#BGMAudio");


    // 上一曲
    audioLi.insertAdjacentElement('beforebegin', prevButtonLi);
    // 歌曲标题
    audioLi.insertAdjacentElement('beforebegin', addSoundTitle());
    // 下一曲
    audioLi.insertAdjacentElement('afterend', nextButtonLi);


    // autoNextPlay
    document.getElementById('player').addEventListener('ended', function () {
        let title = nameList[(audioIndex + 1) % nameList.length];
        src = `../static/audio/${nameList[(audioIndex + 1) % nameList.length]}.mp3`;
        var _auido = this;
        _auido.src = src;
        _auido.play();
        changeSoundTitle(title);
    });

    var player = document.getElementById('player');
    player.src = playerInitInfo.src;
}
