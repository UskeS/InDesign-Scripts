/**
 * fileoverview 選択しているテキストに適用されている段落スタイルを検索し、同じ段落スタイルが適用された次のテキストにジャンプする
 * @author SAEGUSA Yusuke
 * @version 0.0.1
 */

if (app.documents.length === 0 || app.selection.length === 0) {
    myError("001");
}

var doc = app.activeDocument;
var sel = doc.selection[0];
if (!sel.hasOwnProperty("appliedParagraphStyle")) {
    myError("001");
}
var curStory = sel.parentStory;
var curIndex = sel.index;

app.findGrepPreferences = app.changeGrepPreferences = null;
app.findGrepPreferences.appliedParagraphStyle = sel.appliedParagraphStyle;
var found = curStory.findGrep();
var result = false;
for (var i=0, len=found.length; i<len; i++) {
    if (found[i].index > curIndex) {
        found[i].select();
        found[i].showText();
        result = true;
        break;
    }
}

if (!result) {
    myError("002");
}

function myError(erNum) {
    var errorMessage = {
        "001": "テキストを選択してから実行してください",
        "002": "同じスタイルがキャレット以降で見つかりません",
    };
    alert(errorMessage[erNum]);
    exit();
}