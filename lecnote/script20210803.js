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
    ["複数形", "https://atcoder.jp/contests/abc029/tasks/abc029_a", "初級 文字列"],
    ["行列式", "https://atcoder.jp/contests/abc184/tasks/abc184_a", ""],
    ["直方体", "https://atcoder.jp/contests/abc041/tasks/abc041_b", "入出力"], //: 頻出入出力を参考に。
    ["ディスカウント", "https://atcoder.jp/contests/abc193/tasks/abc193_a", ""], //
    ["Apple Pie", "https://atcoder.jp/contests/abc128/tasks/abc128_a", ""], //
    ["二つの数の間", "https://atcoder.jp/contests/abc061/tasks/abc061_a", ""], //
    ["３つのうち一つ", "https://atcoder.jp/contests/abc075/tasks/abc075_a", "条件分岐"], //: if文を覚えていますか？
    ["水の移動", "https://atcoder.jp/contests/abc136/tasks/abc136_a", "落ち着いて考えよう"], //: 落ち着いて考えてみよう
    ["三桁の回文数", "https://atcoder.jp/contests/abc070/tasks/abc070_a", "初級 文字列"], //: 文字列を覚えていますか？
    ["ラッキー7", "https://atcoder.jp/contests/abc162/tasks/abc162_a", "初級 文字列"], //: 文字列を覚えていますか
    ["ブラックジャック", "https://atcoder.jp/contests/abc147/tasks/abc147_a", "条件分岐"], //
    ["平均値の切り上げ", "https://atcoder.jp/contests/abc082/tasks/abc082_a", ""], //
    ["円", "https://atcoder.jp/contests/abc145/tasks/abc145_a", "数値に変換"], //: 数値に変換しわすれないで
    ["合計時間", "https://atcoder.jp/contests/joi2011yo/tasks/joi2011yo_a", "情報オリンピック過去問"], //
    ["両面印刷", "https://atcoder.jp/contests/abc157/tasks/abc157_a", "切り上げ"],
    ["コンテストの開始時刻", "https://atcoder.jp/contests/abc057/tasks/abc057_a", ""], //
    ["３つの最大値", "https://atcoder.jp/contests/abc137/tasks/abc137_a", ""], //
    ["カーテン", "https://atcoder.jp/contests/abc143/tasks/abc143_a", ""],
    ["かわいそう", "https://atcoder.jp/contests/abc155/tasks/abc155_a", ""], //
    ["スイーツ！", "https://atcoder.jp/contests/abc087/tasks/abc087_a", ""], //
//    ["植木算", "https://atcoder.jp/contests/abc007/tasks/abc007_1", "最初の１問"],
    ["七五三", "https://atcoder.jp/contests/abc114/tasks/abc114_a", ""], //
    ["猫と犬", "https://atcoder.jp/contests/abc094/tasks/abc094_a", ""], //
    ["星集め", "https://atcoder.jp/contests/abc192/tasks/abc192_a", "シミュレーション"], //: シミュレーションでも解けます
    ["５つの変数", "https://atcoder.jp/contests/abc170/tasks/abc170_a", "リストを使おう"], //: もちろんリストを使います
    ["ReLU", "https://atcoder.jp/contests/abc183/tasks/abc183_a", ""], //

    ["文字列の連結", "https://atcoder.jp/contests/abc149/tasks/abc149_a", "文字列"], //
    ["９月９日", "https://atcoder.jp/contests/abc073/tasks/abc073_a", "文字列"], //
    ["$a+a^2+a^3$", "https://atcoder.jp/contests/abc172/tasks/abc172_a", ""], //: 関数定義しましょう！
    ["アルファベット", "https://atcoder.jp/contests/abc171/tasks/abc171_a", "文字の種類"], //: 英大文字か英小文字の判定

    ["平均点", "https://atcoder.jp/contests/joi2014yo/tasks/joi2014yo_a", "情報オリンピック過去問"], //: リストを使わなくても解けるけど、リストを使ってみよう
    ["３つの整数", "https://atcoder.jp/contests/joi2020yo1a/tasks/joi2020_yo1a_a", "情報オリンピック過去問"], //
    ["クリスマスイブ", "https://atcoder.jp/contests/abc115/tasks/abc115_a", ""],
    ["成績", "https://atcoder.jp/contests/joi2020yo1b/tasks/joi2020_yo1b_a", "情報オリンピック過去問"], //
    ["本の読み方", "https://atcoder.jp/contests/abc168/tasks/abc168_a", "リスト化"],
    ["天気予報", "https://atcoder.jp/contests/abc139/tasks/abc139_a", ""], //
    ["セキュリティコード", "https://atcoder.jp/contests/abc131/tasks/abc131_a", ""], //: 入力しやすい
    ["Coffee", "https://atcoder.jp/contests/abc160/tasks/abc160_a", ""], //
    ["Xに最も近い値", "https://atcoder.jp/contests/joi2020yo1c/tasks/joi2020_yo1c_a", "情報オリンピック過去問"], //
    ["金色の効果", "https://atcoder.jp/contests/abc160/tasks/abc160_b", ""], //
    ["Product Max", "https://atcoder.jp/contests/abc178/tasks/abc178_b", ""], //: 

    ["二乗の不等式", "https://atcoder.jp/contests/abc199/tasks/abc199_a", ""], //
    ["ちんちろりん", "https://atcoder.jp/contests/abc203/tasks/abc203_a", ""], //
    ["サイコロ３つ", "https://atcoder.jp/contests/abc202/tasks/abc202_a", ""], //
    ["世紀", "https://atcoder.jp/contests/abc200/tasks/abc200_a", ""], //
    ["じゃんけん", "https://atcoder.jp/contests/abc204/tasks/abc204_a", ""], //
    ["木の実", "https://atcoder.jp/contests/abc204/tasks/abc204_b", ""], //

    ["リンリンリン", "https://atcoder.jp/contests/abc066/tasks/abc066_a", ""], //
    ["超能力", "https://atcoder.jp/contests/abc148/tasks/abc148_a", ""], //
    ["大きい数字", "https://atcoder.jp/contests/abc187/tasks/abc187_a", ""], //
    ["飛行機", "https://atcoder.jp/contests/abc129/tasks/abc129_a", ""], //
    ["天気予報", "https://atcoder.jp/contests/abc141/tasks/abc141_a", ""], //
    ["鉛筆", "https://atcoder.jp/contests/joi2018yo/tasks/joi2018_yo_a", "情報オリンピック過去問"], //
    ["夏休み", "https://atcoder.jp/contests/abc163/tasks/abc163_b", ""], //
    ["しりとり", "https://atcoder.jp/contests/abc060/tasks/abc060_a", "文字列リスト"], //
    ["文字列の比較", "https://atcoder.jp/contests/abc152/tasks/abc152_b", "文字列"], //
    ["文字の置き換え", "https://atcoder.jp/contests/abc154/tasks/abc154_b", "文字列"], //
    ["電源プラグ", "https://atcoder.jp/contests/abc139/tasks/abc139_b", ""], //
    ["文字列の置き換え", "https://atcoder.jp/contests/abc111/tasks/abc111_a", ""], //: ちょっと工夫してください
    ["おつり", "https://atcoder.jp/contests/joi2008yo/tasks/joi2008yo_a", ""], // ヒント: 硬貨の種類を`coins = [500, 100, 50, 10, 5, 1]`とリスト化する
    ["ジェットコースター", "https://atcoder.jp/contests/abc142/tasks/abc142_b", "フィルタ"],
    ["エレベータ", "https://atcoder.jp/contests/past202004-open/tasks/past202004_a", ""], //
    ["預金", "https://atcoder.jp/contests/abc165/tasks/abc165_b", "*0.01と/100の違い"],
    ["ドットドットドット", "https://atcoder.jp/contests/abc168/tasks/abc168_b", ""], //: 実用的な文字列処理
    ["81", "https://atcoder.jp/contests/abc144/tasks/abc144_b", ""], //
    ["酔っ払い", "https://atcoder.jp/contests/abc189/tasks/abc189_b", "繰り返し"], //: 繰り返しの練習
    ["ソーシャルゲーム", "https://atcoder.jp/contests/joi2019yo/tasks/joi2019_yo_a", "情報オリンピック過去問"], //
    ["エコー", "https://atcoder.jp/contests/abc145/tasks/abc145_b", "部分文字列"], //: の練習です
    ["奇数文字目", "https://atcoder.jp/contests/abc072/tasks/abc072_b", "スライス"], //: スライスでもできます
    ["とある総和", "https://atcoder.jp/contests/abc083/tasks/abc083_b", ""], //
    ["ビリヤード", "https://atcoder.jp/contests/abc183/tasks/abc183_b", ""], // 
    ["クイズ", "https://atcoder.jp/contests/abc184/tasks/abc184_b", "文字列データ"], //
    ["踏み台", "https://atcoder.jp/contests/abc176/tasks/abc176_c", "リスト"], //
    ["回文数", "https://atcoder.jp/contests/abc090/tasks/abc090_b", ""], //
    ["ABCスワップ", "https://atcoder.jp/contests/abc161/tasks/abc161_a", ""], //: ボーナス！
    ["K進数", "https://atcoder.jp/contests/abc156/tasks/abc156_b", ""], //: 文字列問題か？
    ["abc", "https://atcoder.jp/contests/abc093/tasks/abc093_a", ""], //: 文字ソート
    ["９の倍数", "https://atcoder.jp/contests/abc176/tasks/abc176_b", ""], //
    ["２番目に大きい整数", "https://atcoder.jp/contests/joi2021yo1a/tasks/joi2021_yo1a_a", "情報オリンピック過去問"], //
    ["重複の除去", "https://atcoder.jp/contests/abc191/tasks/abc191_b", ""], //
    ["ケーキとドーナッツ", "https://atcoder.jp/contests/abc105/tasks/abc105_b", ""], //
    ["デジタルギフト", "https://atcoder.jp/contests/abc119/tasks/abc119_b", ""], //
    ["塩基対", "https://atcoder.jp/contests/abc122/tasks/abc122_a", "辞書"], //: 辞書で解いて見ましょう
    ["コイン", "https://atcoder.jp/contests/abc087/tasks/abc087_b", ""], //
    ["入国審査", "https://atcoder.jp/contests/abc155/tasks/abc155_b", ""], //
    ["タスクスケジュール", "https://atcoder.jp/contests/abc103/tasks/abc103_a", ""], //
    ["トレーニング", "https://atcoder.jp/contests/abc055/tasks/abc055_b", ""], //: モジュロの問題
    ["ROT N", "https://atcoder.jp/contests/abc146/tasks/abc146_b", "シーザー暗号"], //: これも
    ["FizzBuzzの和", "https://atcoder.jp/contests/abc162/tasks/abc162_b", ""], //: 有名なFizzBuzz問題のバリエーション
    ["分割", "https://atcoder.jp/contests/joi2021yo1b/tasks/joi2021_yo1b_c", "スライス"], //
    ["ミックスジュース", "https://atcoder.jp/contests/abc171/tasks/abc171_b", ""], //
    ["ゴルフ大好き", "https://atcoder.jp/contests/abc165/tasks/abc165_a", "全探索"],
    ["二つのスイッチ", "https://atcoder.jp/contests/abc070/tasks/abc070_b", "区間の重なり"], //：を求める
    ["秒針", "https://atcoder.jp/contests/abc168/tasks/abc168_c", "三角関数"], //

    //条件分岐
    ["消費税", "https://atcoder.jp/contests/abc158/tasks/abc158_c", ""], //
    //リスト
    ["禁止されたリスト", "https://atcoder.jp/contests/abc170/tasks/abc170_c", ""], //
    ["比較", "https://atcoder.jp/contests/joi2021yo1c/tasks/joi2021_yo1c_c", "２重ループ"],
    ["ビンゴ", "https://atcoder.jp/contests/abc157/tasks/abc157_b", ""], //: ビンゴを判定する関数定義しましょう

    ["二乗誤差", "https://atcoder.jp/contests/abc194/tasks/abc194_c", "２重ループ TLE注意"], //: 
    ["ゾロ目", "https://atcoder.jp/contests/arc046/tasks/arc046_a", "全探索"],
    ["カエル", "https://atcoder.jp/contests/dp/tasks/dp_a", "DP腕試し"], //

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

    function mod_count(problem_id) {
        if (problem_id.startsWith('abc')) {
            if(problem_id.endsWith('_c')) {
                return 3;
            }
            if(problem_id.endsWith('_d')) {
                return 5;
            }
            return 1;
        }
        if (problem_id.startsWith('dp')) {
            return 5;
        }
        if (problem_id.startsWith('arc')) {
            return 2;
        }
        if (problem_id.startsWith('past')) {
            if(problem_id.endsWith('_a')) {
                return 1;
            }
            if(problem_id.endsWith('_b')) {
                return 2;
            }
            return 3;
        }
        //console.log(problem_id);
        return 1;
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
                var AC = 0, AC2=0, ModAC=0;
                var score = {};
                var epoch = [];
                data.sort((x,y)=>x.epoch_second-y.epoch_second);
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
                                ModAC += mod_count(problem_id);
                            }
                            count(score, problem_id, 1);
                        }
                        else if (data[i].result == 'TLE') {
                            s = '<span class="label-mod">TLE</span>';
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
                element.innerHTML = `<span class="label-ac">正解数</span> ${AC} 番外 ${AC2}`
                    + ` <span class="label-wa">時間(おおよそ)</span> ${time}`;
            });
        });
    }
}


