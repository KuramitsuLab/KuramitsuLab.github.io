problem_list = [
    //1 入力
    ["水圧", "https://atcoder.jp/contests/abc231/tasks/abc231_a", "入出力に慣れましょう"],
    ["円", "https://atcoder.jp/contests/abc145/tasks/abc145_a", "数値に変換"], //: 数値に変換しわすれないで
    ["行列式", "https://atcoder.jp/contests/abc184/tasks/abc184_a", "複数行はinput()も同じ回数使う"],
    ["辞書順", "https://atcoder.jp/contests/abc217/tasks/abc217_a", "文字列はそのまま"],

    ["５つの変数", "https://atcoder.jp/contests/abc170/tasks/abc170_a", "リストとしての入力"],
    ["Print341", "https://atcoder.jp/contests/abc341/tasks/abc341_a", "出力の工夫"],
    ["アスキーアート", "https://atcoder.jp/contests/abc294/tasks/abc294_b", "入出力の仕上げ"],
    ["POW", "https://atcoder.jp/contests/abc205/tasks/abc205_c", "工夫しないとTLEに"],

    //2 条件分岐
    ['エレベータ', "https://atcoder.jp/contests/abc326/tasks/abc326_a", "実用的な条件分岐"],
    ["仲間外れ", "https://atcoder.jp/contests/abc075/tasks/abc075_a", "条件を整頓する"],
    ["本の読み方", "https://atcoder.jp/contests/abc168/tasks/abc168_a", "orを使わない方法も"],
    ["両面印刷", "https://atcoder.jp/contests/abc157/tasks/abc157_a", "切り上げ"],

    ["直角三角形", "https://atcoder.jp/contests/abc362/tasks/abc362_b", "数学向け"],
    ["Product Max", "https://atcoder.jp/contests/abc178/tasks/abc178_b", "ヒント: max()"],
    ["電源プラグ", "https://atcoder.jp/contests/abc139/tasks/abc139_b", "延長ケーブルを増やすと"],
    ["ハンマー", "https://atcoder.jp/contests/abc270/tasks/abc270_b", "図に書いて場合分け"],
    
    // 3 文字列
    ["文字列の連結", "https://atcoder.jp/contests/abc149/tasks/abc149_a", "これはできてほしい"], //
    ["coffee", "https://atcoder.jp/contests/abc160/tasks/abc160_a", "文字インデックス"],
    ["Rotate", "https://atcoder.jp/contests/abc197/tasks/abc197_a", "スライス s[a:b]を覚えよう"],
    ["Tiers", "https://atcoder.jp/contests/abc224/tasks/abc224_a", "endswith()の使い方"],

    ["ROT N", "https://atcoder.jp/contests/abc146/tasks/abc146_b", "有名問題:シーザ暗号"],
    ["弱い暗証番号", "https://atcoder.jp/contests/abc212/tasks/abc212_b", "ヒント: データとしてパスワードを作る"],
    ["レジ打ち", "https://atcoder.jp/contests/abc283/tasks/abc283_c", "メソッドを有効に使おう"],
    ["空港コード", "https://atcoder.jp/contests/abc349/tasks/abc349_c", "実用的な問題"],
    //["大嫌いな７", "https://atcoder.jp/contests/abc186/tasks/abc186_c", "ヒント: oct(x)"],

    // 4 繰り返し
    ["全部同じ", "https://atcoder.jp/contests/abc324/tasks/abc324_a", "リスト"],
    ["数列の合計", "https://atcoder.jp/contests/abc272/tasks/abc272_a", "合計を求める関数は？"],
    ["星集め", "https://atcoder.jp/contests/abc192/tasks/abc192_a", "シミュレーション"], //: シミュレーションでも解けます
    ["倍数", "https://atcoder.jp/contests/abc220/tasks/abc220_a", "数学的考察でも解けます"],

    ["貯金箱", "https://atcoder.jp/contests/abc206/tasks/abc206_b", "シミュレーション"],    
    ["木の実", "https://atcoder.jp/contests/abc204/tasks/abc204_b", "リストの良問"],
    ["預金", "https://atcoder.jp/contests/abc165/tasks/abc165_b", "浮動小数点数注意（ヒント:整数で計算）"],
    ["ボールの魔法", "https://atcoder.jp/contests/abc216/tasks/abc216_c", "実は簡単かも"],

    // 5. 総合
    ["XOR", "https://atcoder.jp/contests/abc213/tasks/abc213_a", "XORの演算子？"],
    ["奇妙な関数", "https://atcoder.jp/contests/abc234/tasks/abc234_a", "関数を定義しよう"],
    ["3.14", "https://atcoder.jp/contests/abc314/tasks/abc314_a", "文字列練習"],
    ["ビリヤード", "https://atcoder.jp/contests/abc183/tasks/abc183_b", "数学向け"], // 

    ["重複の除去", "https://atcoder.jp/contests/abc191/tasks/abc191_b", "データサイエンス向け"],
    ["大文字小文字", "https://atcoder.jp/contests/abc357/tasks/abc357_b", "文字列変換"],
    ["仕事の割り当て", "https://atcoder.jp/contests/abc194/tasks/abc194_b", "全探索の良問"],
    ["プレイリスト", "https://atcoder.jp/contests/abc281/tasks/abc281_c", "よい問題（リスト）"],
    
    //6. 総合
    ["等差数列", "https://atcoder.jp/contests/abc201/tasks/abc201_a", "ウォーミングアップ"],
    ["ReLU", "https://atcoder.jp/contests/abc183/tasks/abc183_a", "深層学習でおなじみの"], //
    ["塩基対", "https://atcoder.jp/contests/abc122/tasks/abc122_a", "辞書を思い出して"], //: 辞書で解いて見ましょう
    ["日本人形", "https://atcoder.jp/contests/abc363/tasks/abc363_b", "シミュレーション"],

    ["審査員", "https://atcoder.jp/contests/abc291/tasks/abc291_b", "トリム平均"],
    ["桁数の範囲", "https://atcoder.jp/contests/abc083/tasks/abc083_b", "桁数を計算する関数を定義しよう"],    
    ["秒針", "https://atcoder.jp/contests/abc168/tasks/abc168_c", "三角関数"], //
    ["Kaprekar", "https://atcoder.jp/contests/abc192/tasks/abc192_c", "関数を覚えよう"],
    
    // 7
    ["1-2-4", "https://atcoder.jp/contests/abc270/tasks/abc270_a", "2進数で考えみると.."],
    ["魔法陣", "https://atcoder.jp/contests/abc309/tasks/abc309_a", "2次元配列"],
    ["取り除く", "https://atcoder.jp/contests/abc344/tasks/abc344_a", "パターンマッチ"],
    ["非負整数の組", "https://atcoder.jp/contests/abc214/tasks/abc214_b", "全探索"],
    ["2番目に高い山", "https://atcoder.jp/contests/abc201/tasks/abc201_b", "ソートとタプル"],
    ["A^A", "https://atcoder.jp/contests/abc327/tasks/abc327_b", "考えみて"],
    ["乗客の数", "https://atcoder.jp/contests/abc339/tasks/abc339_c", "良い問題 最小値"],
    ["二乗誤差", "https://atcoder.jp/contests/abc194/tasks/abc194_c", "２重ループ TLE注意"], //: 

    // 8.
    ["再帰関数", "https://atcoder.jp/contests/abc273/tasks/abc273_a", "再帰関数を覚えよう"],
    ["水の移動", "https://atcoder.jp/contests/abc136/tasks/abc136_a", "落ち着いて考えよう"], //: 落ち着いて考えてみよう
    ["<=>", "https://atcoder.jp/contests/abc345/tasks/abc345_a", "文字列パターン"],
    ["計算問題", "https://atcoder.jp/contests/abc306/tasks/abc306_b", "ヒント: enumerate"],
    
    ["ブービー賞", "https://atcoder.jp/contests/abc213/tasks/abc213_b", "リストを使いこなせているか？"],
    ["直線上の距離", "https://atcoder.jp/contests/abc305/tasks/abc305_b", "累積和"],
    ["良い数字", "https://atcoder.jp/contests/abc336/tasks/abc336_c", "数字処理"],
    ["メモ化再帰", "https://atcoder.jp/contests/abc275/tasks/abc275_d", "再計算をしない"],

    // 9.
    ["割り切れる", "https://atcoder.jp/contests/abc347/tasks/abc347_a", "リストの逐次処理"],
    ["母音", "https://atcoder.jp/contests/abc315/tasks/abc315_a", "文字列練習"],
    ["超能力", "https://atcoder.jp/contests/abc148/tasks/abc148_a", "問題を理解しよう"],
    ["セカンドベスト", "https://atcoder.jp/contests/abc365/tasks/abc365_b", "あっさり解きたい"],
    ["呼び出し", "https://atcoder.jp/contests/abc293/tasks/abc293_b", "辞書を使おう"],
    ["ビンゴ", "https://atcoder.jp/contests/abc157/tasks/abc157_b", "コードをしっかり書く力"],
    ["有向グラフ", "https://atcoder.jp/contests/abc284/tasks/abc284_c", "グラフに挑戦"],
    ["差分の和⭐️", "https://atcoder.jp/contests/abc186/tasks/abc186_d", "これは良問 ループを減らす"],
//    ["数独っぽい", "https://atcoder.jp/contests/abc327/tasks/abc327_c", "2次元配列"],

    // 12.
    ["婚活", "https://atcoder.jp/contests/abc296/tasks/abc296_a", "文字列と条件判定"],
    ["ビルの高さ", "https://atcoder.jp/contests/abc353/tasks/abc353_a", "探索でしょうね"],
    ["クイズの得点", "https://atcoder.jp/contests/abc184/tasks/abc184_b", "シミュレーション、データ処理"],
    ["モジュロ", "https://atcoder.jp/contests/abc266/tasks/abc266_b", "数学的問題"],
    ["log2(N)", "https://atcoder.jp/contests/abc215/tasks/abc215_b", "答えがかいてあるじゃん"],
    ["団子", "https://atcoder.jp/contests/abc299/tasks/abc299_c", "文字列"],
    ["トーナメント", "https://atcoder.jp/contests/abc188/tasks/abc188_c", "トーナメント表を分析すると"],
    ["最適な戦略", "https://atcoder.jp/contests/abc239/tasks/abc239_d", "青木君が勝つための必要十分条件は？"],

    // 13.
    ["⭐️の数", "https://atcoder.jp/contests/abc363/tasks/abc363_a", "実用的"],
//    ["等差数列", "https://atcoder.jp/contests/abc340/tasks/abc340_a", "数学向け"],
    ["合格者数", "https://atcoder.jp/contests/abc330/tasks/abc330_a", "データの基礎"],
    ["内積", "https://atcoder.jp/contests/abc188/tasks/abc188_b", "ヒント: zipを調べて"],
    ["選挙", "https://atcoder.jp/contests/abc231/tasks/abc231_b", "Counterを調べて"],
//    ["1213121", "https://atcoder.jp/contests/abc247/tasks/abc247_c", "再帰的な感じがする"],
    ["ツアー", "https://atcoder.jp/contests/abc204/tasks/abc204_c", "深さ優先探索(dfs)"],
    ["括られた,", "https://atcoder.jp/contests/abc282/tasks/abc282_c", "いわゆる構文解析"],
    ["", "https://atcoder.jp/contests/abc231/tasks/abc231_a", ""],
    ["", "https://atcoder.jp/contests/abc231/tasks/abc231_a", ""],

    ["零和", "https://atcoder.jp/contests/abc349/tasks/abc349_a", "零和ってなんでしょう？"],
    ["植物の成長", "https://atcoder.jp/contests/abc354/tasks/abc354_a", "シミュレーションか数理モデル"],
    ["CTZ", "https://atcoder.jp/contests/abc336/tasks/abc336_b", "関数定義してみよう"],
//    ["靴下", "https://atcoder.jp/contests/abc295/tasks/abc295_c", "ぺあを作る"],
    ["ベルトコンベア", "https://atcoder.jp/contests/abc265/tasks/abc265_c", "地道にコーディング"],
    ["差分ある？", "https://atcoder.jp/contests/abc296/tasks/abc296_c", "計算量、気をつけて"],
    ["引き算", "https://atcoder.jp/contests/abc297/tasks/abc297_d", "計算量、気をつけて"],
    ["", "https://atcoder.jp/contests/abc231/tasks/abc231_a", ""],
    ["", "https://atcoder.jp/contests/abc231/tasks/abc231_a", ""],

    // 14. 
    ["閏年", "https://atcoder.jp/contests/abc365/tasks/abc365_a", "実用的"],
    ["TLD", "https://atcoder.jp/contests/abc339/tasks/abc339_a", "文字列実用"],
    ["同姓同名", "https://atcoder.jp/contests/abc216/tasks/abc216_b", "Setを使うと楽"],
//    ["Mongeness", "https://atcoder.jp/contests/abc224/tasks/abc224_b", "何かしらの数学的"],
    ["導火線", "https://atcoder.jp/contests/abc223/tasks/abc223_c", "図に書いてみて"],
    ["三角形", "https://atcoder.jp/contests/abc224/tasks/abc224_c", "全探索、数学大好き"],
//    ["開票", "https://atcoder.jp/contests/abc329/tasks/abc329_d", "D問題だけどラッキー問題?"],
    ["弱高橋", "https://atcoder.jp/contests/abc232/tasks/abc232_d", "これが解けたらICPCへ"],


]

students = [
    {'sid': 22316075, 'name': '長井 夢歩', 'uname': 'yuna23'},
{'sid': 22316004, 'name': '石井 花歩', 'uname': 'yumekanaeru'},
{'sid': 22316025, 'name': '川喜田 有香', 'uname': 'Yu3104'},
{'sid': 22316028, 'name': '神野 希優', 'uname': 'ysho6'},
{'sid': 22316102, 'name': '横山 由依', 'uname': 'yayoi_8128'},
{'sid': 22316090, 'name': '間部 永理奈', 'uname': 'watermelonjuice'},
{'sid': 22316045, 'name': '櫻井 妃菜', 'uname': 'uson'},
{'sid': 22316062, 'name': '竹内 彩華', 'uname': 'usagisandesu'},
{'sid': 22316082, 'name': '馬場 祐奈', 'uname': 'un4bb'},
{'sid': 22316014, 'name': '岡本 渚', 'uname': 'tutui'},
{'sid': 22316058, 'name': '瀬尾 翼', 'uname': 'tttttttbs'},
{'sid': 22316031, 'name': '菊池 美咲', 'uname': 'tokoroten0141'},
{'sid': 22116045, 'name': '杉島 唯華', 'uname': 'tiseyuz'},
{'sid': 22316083, 'name': '平井 野乃花', 'uname': 'tampopo15'},
{'sid': 22116020, 'name': '金井 静香', 'uname': 'Suihankikun'},
{'sid': 22316030, 'name': '菊池 志帆', 'uname': 'sinomiya'},
{'sid': 22316092, 'name': '見崎 優衣', 'uname': 'ShooootingStar'},
{'sid': 22216016, 'name': '大里 梨々花', 'uname': 'shinakoworld'},
{'sid': 22316053, 'name': '柴田 志保', 'uname': 'shiho5110'},
{'sid': 22316017, 'name': '小田切 渚', 'uname': 'Rykky'},
{'sid': 22316032, 'name': '岸 えみり', 'uname': 'ruri15'},
{'sid': 22316106, 'name': '鷲谷 瑠璃', 'uname': 'Ri2mimi'},
{'sid': 22316011, 'name': '大石 望未', 'uname': 'Q_Q'},
{'sid': 22316033, 'name': '木下 真里菜', 'uname': 'ppurinnn'},
{'sid': 22316095, 'name': '村田 亜実', 'uname': 'potatoinfp'},
{'sid': 22316078, 'name': '野村 実花', 'uname': 'pome1002'},
{'sid': 22316015, 'name': '小木曽 朱理', 'uname': 'onigirimann'},
{'sid': 22316041, 'name': '小林 ゆら', 'uname': 'oil0'},
{'sid': 22316088, 'name': '松居 怜奈', 'uname': 'odm135'},
{'sid': 22316064, 'name': '田島 莉穏', 'uname': 'nyonmrc0727'},
{'sid': 22316034, 'name': '熊田 彩優', 'uname': 'nyannyanayunyan'},
{'sid': 22316003, 'name': '有竹 望美', 'uname': 'nozomi_infp'},
{'sid': 22316094, 'name': '宮島 萌花', 'uname': 'mymk2151'},
{'sid': 22216037, 'name': '嶋田 紗月', 'uname': 'Moon5'},
{'sid': 22316057, 'name': '壽山 心美', 'uname': 'monokurochan'},
{'sid': 22316006, 'name': '井上 桃寧', 'uname': 'momoooonga'},
{'sid': 22217019, 'name': '大塚 彩智', 'uname': 'marugameseimen'},
{'sid': 22316027, 'name': '川村 咲歩', 'uname': 'maronchai'},
{'sid': 22316016, 'name': '小黒 莉子', 'uname': 'm223'},
{'sid': 22316091, 'name': '三上 愛奈', 'uname': 'lunao0'},
{'sid': 22316055, 'name': '杉山 晴菜', 'uname': 'lun4'},
{'sid': 22216092, 'name': '山岸 さくら', 'uname': 'lr_3'},
{'sid': 22316021, 'name': '金井 さくら', 'uname': 'kyuuuuri'},
{'sid': 22316079, 'name': '野呂 玲紗', 'uname': 'kuu0917'},
{'sid': 22316076, 'name': '長山 莉緒', 'uname': 'kuma2222'},
{'sid': 22262042, 'name': '菅原 優希', 'uname': 'korochan1403'},
{'sid': 22316026, 'name': '川岸 美遥', 'uname': 'komasann'},
{'sid': 22311121, 'name': '三浦 綾女', 'uname': 'katasaya'},
{'sid': 22316061, 'name': '田久保 花奏', 'uname': 'kat0316'},
{'sid': 22316068, 'name': '土浦 加瑚', 'uname': 'kakaomame8'},
{'sid': 22316037, 'name': '小泉 歩生', 'uname': 'ka229'},
{'sid': 22316050, 'name': '佐藤 凛々子', 'uname': 'imamurakohei'},
{'sid': 22316042, 'name': '近藤 衣千花', 'uname': 'ikda13758'},
{'sid': 22316067, 'name': '中條 愛子', 'uname': 'hii0ppappi_'},
{'sid': 22316070, 'name': '東條 かの子', 'uname': 'heruniasan'},
{'sid': 22316009, 'name': '薄井 遥香', 'uname': 'haru08'},
{'sid': 22316005, 'name': '井上 ひろこ', 'uname': 'Hanpe'},
{'sid': 22316098, 'name': '柳 ヒカル', 'uname': 'haifunn'},
{'sid': 22316040, 'name': '小林 稜佳', 'uname': 'gobango'},
{'sid': 22316046, 'name': '佐々本 梨世', 'uname': 'flutepiccolo'},
{'sid': 22316108, 'name': '渡邉 真菜', 'uname': 'fctokyo'},
{'sid': 22217018, 'name': '江口 優那', 'uname': 'Eutor9'},
{'sid': 22217004, 'name': '飯山 瑛未', 'uname': 'Emi01'},
{'sid': 22316007, 'name': '今村 友紀', 'uname': 'doremispringwind'},
{'sid': 22316039, 'name': '小西 英里香', 'uname': 'dkfo2'},
{'sid': 22316077, 'name': '根本 さくら', 'uname': 'curelillian'},
{'sid': 22316074, 'name': '永井 碧月', 'uname': 'crg715'},
{'sid': 22316051, 'name': '椎畑 美幸', 'uname': 'Chumi23'},
{'sid': 22316023, 'name': '亀井 のどか', 'uname': 'chocco'},
{'sid': 22316107, 'name': '渡邊 あいら', 'uname': 'charliepapico'},
{'sid': 22217016, 'name': '宇田川 果乃', 'uname': 'chapappa'},
{'sid': 22316001, 'name': '青木 莉世', 'uname': 'bik'},
{'sid': 22316071, 'name': '中久喜 綾乃', 'uname': 'aya412'},
{'sid': 22216055, 'name': '塚田 愛実', 'uname': 'asdfghjklq'},
{'sid': 22316054, 'name': '澁谷 姫愛', 'uname': 'appletea12'},
{'sid': 22116030, 'name': '小関 由香', 'uname': 'ammyu'},
{'sid': 22316087, 'name': '前原 茜', 'uname': 'akachann'},
{'sid': 22216005, 'name': '赤穗 若那', 'uname': 'aako0172'},
{'sid': 22316024, 'name': '河合 智恵', 'uname': 'aaasuperman'},
{'sid': 22316048, 'name': '佐藤 澄佳', 'uname': '103150'},
{'sid': 22316012, 'name': '大西 彩夏', 'uname': '0024aa'},
]



// GET のデータを配列にして返す
function GetQueryString() {
    var result = {};
    if (1 < window.location.search.length) {
        var query = window.location.search.substring(1);
        var parameters = query.split('&');
        for (var i = 0; i < parameters.length; i++) {
            var element = parameters[i].split('=');
            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);
            result[paramName] = paramValue;
        }
    }
    return result;
}

function data_jst(epochTime) {
    // エポックタイムを設定（例: 1609459200000 は 2021年1月1日 00:00:00 UTC）
    // エポックタイムをDateオブジェクトに変換
    const date = new Date(epochTime);

    // JSTに変換 (JSTはUTCより9時間進んでいるため、時間を調整)
    const jstOffset = 9 * 60; // 9時間を分に変換
    const jstDate = new Date(date.getTime() + jstOffset * 60 * 1000);

    // 日時を出力
    console.log(jstDate.toISOString()); // ISO形式で出力
    console.log(jstDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })); // 日本のローカル形式で出力
    return jstDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
}

function problem_score(problem_id) {
    if (problem_id.startsWith('abc')) {
        if(problem_id.endsWith('_a')) { return 1; }
        if(problem_id.endsWith('_b')) { return 2; }
        if(problem_id.endsWith('_c')) { return 4; }
        return 6;
    }
    return 3;
}

window.onload = function () {
    // GET を表に反映
    const query = GetQueryString();
    if (query["uid"]) {
        atcoder_id.value = query["uid"];
    }

    // 問題一覧を表示
    var problems = {

    }

    function tail(ss) {
        return ss[ss.length - 1];
    }

    const start_time = 1726758000; // 2024年9月20日 金曜日 00:00:00 GMT+09:00

    for (var i = 0; i < problem_list.length; i++) {
        if (problem_list[i].length == 1) continue;
        var title = problem_list[i][0];
        var url = problem_list[i][1];
        var comment = problem_list[i][2];
        var week = ((i / 8)|0) + 1;
        var deadline = week * 604800 + 1614556800;
        var n = (i % 8) + 1;
        var problem_id = tail(url.split('/'));
        if (problem_id in problems) {
            continue;
        }
        var tr = problem_tbody.insertRow(-1);
        var th = document.createElement("th");
        th.innerHTML = `${week}-${n}`;
        th.scope = "row";
        tr.appendChild(th);
        var td1 = tr.insertCell(-1);
        td1.innerHTML = `<a href="${url}" target="_blank">${title}</a> (${problem_id})`;
        var td2 = tr.insertCell(-1);
        td2.innerHTML = comment;
        var td3 = tr.insertCell(-1);
        problems[problem_id] = {
            'cell': td3,
            'deadline': deadline,
            'score': problem_score(problem_id),
        }
    }

    //https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=chokudai&from_second=1599947073
    //{"id":56873227,
    //"epoch_second":1723990061,
    //"problem_id":"agc067_c",
    //"contest_id":"agc067",
    //"user_id":"chokudai",
    //"language":"C# 11.0 AOT (.NET 7.0.7)",
    //"point":1100.0,
    //"length":4754,
    //"result":"AC",
    //"execution_time":243}]

    const base_url = 'https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions'
    // const start_time = 1614556800
    // 提出状況を表示
    if (atcoder_id.value !== '') {
        const uid = atcoder_id.value
        var url = `${base_url}?user=${uid}&from_second=${start_time}`
        fetch(url).then(function (response) {
            response.text().then(function (text) {
                //console.log(text);
                const data = JSON.parse(text);
                data.sort((x,y)=>x.epoch_second-y.epoch_second);
                var total = 0;
                var time_bonus = 0;
                var wa_bonus = 0;
                var extra_bonus = 0;
                var epoch = [];
                var check_AC = {};
                var check_WA = {};
                var extraHTML = '';
                var epoch_AC = 0;
                for (var i = 0; i < data.length; i += 1) {
                    var contest_id = data[i].contest_id;
                    var problem_id = data[i].problem_id;
                    var url = `https://atcoder.jp/contests/${contest_id}/submissions/${data[i].id}`
                    if (data[i].epoch_second > 1614556800) {
                        epoch.push(data[i].epoch_second);
                    }
                    //https://atcoder.jp/contests/abc029/submissions/21458111
                    if (problem_id in problems) {
                        var badge = `<span class="label-wa">${data[i].result}</span>`       
                        if (data[i].result == 'AC') {
                            badge = `<span class="label-ac">AC</span>`;
                            if(!(problem_id in check_AC)) {
                                var label = "label-ac";
                                var score = problems[problem_id].score;
                                if(problem_id in check_WA) {
                                    score += 1; // WA加算
                                    wa_bonus += 1;
                                }
                                // if(data[i].epoch_second < problems[problem_id].deadline) {
                                //     var label = "label-bonus-ac";
                                //     score += 1; // 時間ボーナス
                                //     time_bonus += 1;
                                // }
                                if(problem_score(problem_id) == 2 && data[i].epoch_second - epoch_AC < 60*3) {
                                    label = "label-black";
                                    console.log(data[i].epoch_second - epoch_AC)
                                    score = 1;
                                }
                                if(problem_score(problem_id) > 2 && data[i].epoch_second - epoch_AC < 60*8) {
                                    label = "label-black";
                                    console.log(data[i].epoch_second - epoch_AC)
                                    score = 1;
                                }
                                check_AC[problem_id] = score;
                                total += score;
                                badge = `<span class="${label}">AC<small>(${score})</small></span>`;
                            }
                            epoch_AC = data[i].epoch_second;
                        }
                        else {
                            if(!(problem_id in check_WA)) {
                                check_WA[problem_id] = 1;
                            }
                            epoch_AC = 0;
                        }
                        problems[problem_id].cell.innerHTML += `<a href="${url}" target="_blank">${badge}</a> `;
                    }
                    else {
                        epoch_AC = 0;
                        if (data[i].result == 'AC' && !(problem_id in check_AC)) {
                            var score = problem_score(problem_id) - 1;
                            check_AC[problem_id] = 1;
                            if(data[i].epoch_second - epoch_AC < 60*5) {
                                label = "label-black";
                                score = 0;
                            }
                            if(score > 1) {
                                extra_bonus += score;
                                extraHTML += `<a href="${url}" target="_blank"><span class="label-ac">${problem_id}</span></a> `;
                            }
                            epoch_AC = data[i].epoch_second;
                        }
                    }
                }
                //
                epoch.sort();
                //console.log(epoch);
                var time = 0;
                for (var i = 1; i < epoch.length; i += 1) {
                    time += Math.min(epoch[i] - epoch[i - 1], 45 * 60);
                }
                time = (((time * 100) / 3600) | 0) / 100
                //
                var element = document.getElementById('results');
                element.innerHTML = `<b><big>総得点 ${total}</big></b> タイムボーナス ${time_bonus} デバッグボーナス ${wa_bonus}<br/>`;
                if(extra_bonus > 0) {
                    element.innerHTML += `番外 ${extra_bonus} ${extraHTML}<br/>`;
                }
                element.innerHTML += `<span class="label-wa">演習時間(おおよそ)</span> ${time}`;
            });
        });
    }
}


