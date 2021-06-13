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

problems = [
    //腕試し
    ["植木算", "https://atcoder.jp/contests/abc007/tasks/abc007_1", "最初の１問"],
    ["複数形", "https://atcoder.jp/contests/abc029/tasks/abc029_a", "初級 文字列"],
    ["円", "https://atcoder.jp/contests/abc145/tasks/abc145_a", "初級 整数変換"], //: 数値に変換しわすれないで
    ["直方体", "https://atcoder.jp/contests/abc041/tasks/abc041_b", "入出力"], //: 頻出入出力を参考に。
    ["３つのうち一つ", "https://atcoder.jp/contests/abc075/tasks/abc075_a", "条件分岐"], //: if文を覚えていますか？
    ["水の移動", "https://atcoder.jp/contests/abc136/tasks/abc136_a", "落ち着く"], //: 落ち着いて考えてみよう
    ["三桁の回文数", "https://atcoder.jp/contests/abc070/tasks/abc070_a", "初級 文字列"], //: 文字列を覚えていますか？
    ["ラッキー7", "https://atcoder.jp/contests/abc162/tasks/abc162_a", "初級 文字列"], //: 文字列を覚えていますか
    ["星集め", "https://atcoder.jp/contests/abc192/tasks/abc192_a", "シミュレーション"], //: シミュレーションでも解けます
    ["差分の和", "https://atcoder.jp/contests/abc186/tasks/abc186_d", "腕試し ループ"], //: 今、この問題が解けるなら、この講義は楽勝です。（解けなくても気にしないで）
    ["カエル", "https://atcoder.jp/contests/dp/tasks/dp_a", "腕試し DP"], //
    //計算
    ["Apple Pie", "https://atcoder.jp/contests/abc128/tasks/abc128_a", ""], //
    ["ディスカウント", "https://atcoder.jp/contests/abc193/tasks/abc193_a", ""], //
    ["行列式", "https://atcoder.jp/contests/abc184/tasks/abc184_a", ""],
    ["両面印刷", "https://atcoder.jp/contests/abc157/tasks/abc157_a", "切り上げ"],
    ["平均値の切り上げ", "https://atcoder.jp/contests/abc082/tasks/abc082_a", ""], //
    ["コンテストの開始時刻", "https://atcoder.jp/contests/abc057/tasks/abc057_a", ""], //
    ["スイーツ！", "https://atcoder.jp/contests/abc087/tasks/abc087_a", ""], //
    ["３つの最大値", "https://atcoder.jp/contests/abc137/tasks/abc137_a", ""], //
    ["合計時間", "https://atcoder.jp/contests/joi2011yo/tasks/joi2011yo_a", ""], //
    ["カーテン", "https://atcoder.jp/contests/abc143/tasks/abc143_a", ""],
    ["Product Max", "https://atcoder.jp/contests/abc178/tasks/abc178_b", ""], //: 
    ["ビリヤード", "https://atcoder.jp/contests/abc183/tasks/abc183_b", ""], //
    ["秒針", "https://atcoder.jp/contests/abc168/tasks/abc168_c", "三角関数"], //
    //条件分岐
    ["二つの数の間", "https://atcoder.jp/contests/abc061/tasks/abc061_a", ""], //
    ["ブラックジャック", "https://atcoder.jp/contests/abc147/tasks/abc147_a", ""], //
    ["七五三", "https://atcoder.jp/contests/abc114/tasks/abc114_a", ""], //
    ["かわいそう", "https://atcoder.jp/contests/abc155/tasks/abc155_a", ""], //
    ["猫と犬", "https://atcoder.jp/contests/abc094/tasks/abc094_a", ""], //
    ["電源プラグ", "https://atcoder.jp/contests/abc139/tasks/abc139_b", ""], //
    ["預金", "https://atcoder.jp/contests/abc165/tasks/abc165_b", "シミュレーション"],
    ["金色の効果", "https://atcoder.jp/contests/abc160/tasks/abc160_b", ""], //
    ["３つの整数", "https://atcoder.jp/contests/joi2020yo1a/tasks/joi2020_yo1a_a", ""], //
    ["成績", "https://atcoder.jp/contests/joi2020yo1b/tasks/joi2020_yo1b_a", ""], //
    ["Xに最も近い値", "https://atcoder.jp/contests/joi2020yo1c/tasks/joi2020_yo1c_a", ""], //
    ["消費税", "https://atcoder.jp/contests/abc158/tasks/abc158_c", ""], //
    ["鉛筆", "https://atcoder.jp/contests/joi2018yo/tasks/joi2018_yo_a", ""], //
    ["ソーシャルゲーム", "https://atcoder.jp/contests/joi2019yo/tasks/joi2019_yo_a", ""], //
    //リスト
    ["平均点", "https://atcoder.jp/contests/joi2014yo/tasks/joi2014yo_a", ""], //: リストを使わなくても解けるけど、リストを使ってみよう
    ["５つの変数", "https://atcoder.jp/contests/abc170/tasks/abc170_a", ""], //: もちろんリストを使います
    ["酔っ払い", "https://atcoder.jp/contests/abc189/tasks/abc189_b", "繰り返し"], //: 繰り返しの練習
    ["夏休み", "https://atcoder.jp/contests/abc163/tasks/abc163_b", ""], //
    ["ジェットコースター", "https://atcoder.jp/contests/abc142/tasks/abc142_b", "フィルタ"],
    ["本の読み方", "https://atcoder.jp/contests/abc168/tasks/abc168_a", "リスト化"],
    ["踏み台", "https://atcoder.jp/contests/abc176/tasks/abc176_c", ""], //
    ["禁止されたリスト", "https://atcoder.jp/contests/abc170/tasks/abc170_c", ""], //
    ["分割", "https://atcoder.jp/contests/joi2021yo1b/tasks/joi2021_yo1b_c", "スライス"], //
    ["比較", "https://atcoder.jp/contests/joi2021yo1c/tasks/joi2021_yo1c_c", "２重ループ"],
    ["重複の除去", "https://atcoder.jp/contests/abc191/tasks/abc191_b", ""], //
    ["おつり", "https://atcoder.jp/contests/joi2008yo/tasks/joi2008yo_a", ""], // ヒント: 硬貨の種類を`coins = [500, 100, 50, 10, 5, 1]`とリスト化する
    ["最長昇順連続部分列", "https://atcoder.jp/contests/joi2020yo1c/tasks/joi2020_yo1c_c", ""], //
    ["二乗誤差", "https://atcoder.jp/contests/abc194/tasks/abc194_c", "２重ループ TLE注意"], //: 
    //文字列
    ["文字列の連結", "https://atcoder.jp/contests/abc149/tasks/abc149_a", ""], //
    ["クリスマスイブ", "https://atcoder.jp/contests/abc115/tasks/abc115_a", ""],
    ["アルファベット", "https://atcoder.jp/contests/abc171/tasks/abc171_a", "文字の種類"], //: 英大文字か英小文字の判定
    ["９月９日", "https://atcoder.jp/contests/abc073/tasks/abc073_a", ""], //
    ["天気予報", "https://atcoder.jp/contests/abc139/tasks/abc139_a", ""], //
    ["セキュリティコード", "https://atcoder.jp/contests/abc131/tasks/abc131_a", ""], //: 入力しやすい
    ["Coffee", "https://atcoder.jp/contests/abc160/tasks/abc160_a", ""], //
    ["文字列の比較", "https://atcoder.jp/contests/abc152/tasks/abc152_b", ""], //
    ["文字の置き換え", "https://atcoder.jp/contests/abc154/tasks/abc154_b", ""], //
    ["文字列の置き換え", "https://atcoder.jp/contests/abc111/tasks/abc111_a", ""], //: ちょっと工夫してください
    ["シーザー暗号", "https://atcoder.jp/contests/joi2007yo/tasks/joi2007yo_c", ""], //
    ["ROT N", "https://atcoder.jp/contests/abc146/tasks/abc146_b", "シーザー暗号"], //: これも
    ["しりとり", "https://atcoder.jp/contests/abc060/tasks/abc060_a", "文字列リスト"], //
    ["エコー", "https://atcoder.jp/contests/abc145/tasks/abc145_b", "部分文字列"], //: の練習です
    ["ドットドットドット", "https://atcoder.jp/contests/abc168/tasks/abc168_b", ""], //: 実用的な文字列処理
    ["奇数文字目", "https://atcoder.jp/contests/abc072/tasks/abc072_b", "スライス"], //: スライスでもできます
    ["クイズ", "https://atcoder.jp/contests/abc184/tasks/abc184_b", "文字列データ"], //
    //関数
    ["ReLU", "https://atcoder.jp/contests/abc183/tasks/abc183_a", ""], //
    ["$a+a^2+a^3$", "https://atcoder.jp/contests/abc172/tasks/abc172_a", ""], //: 関数定義しましょう！
    ["エレベータ", "https://atcoder.jp/contests/past202004-open/tasks/past202004_a", ""], //
    ["大きい数字", "https://atcoder.jp/contests/abc187/tasks/abc187_a", ""], //
    ["とある総和", "https://atcoder.jp/contests/abc083/tasks/abc083_b", ""], //
    ["回文数", "https://atcoder.jp/contests/abc090/tasks/abc090_b", ""], //
    ["K進数", "https://atcoder.jp/contests/abc156/tasks/abc156_b", ""], //: 文字列問題か？
    ["ほぼGCD", "https://atcoder.jp/contests/abc182/tasks/abc182_b", ""], //
    ["FizzBuzzの和", "https://atcoder.jp/contests/abc162/tasks/abc162_b", ""], //: 有名なFizzBuzz問題のバリエーション
    ["入国審査", "https://atcoder.jp/contests/abc155/tasks/abc155_b", ""], //
    ["ビンゴ", "https://atcoder.jp/contests/abc157/tasks/abc157_b", ""], //: ビンゴを判定する関数定義しましょう
    ["文字列圧縮", "https://atcoder.jp/contests/abc019/tasks/abc019_2", "ランレングス圧縮"], //: ランレングス圧縮を関数化します。
    ["スマホ中毒", "https://atcoder.jp/contests/abc185/tasks/abc185_b", ""], //
    //    ["列車のチケット", "https://atcoder.jp/contests/abc079/tasks/abc079_c", ""], //
    ["ラリー", "https://atcoder.jp/contests/abc156/tasks/abc156_c", ""], //
    ["グリッド圧縮", "https://atcoder.jp/contests/abc107/tasks/abc107_b", ""], //
    ["７５５", "https://atcoder.jp/contests/abc114/tasks/abc114_c", "再帰関数"], // を使います
    // TIPS
    ["リンリンリン", "https://atcoder.jp/contests/abc066/tasks/abc066_a", ""], //
    ["超能力", "https://atcoder.jp/contests/abc148/tasks/abc148_a", ""], //
    ["デジタルギフト", "https://atcoder.jp/contests/abc119/tasks/abc119_b", ""], //
    ["天気予報", "https://atcoder.jp/contests/abc141/tasks/abc141_a", ""], //
    ["飛行機", "https://atcoder.jp/contests/abc129/tasks/abc129_a", ""], //
    ["仕事の割り当て", "https://atcoder.jp/contests/abc194/tasks/abc194_b", ""], //
    ["ガチャ", "https://atcoder.jp/contests/abc164/tasks/abc164_c", "集合(set)"], //: ヒント `set(", ""], //`
    ["９の倍数", "https://atcoder.jp/contests/abc176/tasks/abc176_b", ""], //
    ["共通要素", "https://atcoder.jp/contests/joi2021yo1a/tasks/joi2021_yo1a_c", ""],//
    ["グリッドのブロック", "https://atcoder.jp/contests/abc186/tasks/abc186_b", ""], //
    ["線形プログラミング", "https://atcoder.jp/contests/abc167/tasks/abc167_b", ""], //
    ["体積の最大値", "https://atcoder.jp/contests/abc159/tasks/abc159_c", ""], //
    ["ミックスジュース", "https://atcoder.jp/contests/abc171/tasks/abc171_b", ""], //
    ["二つのスイッチ", "https://atcoder.jp/contests/abc070/tasks/abc070_b", "区間の重なり"], //：を求める
    ["リーダーの選び方", "https://atcoder.jp/contests/abc098/tasks/arc098_a", "累積和"], //: の問題
    // アルゴリズム
    ["81", "https://atcoder.jp/contests/abc144/tasks/abc144_b", ""], //
    ["ケーキとドーナッツ", "https://atcoder.jp/contests/abc105/tasks/abc105_b", ""], //
    ["コイン", "https://atcoder.jp/contests/abc087/tasks/abc087_b", ""], //
    ["穏やかなペア", "https://atcoder.jp/contests/abc187/tasks/abc187_b", ""], //: 組(タプル", ""], //を使いましょう
    ["三角形を作る", "https://atcoder.jp/contests/abc175/tasks/abc175_b", ""], //
    ["部分文字列", "https://atcoder.jp/contests/abc177/tasks/abc177_b", "全探索"],
    ["ゾロ目", "https://atcoder.jp/contests/arc046/tasks/arc046_a", "全探索"],
    ["ゴルフ大好き", "https://atcoder.jp/contests/abc165/tasks/abc165_a", "全探索"],
    ["お年玉", "https://atcoder.jp/contests/abc085/tasks/abc085_c", ""], //: 探索範囲を狭める工夫が必要
    ["高橋君の情報", "https://atcoder.jp/contests/abc088/tasks/abc088_c", ""], //: 難しめ
    ["A x B + C", "https://atcoder.jp/contests/abc179/tasks/abc179_c", ""], //
    ["アンラッキーな7", "https://atcoder.jp/contests/abc186/tasks/abc186_c", ""], //
    ["論理式", "https://atcoder.jp/contests/abc189/tasks/abc189_d", ""], //
    ["8の倍数", "https://atcoder.jp/contests/abc181/tasks/abc181_d", ""], //
    ["整数屋さん", "https://atcoder.jp/contests/abc146/tasks/abc146_c", "二分探索"], //: 二分探索
    // 整数問題
    ["トレーニング", "https://atcoder.jp/contests/abc055/tasks/abc055_b", ""], //: モジュロの問題
    ["105", "https://atcoder.jp/contests/abc106/tasks/abc106_b", ""], // N が小さいので安心してください
    ["整数の選択", "https://atcoder.jp/contests/abc060/tasks/abc060_b", ""], //
    ["aとbの間", "https://atcoder.jp/contests/abc048/tasks/abc048_b", ""], //
    ["シュークリーム", "https://atcoder.jp/contests/abc180/tasks/abc180_c", ""], //
    ["完全数", "https://atcoder.jp/contests/arc026/tasks/arc026_2", ""], //
    ["次の素数", "https://atcoder.jp/contests/abc149/tasks/abc149_c", ""], //
    ["スナック", "https://atcoder.jp/contests/abc148/tasks/abc148_c", ""], //
    ["ボールの色塗り", "https://atcoder.jp/contests/abc046/tasks/abc046_b", ""], //
    ["黒板上の最大公約数", "https://atcoder.jp/contests/abc125/tasks/abc125_c", ""], //
    ["$a^b$", "https://atcoder.jp/contests/abc193/tasks/abc193_c", ""], //
    ["互いに素", "https://atcoder.jp/contests/abc154/tasks/abc154_c", ""], //
    ["モンスター", "https://atcoder.jp/contests/abc118/tasks/abc118_c", ""], //
    ["2019", "https://atcoder.jp/contests/abc164/tasks/abc164_d", ""], //
    ["2017-like Number", "https://atcoder.jp/contests/abc084/tasks/abc084_d", ""], //: エラトステネスの篩
    ["gcd(a,b,c)の和", "https://atcoder.jp/contests/abc162/tasks/abc162_c", ""], //
    //ソート
    ["ABCスワップ", "https://atcoder.jp/contests/abc161/tasks/abc161_a", ""], //: ボーナス！
    ["２番目に大きい整数", "https://atcoder.jp/contests/joi2021yo1a/tasks/joi2021_yo1a_a", ""], //
    ["abc", "https://atcoder.jp/contests/abc093/tasks/abc093_a", ""], //: 文字ソート
    ["背の順", "https://atcoder.jp/contests/abc041/tasks/abc041_c", ""], //
    ["タスクスケジュール", "https://atcoder.jp/contests/abc103/tasks/abc103_a", ""], //
    ["最頻値", "https://atcoder.jp/contests/joi2020yo1b/tasks/joi2020_yo1b_c", ""], //: 統計処理の定番
    ["マージ", "https://atcoder.jp/contests/joi2020yo1a/tasks/joi2020_yo1a_c", ""], //: マージソートを思い出して
    ["最大距離", "https://atcoder.jp/contests/abc102/tasks/abc102_b", ""], //
    ["ヘビのおもちゃ", "https://atcoder.jp/contests/abc067/tasks/abc067_b", ""], //
    ["キャンディの配布", "https://atcoder.jp/contests/agc027/tasks/agc027_a", ""], //: ソートして配ります
    ["ガイドブック", "https://atcoder.jp/contests/abc128/tasks/abc128_b", ""], //
    ["多角形", "https://atcoder.jp/contests/abc117/tasks/abc117_b", ""], //: ソートしてみますか？
    ["二分探索", "https://atcoder.jp/contests/typical-algorithm/tasks/typical_algorithm_a", ""], //: ソートの応用
    ["整数屋さん", "https://atcoder.jp/contests/abc146/tasks/abc146_c", ""], //: 二分探索
    ["最大の和", "https://atcoder.jp/contests/joi2007ho/tasks/joi2007ho_a", ""], //: 問題文は読みにくいけど、良問
    // 辞書
    ["塩基対", "https://atcoder.jp/contests/abc122/tasks/abc122_a", ""], //: 辞書で解いて見ましょう
    ["投票", "https://atcoder.jp/contests/abc008/tasks/abc008_2", ""], //
    ["鏡餅", "https://atcoder.jp/contests/abc085/tasks/abc085_b", ""], //
    ["Not Found", "https://atcoder.jp/contests/abc071/tasks/abc071_b", ""], //
    ["多数決", "https://atcoder.jp/contests/past202004-open/tasks/past202004_b", ""], //: 辞書を使いましょう
    ["怪文書", "https://atcoder.jp/contests/abc058/tasks/arc071_a", ""], //
    ["K種類以下のボール", "https://atcoder.jp/contests/abc081/tasks/arc086_a", ""], //
    // DP
    ["リュカ数", "https://atcoder.jp/contests/abc079/tasks/abc079_b", ""], // フィボナッチの変形か？
    ["壊れた階段", "https://atcoder.jp/contests/abc129/tasks/abc129_c", ""], //
    ["柱", "https://atcoder.jp/contests/abc040/tasks/abc040_c", ""], //
    ["かえる２", "https://atcoder.jp/contests/dp/tasks/dp_b", ""], //: 腕試しのかえる
    ["キャンディー", "https://atcoder.jp/contests/arc090/tasks/arc090_a", ""], //: グリッドDP
    ["意地悪な銀行", "https://atcoder.jp/contests/abc099/tasks/abc099_c", ""], //
    ["バーケーション", "https://atcoder.jp/contests/dp/tasks/dp_c", ""], //
    ["ナップサック", "https://atcoder.jp/contests/dp/tasks/dp_d", ""], //: 定番の問題登場！
    ["ナップサック複数版", "https://atcoder.jp/contests/dp/tasks/dp_e", ""], //
    ["１年生", "https://atcoder.jp/contests/joi2011yo/tasks/joi2011yo_d", ""], //
    ["パスタ", "https://atcoder.jp/contests/joi2012yo/tasks/joi2012yo_d", ""], //
    ["暑い日々", "https://atcoder.jp/contests/joi2013yo/tasks/joi2013yo_d", ""], //
    ["コインと確率", "https://atcoder.jp/contests/dp/tasks/dp_i", ""], //
    ["再分配", "https://atcoder.jp/contests/abc178/tasks/abc178_d", ""], //: 簡単なDPと思われるがいかが？
    ["るんるん数", "https://atcoder.jp/contests/abc161/tasks/abc161_d", ""], // 簡単なDPと思われるがいかが？
    // グラフ
    ["積読", "https://atcoder.jp/contests/abc172/tasks/abc172_c", ""], //: 探索問題の感じ
    ["深さ優先探索", "https://atcoder.jp/contests/atc001/tasks/dfs_a", ""], //
    ["幅優先探索", "https://atcoder.jp/contests/atc002/tasks/abc007_3", ""], //
    ["列車のチケット", "https://atcoder.jp/contests/abc079/tasks/abc079_c", ""], //: bit探索
    ["ワープ魔法", "https://atcoder.jp/contests/abc176/tasks/abc176_d", ""], //: 変形探索問題
    ["区間スケジューリング", "https://atcoder.jp/contests/typical-algorithm/tasks/typical_algorithm_b", ""], //
    ["巡回セールスマン", "https://atcoder.jp/contests/typical-algorithm/tasks/typical_algorithm_c", ""], //
    ["単一始点最短経路問題", "https://atcoder.jp/contests/typical-algorithm/tasks/typical_algorithm_d", ""], //
    ["全点対最短経路問題", "https://atcoder.jp/contests/typical-algorithm/tasks/typical_algorithm_e", ""], //
    // ABC
    ["二乗の不等式", "https://atcoder.jp/contests/abc199/tasks/abc199_a", "新着ABC"], //
    ["共通部分", "https://atcoder.jp/contests/abc199/tasks/abc199_b", "新着ABC"], //
    ["IPFL", "https://atcoder.jp/contests/abc199/tasks/abc199_c", "新着ABC"], //
    ["世紀", "https://atcoder.jp/contests/abc200/tasks/abc200_a", "新着ABC"], //
    ["200回記念", "https://atcoder.jp/contests/abc200/tasks/abc200_b", "新着ABC"], //
    ["りんごの好きな数", "https://atcoder.jp/contests/abc200/tasks/abc200_c", "新着ABC"], //
    ["小さな算術列", "https://atcoder.jp/contests/abc201/tasks/abc201_a", "新着ABC"], //
    ["２番目に高い山", "https://atcoder.jp/contests/abc201/tasks/abc201_b", "新着ABC"], //
    ["暗証番号", "https://atcoder.jp/contests/abc201/tasks/abc201_c", "新着ABC"], //
    ["サイコロ３つ", "https://atcoder.jp/contests/abc202/tasks/abc202_a", "新着ABC"], //
    ["180°", "https://atcoder.jp/contests/abc202/tasks/abc202_b", "新着ABC"], //
    ["Made Up", "https://atcoder.jp/contests/abc202/tasks/abc202_c", "新着ABC"], //
    ["ちんちろりん", "https://atcoder.jp/contests/abc203/tasks/abc203_a", "新着ABC"], //
    ["AtCoder マンション", "https://atcoder.jp/contests/abc203/tasks/abc203_b", "新着ABC"], //
    ["友達と移動コスト", "https://atcoder.jp/contests/abc203/tasks/abc203_c", "新着ABC"], //
    ["じゃんけん", "https://atcoder.jp/contests/abc204/tasks/abc204_a", "新着ABC"], //
    ["木の実", "https://atcoder.jp/contests/abc204/tasks/abc204_b", "新着ABC 良問"], //
    ["ツアー", "https://atcoder.jp/contests/abc204/tasks/abc204_c", "新着ABC DFS"], //
    ["kcal", "https://atcoder.jp/contests/abc205/tasks/abc205_a", "新着ABC"], //
    ["順列チェック", "https://atcoder.jp/contests/abc205/tasks/abc205_b", "新着ABC"], //
    ["POW？", "https://atcoder.jp/contests/abc205/tasks/abc205_c", "新着ABC"], //
]

window.onload = function () {
    // GET を表に反映
    const query = GetQueryString();
    if (query["uid"]) {
        atcoder_id.value = query["uid"];
    }

    // 問題一覧を表示
    var cells = {
    }

    function tail(ss) {
        return ss[ss.length - 1];
    }

    function count(d, key, n) {
        if (key in d) {
            d[key] += n;
        }
        else {
            d[key] = n;
        }
    }

    for (var i = 0; i < problems.length; i++) {
        if (problems[i].length == 1) continue;
        var problem_id = tail(problems[i][1].split('/'));
        var tr = problem_tbody.insertRow(-1);
        var th = document.createElement("th");
        th.innerHTML = `${i + 1}`;
        th.scope = "row";
        tr.appendChild(th);
        //console.log(problem_id);
        var td1 = tr.insertCell(-1);
        td1.innerHTML = '<a href="' + problems[i][1] + '" target="_blank">' + problems[i][0] + '</a>' + ` (${problem_id})`;
        var td2 = tr.insertCell(-1);

        td2.innerHTML = problems[i][2];

        var td3 = tr.insertCell(-1);
        cells[problem_id] = td3;
    }

    // 提出状況を表示
    if (atcoder_id.value !== '') {
        const uid = atcoder_id.value
        var url = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + uid;
        fetch(url).then(function (response) {
            response.text().then(function (text) {
                //console.log(text);
                const data = JSON.parse(text);
                var AC = 0, AC2=0;
                var score = {};
                var epoch = [];
                for (var i = 0; i < data.length; i += 1) {
                    var problem_id = data[i].problem_id;
                    if (data[i].epoch_second > 1614556800) {
                        epoch.push(data[i].epoch_second);
                    }
                    //https://atcoder.jp/contests/abc029/submissions/21458111
                    if (problem_id in cells) {
                        var contest_id = data[i].contest_id;
                        var url = `https://atcoder.jp/contests/${contest_id}/submissions/${data[i].id}`
                        var s = '';
                        if (data[i].result == 'AC') {
                            s = `<span class="label-ac">AC</span>`;
                            if (!(problem_id in score)) {
                                AC += 1;
                            }
                            count(score, problem_id, 1);
                        }
                        else {
                            s = '<span class="label-wa">' + data[i].result + '</span>';
                        }
                        cells[problem_id].innerHTML += `<a href="${url}" target="_blank">${s}</a> `;
                    }
                    else {
                        if (data[i].result == 'AC') {
                            if (!(problem_id in score)) {
                                AC2 += 1;
                            }
                            count(score, problem_id, 1);
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
                element.innerHTML = `<span class="label-ac">正解数</span> ${AC} 番外 ${AC2} <span class="label-wa">時間(おおよそ)</span> ${time}`
            });
        });
    }
}


