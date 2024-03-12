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

function timeClock() {
    let li = document.createElement('li');
    li.id = "clock";
    li.classList.add("clock");
    let audio = document.getElementById("BGMAudio");
    audio.insertAdjacentElement('afterend', li);
    setInterval(() => {
        let clockLi = document.getElementById("clock");
        let date = new Date();
        date_string = String(date.getFullYear()).padStart(2, '0') + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
        time_string = String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
        clockLi.textContent = `${date_string}      ${time_string}`;
    }, 1000);
}

const nameList = [
    "227 - 曇り空の向こうは晴れている (1).mp3",
    "227 - 曇り空の向こうは晴れている.mp3",
    "227 - 覚醒.mp3",
    "3年E組うた担 - 旅立ちのうた.mp3",
    "Adriana Vitale - Someone You Loved.mp3",
    "Agnes Obel - Riverside.mp3",
    "Aimer - 春はゆく.mp3",
    "AJR - Yes I'm A Mess.mp3",
    "AKB48 - 桜の栞.mp3",
    "Alison Krauss - When You Say Nothing At All.mp3",
    "Ana Alcaide - Tishri.mp3",
    "Anna - 枝垂桜.mp3",
    "B.B.クイーンズ - オープニング・テーマ~おどるポンポコリン.mp3",
    "BAAD - ENDLESS CHAIN.mp3",
    "Bandari - Annie's Wonderland.mp3",
    "BEGIN - 三線の花.mp3",
    "Benj Heard - Having a Good Day.mp3",
    "Blackmore's Night - Under A Violet Moon.mp3",
    "Boney M. - Rivers Of Babylon.mp3",
    "BwO - Sunshine in the Rain.mp3",
    "Captain and Liesl - Edelweiss.mp3",
    "ChouCho - 優しさの理由.mp3",
    "Christina Lindberg - Country Road.mp3",
    "Clannad - Down By The Sally Gardens (Live).mp3",
    "ClariS - 桜咲く.mp3",
    "coctaiL - ソラゴト.mp3",
    "Colbie Caillat - Auld Lang Syne.mp3",
    "Crooked Still - Florence.mp3",
    "Dan Fogelberg - Sutter's Mill.mp3",
    "Dana Winner - Moonlight Shadow.mp3",
    "Daniel Powter - Free Loop.mp3",
    "David Arthur Brown - Magura.mp3",
    "Do As Infinity - 楽園.mp3",
    "Do As Infinity - 深い森.mp3",
    "Dream Tunes - Every Time We Touch.mp3",
    "Duca - ISI.mp3",
    "Ekaterina Shelehova - Savage Daughter.mp3",
    "ENE - パズル.mp3",
    "eufonius - 比翼の羽根.mp3",
    "Evan Call - Across the Violet Sky.mp3",
    "Evan Call - To The Ends of Our World.mp3",
    "Every Little Thing - きみのて.mp3",
    "Faun - Federkleid.mp3",
    "Faun - Sonnenreigen (Lughnasad).mp3",
    "Fayray - Baby if.mp3",
    "ff - Gravity.mp3",
    "Fool's Garden - Lemon Tree.mp3",
    "fripSide - late in autumn.mp3",
    "fripSide - Only My Railgun.mp3",
    "Galen Crew - Messenger.mp3",
    "Galen Crew - Sleepyhead.mp3",
    "Goose house - ハルノヒ ー合唱ー.mp3",
    "Goose house - 光るなら.mp3",
    "Groove Coverage - She.mp3",
    "Haguki - in the rain-Acoustic ver.-.mp3",
    "HAPPY BIRTHDAY - 君だったら.mp3",
    "HoneyWorks,早見沙織 - 可愛くてごめん.mp3",
    "HOYO-MiX - Da Capo.mp3",
    "Irrlichter - Roter Mond.mp3",
    "John Mellencamp - The End Of The World.mp3",
    "Lenka - The Show.mp3",
    "LONELYONE - 莱顿，无战事（双笛琴重奏Edit.）.mp3",
    "Macka B - So Many Things.mp3",
    "MACO - 朝もお昼も夢の中も.mp3",
    "Malcolm Arnold - The River Kwai MarchColonel Bogey March.mp3",
    "mammy Sino - 里の秋.mp3",
    "MANISH - 煌めく瞬間に捕われて.mp3",
    "Maria Dimitriadi,Afroditi Manou - Mavra Korakia (Chorus).mp3",
    "Michael Cramtu,Bandari - Big Big World.mp3",
    "Michael Martin Murphey - Red River Valley.mp3",
    "Michelle Michina - Violet Snow (France Ver.).mp3",
    "Milkychan - Blühende Nacht (2014 Rework).mp3",
    "mink - if.mp3",
    "Minnutes - Ican.mp3",
    "Minnutes - Pack up Your Troubles in Your Old Kit Bag.mp3",
    "Monica Rizzio - Delta Dawn.mp3",
    "moumoon - Sunshine Girl ～English Ver.～.mp3",
    "Ms.OOJA - 恋におちて -Fall in love-.mp3",
    "Mutual Benefit - Rainbow River.mp3",
    "Nathan Evans - Wellerman.mp3",
    "Of Monsters And Men - Your Bones.mp3",
    "Old Horned Sheep - Seam Ryan's Polka.mp3",
    "Oturans - 【钢琴】みちしるべ -《紫罗兰永恒花园》片尾曲.mp3",
    "Oturans - 茅原実里-みちしるべ-《紫罗兰永恒花园》片尾曲（Oturans Remix）.mp3",
    "Pajaro Sunrise - Romeo's Tune.mp3",
    "Passenger - New Until It's Old.mp3",
    "Pete Seeger - Jarama Valley.mp3",
    "Pete Seeger - Solidarity Forever.mp3",
    "Pete Seeger - What Did You Learn In School Today.mp3",
    "Pete Seeger - Which Side are You On.mp3",
    "Peter Jeremias - Dusk.mp3",
    "Pomplamoose - Les Champs-Elysées.mp3",
    "Princess Chelsea - Cigarette Duet.mp3",
    "Priscilla Ahn - Country Roads (Acoustic Version).mp3",
    "Priscilla Ahn - Deep Inside My Heart.mp3",
    "ReoNa - unknown.mp3",
    "Rhodanthe - さくらいろチェリッシュ.mp3",
    "RIKKI - 素敌だね.mp3",
    "Rose Wong,Max Lu - STAY 驛動的心.mp3",
    "Santiano - Drums and Guns - Johnny I hardly knew Ya.mp3",
    "Selina华 - 川流入海.mp3",
    "Seth Staton Watkins - I Wanna Be In The Cavalry.mp3",
    "Seth Staton Watkins - The Idiot.mp3",
    "Seth Staton Watkins,Cullen Vance - The Ramblin' Rover.mp3",
    "Sofia Jannok - Liekkas (Warm).mp3",
    "Sofia Kallgren - Smells of roses(把悲伤留给自己).mp3",
    "supercell - 約束をしよう.mp3",
    "The Journeymen - Five hundred miles.mp3",
    "THE ROLLING GIRLS - 青空.mp3",
    "The Tokens - The Lion Sleeps Tonight (Wimoweh).mp3",
    "The Weepies,Deb Talan,Steve Tannen - Gotta Have You.mp3",
    "The Wellermen - Wellerman.mp3",
    "TheFatRat,RIELL - Hiding in the Blue.mp3",
    "Tom Paxton - The Last Thing on My Mind.mp3",
    "TRUE - Sincerely (1).mp3",
    "TRUE - Sincerely.mp3",
    "TRUE - WILL.mp3",
    "TRUE - 未来のひとへ.mp3",
    "TSUKINOSORA - Luv Letter.mp3",
    "Udo Jürgens - Ich War Noch Niemals in New York.mp3",
    "Uru - それを愛と呼ぶなら (1).mp3",
    "Uru - それを愛と呼ぶなら.mp3",
    "Uru - ファーストラヴ.mp3",
    "V.A. - Letter Song10年後の私へ (合唱版).mp3",
    "V.A. - ほころび.mp3",
    "V.A. - 旅立ちの歌.mp3",
    "V.A. - 風見学園校歌.mp3",
    "Wake Up, Girls! - 言の葉 青葉.mp3",
    "Walk off the Earth - My Stupid Heart.mp3",
    "Walk off the Earth,Luminati Suns - My Stupid Heart (Acoustic Version).mp3",
    "WANDS - 世界が終るまでは.mp3",
    "Windborne - Song of the Lower Classes.mp3",
    "Wolfenmond - Meienzit ane nit.mp3",
    "Wynners - 455(part of game).mp3",
    "Yael Naim - New Soul.mp3",
    "Yanni - Nightingale.mp3",
    "Yanni - With an Orchid.mp3",
    "YOASOBI - 群青.mp3",
    "ZARD - 少女の頃に戻ったみたいに.mp3",
    "ZARD - 運命のルーレット 廻して.mp3",
    "ZONE - secret base 〜君がくれたもの〜.mp3",
    "あいみょん - マリーゴールド.mp3",
    "あたらよ - また夏を追う.mp3",
    "いきものがかり - SAKURA.mp3",
    "こはならむ - リセットボタン.mp3",
    "さくら学院 - 旅立ちの日に.mp3",
    "つじあやの - 風になる.mp3",
    "のみこ - Bad Apple!! feat. nomico.mp3",
    "のみこ - Bad Apple!!.mp3",
    "ふきのとう - 思い出通り雨.mp3",
    "みずさわゆうき - THROUGH THE YEARS AND FAR AWAY.mp3",
    "みんな - 浜咲学園校歌斉唱.mp3",
    "みんな - 澄空学園校歌斉唱.mp3",
    "アフィリア・サーガ - 糸 (ver.アフィリア・サーガ).mp3",
    "アンジェラ・アキ - 手紙 ~拝啓 十五の君へ~.mp3",
    "アンジェラ・アキ - 手紙 〜拝啓　十五の君へ〜-strings version-.mp3",
    "オムニバス - もう恋なんてしない.mp3",
    "クリス・ハート - ラブ・ストーリーは突然に.mp3",
    "ゴンチチ - 28.mp3",
    "ゴンチチ - 放課後の音楽室.mp3",
    "ゴンチチ - 朝.mp3",
    "スノープリンス合唱団 - スノープリンス.mp3",
    "スピッツ - 空も飛べるはず.mp3",
    "ハンバート ハンバート - おうちに帰りたい.mp3",
    "ハンバート ハンバート - 今晩はお月さん.mp3",
    "ヒャダイン - ヒャダインのカカカタ☆カタオモイ-C.mp3",
    "フランシュシュ - 光へ.mp3",
    "ヘクとパスカル - ぼくら.mp3",
    "ボイジャー,千紗,根岸拓哉 - 私立 降星小学校校歌.mp3",
    "ヨルシカ - 老人と海.mp3",
    "ロクデナシ - ただ声一つ (1).mp3",
    "ロクデナシ - ただ声一つ.mp3",
    "ロクデナシ - 知らないままで.mp3",
    "ヰ世界情緒 - シリウスの心臓.mp3",
    "ヲタみん - Letter Song.mp3",
    "三浦サリー - 桜咲く(with 郡山市立大島小学校 合唱部).mp3",
    "三浦透子,RADWIMPS - グランドエスケープ (Movie edit).mp3",
    "三輪学 - 厳しい表情の少女.mp3",
    "上坂すみれ - 夢の翼.mp3",
    "上海彩虹室内合唱团 - 世界上唯一的花世界に一つだけの花.mp3",
    "中島みゆき - ひとり上手.mp3",
    "中島みゆき - 島より.mp3",
    "中村千尋 - カサネテク.mp3",
    "中西保志 - ラヴ・イズ・オーヴァー.mp3",
    "久石譲 - 合唱 君をのせて.mp3",
    "井上あずみ - まいご.mp3",
    "亜咲花 - Sun Is Coming Up.mp3",
    "今野宏美 - はかせのサメといぬ.mp3",
    "伶 - 散る散る満ちる.mp3",
    "佐々木恵梨 - ミモザ (Movie Edit).mp3",
    "佐々木恵梨 - ミモザ.mp3",
    "佐咲紗花 - Zzz (Acappella Version).mp3",
    "佐咲紗花 - Zzz (Bossa Nova Version).mp3",
    "余雨 - 再见深海（微亮的瞬间）.mp3",
    "倍賞千恵子 - —エンディング—世界の約束～人生のメリーゴーランド.mp3",
    "八木海莉 - 刺激による彼ら.mp3",
    "冯曦妤 - A Little Love.mp3",
    "冯曦妤 - 再见---警察.mp3",
    "凰華女学院声楽隊 - 凰華女学院 学院歌『遥かに仰ぎ、麗しの』斉唱.mp3",
    "刘海俊 - 나에게 그대만이 (New Ver.).mp3",
    "初音ミク,東京フィルハーモニー交響楽団 - 桜ノ雨 (アンコール).mp3",
    "前田愛 - keep on.mp3",
    "千葉紗子,中原麻衣 - 私立風華学園校歌～水晶の守り～.mp3",
    "原由子 - 花咲く旅路 (原由子1991.6.1 アルバム“MOTHER”より).mp3",
    "可憐な合唱団 - アニーローリー.mp3",
    "可憐な合唱団 - 気球にのってどこまでも.mp3",
    "司南 - 春三月.mp3",
    "合唱団わをん - Dreamer.mp3",
    "合唱団わをん - ハナノイロ.mp3",
    "合唱団わをん - 影踏み.mp3",
    "合唱団わをん - 潮風のハーモニー.mp3",
    "吉森信 - ふるさとの匂い.mp3",
    "吴金黛 - 森林狂想曲.mp3",
    "吴青峰 - 歌颂者.mp3",
    "周传雄 - 青花.mp3",
    "和田薫 - 時代を超える想い1.mp3",
    "和田薫 - 時代を超える想い2.mp3",
    "坂本真綾 - 菫.mp3",
    "坂本龍一 - Merry Christmas Mr. Lawrence.mp3",
    "夏川りみ - 会いたい(想你).mp3",
    "夏川りみ - 愛よ愛よ（かなよかなよ）.mp3",
    "夏川りみ - 涙（なだ）そうそう.mp3",
    "大原櫻子 - #やっぱもっと.mp3",
    "大塚愛 - プラネタリウム.mp3",
    "大杉久美子 - ドラえもんのうた.mp3",
    "大藤史 - 季节を抱きしめて.mp3",
    "大谷育江 - ピカチュウのうた.mp3",
    "大貫妙子,坂本龍一 - 赤とんぼ（Aka Tombo）.mp3",
    "大野克夫 - キミがいれば(十字路ヴァージョン).mp3",
    "大黒摩季 - あなただけ見つめてる.mp3",
    "学園生活部 - 仰げば尊し.mp3",
    "家入レオ - ずっと、ふたりで.mp3",
    "小岩井ことり,村川梨衣,佐倉綾音 - 旭丘分校校歌.mp3",
    "小林幸子 - 幸せ.mp3",
    "山口百恵 - ありがとうあなた.mp3",
    "山口百恵 - 伊豆の踊子.mp3",
    "山口百恵 - 再见的另一方.mp3",
    "山口龍夫 - あめのみつかいの 合唱団 ver.mp3",
    "山崎あおい - 東京.mp3",
    "岩男潤子,友枝小学校コーラス部 - くれゆくひととせ.mp3",
    "岩男潤子,友枝小学校コーラス部 - 夜の歌(クリスマス・ヴァージョン).mp3",
    "島谷ひとみ - 亜麻色の髪の乙女.mp3",
    "島谷ひとみ - 長い間.mp3",
    "川嶋あい - それが大事.mp3",
    "川嶋あい - とびら (合唱Ver.).mp3",
    "川嶋あい - ガラスの中の私.mp3",
    "川嶋あい - スーツケース.mp3",
    "川嶋あい - 時雨.mp3",
    "川嶋あい - 雪に咲く花.mp3",
    "市川淳 - Old Memory.mp3",
    "市川淳 - ヨスガノソラ メインテーマ -記憶-.mp3",
    "市川淳 - ヨスガノソラ メインテーマ -願い-.mp3",
    "愛殺寶貝 - ふたりのきもちのほんとのひみつ.mp3",
    "戴佩妮 - 怎样.mp3",
    "手嶌葵 - さよならの夏～コクリコ坂から～（Live at Katsushika Symphony Hills Mozart Hall on May 28th, 2016）.mp3",
    "手嶌葵 - テルーの呗 (歌集バージョン).mp3",
    "手嶌葵 - テルーの唄.mp3",
    "手嶌葵 - 挿入歌「テルーの唄」 映画バージョン (アカペラ).mp3",
    "手嶌葵 - 瑠璃色の地球（「未来への航海」バージョン）.mp3",
    "斉藤和義 - 空に星が綺麗.mp3",
    "日向坂46 - 僕なんか.mp3",
    "有里知花 - I Cry.mp3",
    "有里知花 - I need to be in love (青春の辉き).mp3",
    "未来古代楽団,安次嶺希和子 - 忘れじの言の葉 (feat. 安次嶺希和子) [2022].mp3",
    "本名陽子 - カントリー・ロード.mp3",
    "本多RuRu - 美丽心情.mp3",
    "杉並児童合唱団 - 桜の空.mp3",
    "李勤舍 - 穿越时空的思念（钢琴）.mp3",
    "東山奈央 - 初恋 (TVアニメ「月がきれい」EDIT ver.).mp3",
    "松谷卓 - COSMOS 国分寺第三中学校合唱部による女声二部合唱.mp3",
    "松谷卓 - マイバラード 中五島中学合唱部による女声二部合唱.mp3",
    "林原めぐみ - 今日の日はさようなら.mp3",
    "林有三 - 今日の日はさようなら.mp3",
    "林有三 - 水明芸術大学附属高等学校 校歌.mp3",
    "柴田淳 - 秋桜.mp3",
    "桜高3-2 - 桜が丘女子高等学校校歌.mp3",
    "森 恵 - 涙そうそう.mp3",
    "武部聡志 - 紺色のうねりが.mp3",
    "水樹奈々 - 紺碧のアル・フィーネ ～水樹カヤ ver.～.mp3",
    "水瀬いのり - 風色Letter.mp3",
    "浜崎あゆみ - Secret.mp3",
    "清予SeiYo - 命に嫌われている.mp3",
    "清浦夏実 - 花火.mp3",
    "灰夜基 - 唄の島.mp3",
    "熊木杏里 - 春隣.mp3",
    "熊木杏里 - 風の記憶.mp3",
    "熊谷育美 - 海.mp3",
    "牧野由依 - アムリタ－弾き語り－.mp3",
    "玉置浩二 - 初恋.mp3",
    "田中理恵 - 水の証.mp3",
    "當山みれい - 君のとなり.mp3",
    "癒月 - you (Vocal).mp3",
    "白浜坂高校合唱部 - いつまでも辉きを.mp3",
    "白浜坂高校声楽部 - goin' my way !!(合唱版).mp3",
    "白浜坂高校声楽部 - リフレクティア(合唱版).mp3",
    "白浜坂高校生徒一同 - 白浜坂高校校歌.mp3",
    "白石稔,古谷静佳,今野宏美 - 旅立ちの日に.mp3",
    "白石稔,古谷静佳,今野宏美 - 気球にのってどこまでも.mp3",
    "石川由依 - 言葉の向こう.mp3",
    "磯村由紀子 - 風の住む街.mp3",
    "秦基博 - Rain.mp3",
    "程响 - 是否.mp3",
    "窪田ミナ - 潮待ちの岛へ.mp3",
    "粥粥和小伙 - 东极岛.mp3",
    "純名りさ - 月の庭.mp3",
    "細谷佳正,水瀬いのり,高橋李依 - 心が叫びだす～あなたの名前呼ぶよ.mp3",
    "結城アイラ - Believe in.mp3",
    "羊毛とおはな - Desperado.mp3",
    "羽肿 - Windy Hill.mp3",
    "能登麻美子,豊口めぐみ,清水香里 - 片手だけつないで.mp3",
    "芝麻Mochi - 泣けど喚けど朝がきて.mp3",
    "苏星婕 - 梦里花.mp3",
    "范玮琪 - 蒲公英.mp3",
    "茅原実里 - みちしるべ (1).mp3",
    "茅原実里 - みちしるべ.mp3",
    "茅原実里 - エイミー.mp3",
    "茅原実里 - 憧れは流星のように.mp3",
    "茅野愛衣,戸松遥,早見沙織 - secret base ~君がくれたもの~ (10 years after Ver.).mp3",
    "茶太 - Secret.mp3",
    "茶理理 - Subversive.mp3",
    "茶理理,芝麻Mochi - AMY艾米.mp3",
    "西木康智 - 踊子プリムロゼのテーマ.mp3",
    "贵族乐团 - Stay.mp3",
    "長渕剛 - GOOD-BYE青春.mp3",
    "長渕剛 - 友よ.mp3",
    "長渕剛 - 夏の恋人.mp3",
    "陈致逸,HOYO-MiX - 银白的希望 Fragile Fantasy.mp3",
    "雨宮天,高橋李依,茅野愛衣 - ちいさな冒険者.mp3",
    "雪路yukiji - ソラゴト.mp3",
    "高垣彩陽,早見沙織,瀬戸麻沙美 - 心の旋律.mp3",
    "高橋洋子 - 残酷な天使のテーゼ.mp3",
    "高橋美鈴,西本麻里,石沢晶 - ムーンライト伝説.mp3",
    "鹿先森乐队,保利常熟江南爱乐合唱团 - 我想抵达的你.mp3",
    "麻枝准,やなぎなぎ - 終わりの世界から.mp3",
    "麻衣 - ひまわりの家の輪舞曲.mp3",
]

function audioPlayerInit(audioIndex, selector) {
    var audio = document.querySelector(selector);
    audioIndex = Math.floor(Math.random() * nameList.length);
    audio.src = `../static/audio/${nameList[audioIndex]}`;

    audio.addEventListener('ended', function () {
        var _auido = this;
        _auido.src = `../static/audio/${nameList[audioIndex]}`;
        _auido.play();
    });

    return audioIndex;
}