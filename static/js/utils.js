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
    let audio = document.getElementById("usericon");
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
    "227 - 曇り空の向こうは晴れている (1)",
    "227 - 曇り空の向こうは晴れている",
    "227 - 覚醒",
    "3年E組うた担 - 旅立ちのうた",
    "Adriana Vitale - Someone You Loved",
    "Agnes Obel - Riverside",
    "Aimer - 春はゆく",
    "AJR - Yes I'm A Mess",
    "AKB48 - 桜の栞",
    "Alison Krauss - When You Say Nothing At All",
    "Ana Alcaide - Tishri",
    "Anna - 枝垂桜",
    "B.B.クイーンズ - オープニング・テーマ~おどるポンポコリン",
    "BAAD - ENDLESS CHAIN",
    "Bandari - Annie's Wonderland",
    "BEGIN - 三線の花",
    "Benj Heard - Having a Good Day",
    "Blackmore's Night - Under A Violet Moon",
    "Boney M. - Rivers Of Babylon",
    "BwO - Sunshine in the Rain",
    "Captain and Liesl - Edelweiss",
    "ChouCho - 優しさの理由",
    "Christina Lindberg - Country Road",
    "Clannad - Down By The Sally Gardens (Live)",
    "ClariS - 桜咲く",
    "coctaiL - ソラゴト",
    "Colbie Caillat - Auld Lang Syne",
    "Crooked Still - Florence",
    "Dan Fogelberg - Sutter's Mill",
    "Dana Winner - Moonlight Shadow",
    "Daniel Powter - Free Loop",
    "David Arthur Brown - Magura",
    "Do As Infinity - 楽園",
    "Do As Infinity - 深い森",
    "Dream Tunes - Every Time We Touch",
    "Duca - ISI",
    "Ekaterina Shelehova - Savage Daughter",
    "ENE - パズル",
    "eufonius - 比翼の羽根",
    "Evan Call - Across the Violet Sky",
    "Evan Call - To The Ends of Our World",
    "Every Little Thing - きみのて",
    "Faun - Federkleid",
    "Faun - Sonnenreigen (Lughnasad)",
    "Fayray - Baby if",
    "ff - Gravity",
    "Fool's Garden - Lemon Tree",
    "fripSide - late in autumn",
    "fripSide - Only My Railgun",
    "Galen Crew - Messenger",
    "Galen Crew - Sleepyhead",
    "Goose house - ハルノヒ ー合唱ー",
    "Goose house - 光るなら",
    "Groove Coverage - She",
    "Haguki - in the rain-Acoustic ver.-",
    "HAPPY BIRTHDAY - 君だったら",
    "HoneyWorks,早見沙織 - 可愛くてごめん",
    "HOYO-MiX - Da Capo",
    "Irrlichter - Roter Mond",
    "John Mellencamp - The End Of The World",
    "Lenka - The Show",
    "LONELYONE - 莱顿，无战事（双笛琴重奏Edit.）",
    "Macka B - So Many Things",
    "MACO - 朝もお昼も夢の中も",
    "Malcolm Arnold - The River Kwai MarchColonel Bogey March",
    "mammy Sino - 里の秋",
    "MANISH - 煌めく瞬間に捕われて",
    "Maria Dimitriadi,Afroditi Manou - Mavra Korakia (Chorus)",
    "Michael Cramtu,Bandari - Big Big World",
    "Michael Martin Murphey - Red River Valley",
    "Michelle Michina - Violet Snow (France Ver.)",
    "Milkychan - Blühende Nacht (2014 Rework)",
    "mink - if",
    "Minnutes - Ican",
    "Minnutes - Pack up Your Troubles in Your Old Kit Bag",
    "Monica Rizzio - Delta Dawn",
    "moumoon - Sunshine Girl ～English Ver.～",
    "Ms.OOJA - 恋におちて -Fall in love-",
    "Mutual Benefit - Rainbow River",
    "Nathan Evans - Wellerman",
    "Of Monsters And Men - Your Bones",
    "Old Horned Sheep - Seam Ryan's Polka",
    "Oturans - 【钢琴】みちしるべ -《紫罗兰永恒花园》片尾曲",
    "Oturans - 茅原実里-みちしるべ-《紫罗兰永恒花园》片尾曲（Oturans Remix）",
    "Pajaro Sunrise - Romeo's Tune",
    "Passenger - New Until It's Old",
    "Pete Seeger - Jarama Valley",
    "Pete Seeger - Solidarity Forever",
    "Pete Seeger - What Did You Learn In School Today",
    "Pete Seeger - Which Side are You On",
    "Peter Jeremias - Dusk",
    "Pomplamoose - Les Champs-Elysées",
    "Princess Chelsea - Cigarette Duet",
    "Priscilla Ahn - Country Roads (Acoustic Version)",
    "Priscilla Ahn - Deep Inside My Heart",
    "ReoNa - unknown",
    "Rhodanthe - さくらいろチェリッシュ",
    "RIKKI - 素敌だね",
    "Rose Wong,Max Lu - STAY 驛動的心",
    "Santiano - Drums and Guns - Johnny I hardly knew Ya",
    "Selina华 - 川流入海",
    "Seth Staton Watkins - I Wanna Be In The Cavalry",
    "Seth Staton Watkins - The Idiot",
    "Seth Staton Watkins,Cullen Vance - The Ramblin' Rover",
    "Sofia Jannok - Liekkas (Warm)",
    "Sofia Kallgren - Smells of roses(把悲伤留给自己)",
    "supercell - 約束をしよう",
    "The Journeymen - Five hundred miles",
    "THE ROLLING GIRLS - 青空",
    "The Tokens - The Lion Sleeps Tonight (Wimoweh)",
    "The Weepies,Deb Talan,Steve Tannen - Gotta Have You",
    "The Wellermen - Wellerman",
    "TheFatRat,RIELL - Hiding in the Blue",
    "Tom Paxton - The Last Thing on My Mind",
    "TRUE - Sincerely (1)",
    "TRUE - Sincerely",
    "TRUE - WILL",
    "TRUE - 未来のひとへ",
    "TSUKINOSORA - Luv Letter",
    "Udo Jürgens - Ich War Noch Niemals in New York",
    "Uru - それを愛と呼ぶなら (1)",
    "Uru - それを愛と呼ぶなら",
    "Uru - ファーストラヴ",
    "V.A. - Letter Song10年後の私へ (合唱版)",
    "V.A. - ほころび",
    "V.A. - 旅立ちの歌",
    "V.A. - 風見学園校歌",
    "Wake Up, Girls! - 言の葉 青葉",
    "Walk off the Earth - My Stupid Heart",
    "Walk off the Earth,Luminati Suns - My Stupid Heart (Acoustic Version)",
    "WANDS - 世界が終るまでは",
    "Windborne - Song of the Lower Classes",
    "Wolfenmond - Meienzit ane nit",
    "Wynners - 455(part of game)",
    "Yael Naim - New Soul",
    "Yanni - Nightingale",
    "Yanni - With an Orchid",
    "YOASOBI - 群青",
    "ZARD - 少女の頃に戻ったみたいに",
    "ZARD - 運命のルーレット 廻して",
    "ZONE - secret base 〜君がくれたもの〜",
    "あいみょん - マリーゴールド",
    "あたらよ - また夏を追う",
    "いきものがかり - SAKURA",
    "こはならむ - リセットボタン",
    "さくら学院 - 旅立ちの日に",
    "つじあやの - 風になる",
    "のみこ - Bad Apple!! feat. nomico",
    "のみこ - Bad Apple!!",
    "ふきのとう - 思い出通り雨",
    "みずさわゆうき - THROUGH THE YEARS AND FAR AWAY",
    "みんな - 浜咲学園校歌斉唱",
    "みんな - 澄空学園校歌斉唱",
    "アフィリア・サーガ - 糸 (ver.アフィリア・サーガ)",
    "アンジェラ・アキ - 手紙 ~拝啓 十五の君へ~",
    "アンジェラ・アキ - 手紙 〜拝啓　十五の君へ〜-strings version-",
    "オムニバス - もう恋なんてしない",
    "クリス・ハート - ラブ・ストーリーは突然に",
    "ゴンチチ - 28",
    "ゴンチチ - 放課後の音楽室",
    "ゴンチチ - 朝",
    "スノープリンス合唱団 - スノープリンス",
    "スピッツ - 空も飛べるはず",
    "ハンバート ハンバート - おうちに帰りたい",
    "ハンバート ハンバート - 今晩はお月さん",
    "ヒャダイン - ヒャダインのカカカタ☆カタオモイ-C",
    "フランシュシュ - 光へ",
    "ヘクとパスカル - ぼくら",
    "ボイジャー,千紗,根岸拓哉 - 私立 降星小学校校歌",
    "ヨルシカ - 老人と海",
    "ロクデナシ - ただ声一つ (1)",
    "ロクデナシ - ただ声一つ",
    "ロクデナシ - 知らないままで",
    "ヰ世界情緒 - シリウスの心臓",
    "ヲタみん - Letter Song",
    "三浦サリー - 桜咲く(with 郡山市立大島小学校 合唱部)",
    "三浦透子,RADWIMPS - グランドエスケープ (Movie edit)",
    "三輪学 - 厳しい表情の少女",
    "上坂すみれ - 夢の翼",
    "上海彩虹室内合唱团 - 世界上唯一的花世界に一つだけの花",
    "中島みゆき - ひとり上手",
    "中島みゆき - 島より",
    "中村千尋 - カサネテク",
    "中西保志 - ラヴ・イズ・オーヴァー",
    "久石譲 - 合唱 君をのせて",
    "井上あずみ - まいご",
    "亜咲花 - Sun Is Coming Up",
    "今野宏美 - はかせのサメといぬ",
    "伶 - 散る散る満ちる",
    "佐々木恵梨 - ミモザ (Movie Edit)",
    "佐々木恵梨 - ミモザ",
    "佐咲紗花 - Zzz (Acappella Version)",
    "佐咲紗花 - Zzz (Bossa Nova Version)",
    "余雨 - 再见深海（微亮的瞬间）",
    "倍賞千恵子 - —エンディング—世界の約束～人生のメリーゴーランド",
    "八木海莉 - 刺激による彼ら",
    "冯曦妤 - A Little Love",
    "冯曦妤 - 再见---警察",
    "凰華女学院声楽隊 - 凰華女学院 学院歌『遥かに仰ぎ、麗しの』斉唱",
    "刘海俊 - 나에게 그대만이 (New Ver.)",
    "初音ミク,東京フィルハーモニー交響楽団 - 桜ノ雨 (アンコール)",
    "前田愛 - keep on",
    "千葉紗子,中原麻衣 - 私立風華学園校歌～水晶の守り～",
    "原由子 - 花咲く旅路 (原由子1991.6.1 アルバム“MOTHER”より)",
    "可憐な合唱団 - アニーローリー",
    "可憐な合唱団 - 気球にのってどこまでも",
    "司南 - 春三月",
    "合唱団わをん - Dreamer",
    "合唱団わをん - ハナノイロ",
    "合唱団わをん - 影踏み",
    "合唱団わをん - 潮風のハーモニー",
    "吉森信 - ふるさとの匂い",
    "吴金黛 - 森林狂想曲",
    "吴青峰 - 歌颂者",
    "周传雄 - 青花",
    "和田薫 - 時代を超える想い1",
    "和田薫 - 時代を超える想い2",
    "坂本真綾 - 菫",
    "坂本龍一 - Merry Christmas Mr. Lawrence",
    "夏川りみ - 会いたい(想你)",
    "夏川りみ - 愛よ愛よ（かなよかなよ）",
    "夏川りみ - 涙（なだ）そうそう",
    "大原櫻子 - #やっぱもっと",
    "大塚愛 - プラネタリウム",
    "大杉久美子 - ドラえもんのうた",
    "大藤史 - 季节を抱きしめて",
    "大谷育江 - ピカチュウのうた",
    "大貫妙子,坂本龍一 - 赤とんぼ（Aka Tombo）",
    "大野克夫 - キミがいれば(十字路ヴァージョン)",
    "大黒摩季 - あなただけ見つめてる",
    "学園生活部 - 仰げば尊し",
    "家入レオ - ずっと、ふたりで",
    "小岩井ことり,村川梨衣,佐倉綾音 - 旭丘分校校歌",
    "小林幸子 - 幸せ",
    "山口百恵 - ありがとうあなた",
    "山口百恵 - 伊豆の踊子",
    "山口百恵 - 再见的另一方",
    "山口龍夫 - あめのみつかいの 合唱団 ver",
    "山崎あおい - 東京",
    "岩男潤子,友枝小学校コーラス部 - くれゆくひととせ",
    "岩男潤子,友枝小学校コーラス部 - 夜の歌(クリスマス・ヴァージョン)",
    "島谷ひとみ - 亜麻色の髪の乙女",
    "島谷ひとみ - 長い間",
    "川嶋あい - それが大事",
    "川嶋あい - とびら (合唱Ver.)",
    "川嶋あい - ガラスの中の私",
    "川嶋あい - スーツケース",
    "川嶋あい - 時雨",
    "川嶋あい - 雪に咲く花",
    "市川淳 - Old Memory",
    "市川淳 - ヨスガノソラ メインテーマ -記憶-",
    "市川淳 - ヨスガノソラ メインテーマ -願い-",
    "愛殺寶貝 - ふたりのきもちのほんとのひみつ",
    "戴佩妮 - 怎样",
    "手嶌葵 - さよならの夏～コクリコ坂から～（Live at Katsushika Symphony Hills Mozart Hall on May 28th, 2016）",
    "手嶌葵 - テルーの呗 (歌集バージョン)",
    "手嶌葵 - テルーの唄",
    "手嶌葵 - 挿入歌「テルーの唄」 映画バージョン (アカペラ)",
    "手嶌葵 - 瑠璃色の地球（「未来への航海」バージョン）",
    "斉藤和義 - 空に星が綺麗",
    "日向坂46 - 僕なんか",
    "有里知花 - I Cry",
    "有里知花 - I need to be in love (青春の辉き)",
    "未来古代楽団,安次嶺希和子 - 忘れじの言の葉 (feat. 安次嶺希和子) [2022]",
    "本名陽子 - カントリー・ロード",
    "本多RuRu - 美丽心情",
    "杉並児童合唱団 - 桜の空",
    "李勤舍 - 穿越时空的思念（钢琴）",
    "東山奈央 - 初恋 (TVアニメ「月がきれい」EDIT ver.)",
    "松谷卓 - COSMOS 国分寺第三中学校合唱部による女声二部合唱",
    "松谷卓 - マイバラード 中五島中学合唱部による女声二部合唱",
    "林原めぐみ - 今日の日はさようなら",
    "林有三 - 今日の日はさようなら",
    "林有三 - 水明芸術大学附属高等学校 校歌",
    "柴田淳 - 秋桜",
    "桜高3-2 - 桜が丘女子高等学校校歌",
    "森 恵 - 涙そうそう",
    "武部聡志 - 紺色のうねりが",
    "水樹奈々 - 紺碧のアル・フィーネ ～水樹カヤ ver.～",
    "水瀬いのり - 風色Letter",
    "浜崎あゆみ - Secret",
    "清予SeiYo - 命に嫌われている",
    "清浦夏実 - 花火",
    "灰夜基 - 唄の島",
    "熊木杏里 - 春隣",
    "熊木杏里 - 風の記憶",
    "熊谷育美 - 海",
    "牧野由依 - アムリタ－弾き語り－",
    "玉置浩二 - 初恋",
    "田中理恵 - 水の証",
    "當山みれい - 君のとなり",
    "癒月 - you (Vocal)",
    "白浜坂高校合唱部 - いつまでも辉きを",
    "白浜坂高校声楽部 - goin' my way !!(合唱版)",
    "白浜坂高校声楽部 - リフレクティア(合唱版)",
    "白浜坂高校生徒一同 - 白浜坂高校校歌",
    "白石稔,古谷静佳,今野宏美 - 旅立ちの日に",
    "白石稔,古谷静佳,今野宏美 - 気球にのってどこまでも",
    "石川由依 - 言葉の向こう",
    "磯村由紀子 - 風の住む街",
    "秦基博 - Rain",
    "程响 - 是否",
    "窪田ミナ - 潮待ちの岛へ",
    "粥粥和小伙 - 东极岛",
    "純名りさ - 月の庭",
    "細谷佳正,水瀬いのり,高橋李依 - 心が叫びだす～あなたの名前呼ぶよ",
    "結城アイラ - Believe in",
    "羊毛とおはな - Desperado",
    "羽肿 - Windy Hill",
    "能登麻美子,豊口めぐみ,清水香里 - 片手だけつないで",
    "芝麻Mochi - 泣けど喚けど朝がきて",
    "苏星婕 - 梦里花",
    "范玮琪 - 蒲公英",
    "茅原実里 - みちしるべ (1)",
    "茅原実里 - みちしるべ",
    "茅原実里 - エイミー",
    "茅原実里 - 憧れは流星のように",
    "茅野愛衣,戸松遥,早見沙織 - secret base ~君がくれたもの~ (10 years after Ver.)",
    "茶太 - Secret",
    "茶理理 - Subversive",
    "茶理理,芝麻Mochi - AMY艾米",
    "西木康智 - 踊子プリムロゼのテーマ",
    "贵族乐团 - Stay",
    "長渕剛 - GOOD-BYE青春",
    "長渕剛 - 友よ",
    "長渕剛 - 夏の恋人",
    "陈致逸,HOYO-MiX - 银白的希望 Fragile Fantasy",
    "雨宮天,高橋李依,茅野愛衣 - ちいさな冒険者",
    "雪路yukiji - ソラゴト",
    "高垣彩陽,早見沙織,瀬戸麻沙美 - 心の旋律",
    "高橋洋子 - 残酷な天使のテーゼ",
    "高橋美鈴,西本麻里,石沢晶 - ムーンライト伝説",
    "鹿先森乐队,保利常熟江南爱乐合唱团 - 我想抵达的你",
    "麻枝准,やなぎなぎ - 終わりの世界から",
    "麻衣 - ひまわりの家の輪舞曲",
]

function audioPlayerInit() {
    const index = Math.floor(Math.random() * nameList.length);
    return {index:index, src:`../static/audio/${nameList[index]}.mp3`};
}