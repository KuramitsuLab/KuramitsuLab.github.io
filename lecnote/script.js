// GET のデータを配列にして返す
function GetQueryString(){
    var result = {};
    if (1 < window.location.search.length) {
        var query = window.location.search.substring(1);
        var parameters = query.split('&');
        for (var i=0; i<parameters.length; i++){
            var element = parameters[i].split('=');
            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);
            result[paramName] = paramValue;
        }
    }
    return result;
}

problems = [
    ["複数形","https://atcoder.jp/contests/abc029/tasks/abc029_a", "初級 文字列"],
    ["円", "https://atcoder.jp/contests/abc145/tasks/abc145_a", "初級 整数変換"], //: 数値に変換しわすれないで
    ["直方体", "https://atcoder.jp/contests/abc041/tasks/abc041_b", "入出力"], //: 頻出入出力を参考に。
    ["３つのうち一つ", "https://atcoder.jp/contests/abc075/tasks/abc075_a", "条件分岐"], //: if文を覚えていますか？
    ["水の移動", "https://atcoder.jp/contests/abc136/tasks/abc136_a", "落ち着く"], //: 落ち着いて考えてみよう
    ["三桁の回文数", "https://atcoder.jp/contests/abc070/tasks/abc070_a", "初級 文字列"], //: 文字列を覚えていますか？
    ["ラッキー7", "https://atcoder.jp/contests/abc162/tasks/abc162_a", "初級 文字列"], //: 文字列を覚えていますか
    ["星集め", "https://atcoder.jp/contests/abc192/tasks/abc192_a", "シミュレーション"], //: シミュレーションでも解けます
    ["差分の和", "https://atcoder.jp/contests/abc186/tasks/abc186_d", "腕試し ループ"], //: 今、この問題が解けるなら、この講義は楽勝です。（解けなくても気にしないで）
    ["かえる", "https://atcoder.jp/contests/dp/tasks/dp_a", "腕試し DP"], //
    ["Apple Pie", "https://atcoder.jp/contests/abc128/tasks/abc128_a", ""], //
    ["ディスカウント", "https://atcoder.jp/contests/abc193/tasks/abc193_a", ""], //
    ["両面印刷", "https://atcoder.jp/contests/abc157/tasks/abc157_a", "余りの切り上げ"], 
    ["平均値の切り上げ", "https://atcoder.jp/contests/abc082/tasks/abc082_a", ""], //
    ["コンテストの開始時刻", "https://atcoder.jp/contests/abc057/tasks/abc057_a", ""], //
    ["スイーツ！", "https://atcoder.jp/contests/abc087/tasks/abc087_a", ""], //
    ["３つの最大値", "https://atcoder.jp/contests/abc137/tasks/abc137_a", ""], //
    ["合計時間", "https://atcoder.jp/contests/joi2011yo/tasks/joi2011yo_a", ""], //
    ["Product Max", "https://atcoder.jp/contests/abc178/tasks/abc178_b", ""], //: 
    ["ビリヤード", "https://atcoder.jp/contests/abc183/tasks/abc183_b", ""], //
    ["秒針", "https://atcoder.jp/contests/abc168/tasks/abc168_c", "三角関数"], //
    ["二つの数の間", "https://atcoder.jp/contests/abc061/tasks/abc061_a", ""], //
    ["ブラックジャック", "https://atcoder.jp/contests/abc147/tasks/abc147_a", ""], //
    ["七五三", "https://atcoder.jp/contests/abc114/tasks/abc114_a", ""], //
    ["かわいそう", "https://atcoder.jp/contests/abc155/tasks/abc155_a", ""], //
    ["猫と犬", "https://atcoder.jp/contests/abc094/tasks/abc094_a", ""], //
    ["電源プラグ", "https://atcoder.jp/contests/abc139/tasks/abc139_b", ""], //
    ["預金", "https://atcoder.jp/contests/abc165/tasks/abc165_b", "シミュレーション"], 
    ["消費税", "https://atcoder.jp/contests/abc158/tasks/abc158_c", ""], //
    ["金色の効果", "https://atcoder.jp/contests/abc160/tasks/abc160_b", ""], //
    ["３つの整数", "https://atcoder.jp/contests/joi2020yo1a/tasks/joi2020_yo1a_a", ""], //
    ["成績", "https://atcoder.jp/contests/joi2020yo1b/tasks/joi2020_yo1b_a", ""], //
    ["Xに最も近い値", "https://atcoder.jp/contests/joi2020yo1c/tasks/joi2020_yo1c_a", ""], //
    ["鉛筆", "https://atcoder.jp/contests/joi2018yo/tasks/joi2018_yo_a", ""], //
    ["ソーシャルゲーム", "https://atcoder.jp/contests/joi2019yo/tasks/joi2019_yo_a", ""], //
    ["平均点", "https://atcoder.jp/contests/joi2014yo/tasks/joi2014yo_a", ""], //: リストを使わなくても解けるけど、リストを使ってみよう
    ["５つの変数", "https://atcoder.jp/contests/abc170/tasks/abc170_a", ""], //: もちろんリストを使います
    ["酔っ払い", "https://atcoder.jp/contests/abc189/tasks/abc189_b", "繰り返し"], //: 繰り返しの練習
    ["夏休み", "https://atcoder.jp/contests/abc163/tasks/abc163_b", ""], //
    ["ジェットコースター", "https://atcoder.jp/contests/abc142/tasks/abc142_b", "フィルタ"], 
    ["本の読み方", "https://atcoder.jp/contests/abc168/tasks/abc168_a", "リスト化"], 
    ["重複の除去", "https://atcoder.jp/contests/abc191/tasks/abc191_b", ""], //
    ["踏み台", "https://atcoder.jp/contests/abc176/tasks/abc176_c", ""], //
    ["禁止されたリスト", "https://atcoder.jp/contests/abc170/tasks/abc170_c", ""], //
    ["おつり", "https://atcoder.jp/contests/joi2008yo/tasks/joi2008yo_a", ""], // ヒント: 硬貨の種類を`coins = [500, 100, 50, 10, 5, 1]`とリスト化する
    ["最長昇順連続部分列", "https://atcoder.jp/contests/joi2020yo1c/tasks/joi2020_yo1c_c", ""], //
    ["二乗誤差", "https://atcoder.jp/contests/abc194/tasks/abc194_c", "２重ループ TLE注意"], //: 
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
    ["ReLU", "https://atcoder.jp/contests/abc183/tasks/abc183_a", ""], //
    ["$a+a^2+a^3$", "https://atcoder.jp/contests/abc172/tasks/abc172_a", ""], //: 関数定義しましょう！
    ["行列式", "https://atcoder.jp/contests/abc184/tasks/abc184_a", ""], //
    ["大きい数字", "https://atcoder.jp/contests/abc187/tasks/abc187_a", ""], //
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
    ["超能力", "https://atcoder.jp/contests/abc148/tasks/abc148_a", ""], //
    ["とっても簡単なゲーム", "https://atcoder.jp/contests/abc190/tasks/abc190_a", ""], //
    ["仕事の割り当て", "https://atcoder.jp/contests/abc194/tasks/abc194_b", ""], //
    ["ガチャ", "https://atcoder.jp/contests/abc164/tasks/abc164_c", "集合(set)"], //: ヒント `set(", ""], //`
    ["９の倍数", "https://atcoder.jp/contests/abc176/tasks/abc176_b", ""], //
    ["グリッドのブロック", "https://atcoder.jp/contests/abc186/tasks/abc186_b", ""], //
    ["線形プログラミング", "https://atcoder.jp/contests/abc167/tasks/abc167_b", ""], //
    ["体積の最大値", "https://atcoder.jp/contests/abc159/tasks/abc159_c", ""], //
    ["カーテン", "https://atcoder.jp/contests/abc143/tasks/abc143_a", ""], //
    ["飛行機", "https://atcoder.jp/contests/abc129/tasks/abc129_a", ""], //
    ["リンリンリン", "https://atcoder.jp/contests/abc066/tasks/abc066_a", ""], //
    ["abc", "https://atcoder.jp/contests/abc093/tasks/abc093_a", ""], //
    ["天気予報", "https://atcoder.jp/contests/abc141/tasks/abc141_a", ""], //
    ["休みが待てない", "https://atcoder.jp/contests/abc141/tasks/abc141_a", ""], //
    ["フィフティフィフティ", "https://atcoder.jp/contests/abc132/tasks/abc132_a", ""], //
    ["多角形", "https://atcoder.jp/contests/abc117/tasks/abc117_b", ""], //
    ["ミックスジュース", "https://atcoder.jp/contests/abc171/tasks/abc171_b", ""], //
    ["二つのスイッチ", "https://atcoder.jp/contests/abc070/tasks/abc070_b", "区間の重なり"], //：を求める
    ["リーダーの選び方", "https://atcoder.jp/contests/abc098/tasks/arc098_a", "累積和"], //: の問題
    ["列車のチケット", "https://atcoder.jp/contests/abc079/tasks/abc079_c", "bit探索"], //: 
    ["A x B + C", "https://atcoder.jp/contests/abc179/tasks/abc179_c", ""], //
    ["Gentle Pairs", "https://atcoder.jp/contests/abc187/tasks/abc187_b", ""], //: 組(タプル", ""], //を使いましょう
    ["アンラッキーな7", "https://atcoder.jp/contests/abc186/tasks/abc186_c", ""], //
    ["81", "https://atcoder.jp/contests/abc144/tasks/abc144_b", ""], //
    ["ケーキとドーナッツ", "https://atcoder.jp/contests/abc105/tasks/abc105_b", ""], //
    ["コイン", "https://atcoder.jp/contests/abc087/tasks/abc087_b", ""], //
    ["三角形を作る", "https://atcoder.jp/contests/abc175/tasks/abc175_b", ""], //
    ["お年玉", "https://atcoder.jp/contests/abc085/tasks/abc085_c", ""], //: 探索範囲を狭める工夫が必要
    ["高橋君の情報", "https://atcoder.jp/contests/abc088/tasks/abc088_c", ""], //: 難しめ
    ["論理式", "https://atcoder.jp/contests/abc189/tasks/abc189_d", ""], //
    ["8の倍数", "https://atcoder.jp/contests/abc181/tasks/abc181_d", ""], //
    ["部分文字列", "https://atcoder.jp/contests/abc177/tasks/abc177_b", ""], //https://atcoder.jp/contests/abc177/editorial
    ["とある総和", "https://atcoder.jp/contests/abc083/tasks/abc083_b", ""], //
    ["回文数", "https://atcoder.jp/contests/abc090/tasks/abc090_b", ""], //
    ["K進数", "https://atcoder.jp/contests/abc156/tasks/abc156_b", ""], //: 文字列問題か？

    ["整数屋さん", "https://atcoder.jp/contests/abc146/tasks/abc146_c", "二分探索"], //: 二分探索
    ["Remider Reminder", "https://atcoder.jp/contests/abc090/tasks/arc091_b", ""], //: 工夫しないとTLE
    ["トレーニング", "https://atcoder.jp/contests/abc055/tasks/abc055_b", ""], //: モジュロの問題
    ["105", "https://atcoder.jp/contests/abc106/tasks/abc106_b", ""], // N が小さいので安心してください
    ["シュークリーム", "https://atcoder.jp/contests/abc180/tasks/abc180_c", ""], //
    ["完全数", "https://atcoder.jp/contests/arc026/tasks/arc026_2", ""], //
    ["次の素数", "https://atcoder.jp/contests/abc149/tasks/abc149_c", ""], //
    ["モンスター", "https://atcoder.jp/contests/abc118/tasks/abc118_c", ""], //
    ["スナック", "https://atcoder.jp/contests/abc148/tasks/abc148_c", ""], //
    ["整数の選択", "https://atcoder.jp/contests/abc060/tasks/abc060_b", ""], //
    ["黒板上の最大公約数", "https://atcoder.jp/contests/abc125/tasks/abc125_c", ""], //
    ["隣接の4", "https://atcoder.jp/contests/abc069/tasks/arc080_a", ""], //
    ["Digits in Multiplication", "https://atcoder.jp/contests/abc057/tasks/abc057_c", ""], //
    ["$a^b$", "https://atcoder.jp/contests/abc193/tasks/abc193_c", ""], //
    ["互いに素", "https://atcoder.jp/contests/abc154/tasks/abc154_c", ""], //
    ["2019", "https://atcoder.jp/contests/abc164/tasks/abc164_d", ""], //
    ["2017-like Number", "https://atcoder.jp/contests/abc084/tasks/abc084_d", "エラトステネスの篩"], //: エラトステネスの篩
    ["ボールの色塗り", "https://atcoder.jp/contests/abc046/tasks/abc046_b", ""], //
    ["aとbの間", "https://atcoder.jp/contests/abc048/tasks/abc048_b", ""], //
    ["gcd(a,b,c)の和", "https://atcoder.jp/contests/abc162/tasks/abc162_c", ""], //
    ["Count Order", "https://atcoder.jp/contests/abc150/tasks/abc150_c", "順列全列挙"], //: 順列全列挙`itertools.itertools.permutations`
    ["ABCスワップ", "https://atcoder.jp/contests/abc161/tasks/abc161_a", ""], //: ボーナス！
    ["タスクスケジュール", "https://atcoder.jp/contests/abc103/tasks/abc103_a", ""], //
    ["最大距離", "https://atcoder.jp/contests/abc102/tasks/abc102_b", ""], //
    ["ヘビのおもちゃ", "https://atcoder.jp/contests/abc067/tasks/abc067_b", ""], //
    ["キャンディの配布", "https://atcoder.jp/contests/agc027/tasks/agc027_a", ""], //: ソートして配ります
    ["ガイドブック", "https://atcoder.jp/contests/abc128/tasks/abc128_b", ""], //
    ["塩基対", "https://atcoder.jp/contests/abc122/tasks/abc122_a", ""], //: 辞書で解いて見ましょう
    ["鏡餅", "https://atcoder.jp/contests/abc085/tasks/abc085_b", ""], //
    ["Not Found", "https://atcoder.jp/contests/abc071/tasks/abc071_b", ""], //
    ["K種類以下のボール", "https://atcoder.jp/contests/abc081/tasks/arc086_a", ""], //
    ["リュカ数", "https://atcoder.jp/contests/abc079/tasks/abc079_b", ""], // フィボナッチの変形か？
    ["再分配", "https://atcoder.jp/contests/abc178/tasks/abc178_d", ""], //: 簡単なDPと思われる
    ["るんるん数", "https://atcoder.jp/contests/abc161/tasks/abc161_d", ""], // 簡単なDPと思われるがいかが？
    ["ナップサック問題", "https://atcoder.jp/contests/abc032/tasks/abc032_d", "典型問題"], //
    ["積読", "https://atcoder.jp/contests/abc172/tasks/abc172_c", ""], //: 探索問題の感じ
    ["ワープ魔法", "https://atcoder.jp/contests/abc176/tasks/abc176_d", ""], //: 変形探索問題？
    ["深さ優先探索", "https://atcoder.jp/contests/atc001/tasks/dfs_a", ""], //
]

window.onload = function () {
    // GET を表に反映
    const query = GetQueryString();
    if(query["uid"]) {
        atcoder_id.value = query["uid"];
    }

    // 問題一覧を表示
    var cells = {
    }

    function tail(ss) {
        return ss[ss.length-1];
    }
    
    for (var i=0; i<problems.length; i++) {
        if(problems[i].length == 1) continue;
        var problem_id = tail(problems[i][1].split('/'));
        var tr = problem_tbody.insertRow(-1);
        var th = document.createElement("th");
        th.innerHTML = `${i+1}`;
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
        fetch(url).then(function(response) {
            response.text().then(function(text) {
                //console.log(text);
                const data = JSON.parse(text);
                for(var i = 0; i < data.length; i+=1) {
                    var problem_id = data[i].problem_id;
                    //https://atcoder.jp/contests/abc029/submissions/21458111
                    if (problem_id in cells) {
                        var contest_id = data[i].contest_id;
                        var url = `https://atcoder.jp/contests/${contest_id}/submissions/${data[i].id}`
                        var s = '';
                        if (data[i].result == 'AC') {
                            s = `<span class="label-ac">AC</span>`;
                        }
                        else {
                            s = '<span class="label-wa">' + data[i].result + '</span>';
                        }
                        cells[problem_id].innerHTML += `<a href="${url}" target="_blank">${s}</a> `;
                    }
                }
            });
        });
    }
}


