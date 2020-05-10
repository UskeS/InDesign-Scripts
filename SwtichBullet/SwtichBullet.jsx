/**
 * fileoverview 選択している段落の箇条書きマーカーを変更する
 * @author SAEGUSA Yusuke
 * @version 0.0.2 ファイル名の参照を変数対応にした
 */

//@targetengine "SwitchBullet"

if (app.documents.length === 0 || app.selection.length === 0) {
    myError("001");
}

var doc = app.activeDocument;
var sel = doc.selection[0];
var configFileName = "SwitchBulletConfig.txt";

if (!sel.hasOwnProperty("bulletChar")) {
    myError("001");
}

var myConfig = getConfig();
verifyFonts(myConfig);
var curBullet = getCurrentBullet(myConfig);
var nextBullet = curBullet+1;
if (nextBullet >= myConfig.length) {
    nextBullet = 0;
}

sel.bulletChar.properties = myConfig[nextBullet].bulletOptions;
sel.bulletsTextAfter = myConfig[nextBullet].bulletsTextAfter;

/**
 * 設定を読み込んでオブジェクトの配列として返す
 * @returns {Objcect[]}
 */
function getConfig() {
    var fObj = File($.fileName.replace(/[^\/]+$/, configFileName));
    var fFlag = false;
    var result = [];
    if (!fObj.exists) {
        myError("002");
    }
    try {
        fObj.open("r");
        fObj.encoding = "UTF-8";
        while (!fObj.eof) {
            var resObj = {
                bulletOptions: {},
                bulletsTextAfter: ""
            };
            var temp = fObj.readln().split("\t");
            if (/^\/\//.test(temp[0])) continue;
            resObj.bulletOptions = {
                bulletsFont: temp[0],
                bulletsFontStyle: temp[1],
                characterType: BulletCharacterType.GLYPH_WITH_FONT,
                characterValue: +temp[2], //Number型にする；parseIntだと仕様上不具合を拾えない
            };
            if (temp[3]) {
                resObj.bulletsTextAfter = temp[3];
            }
            result.push(resObj);
        }
        fFlag = true;
    } catch(e) {
        alert(e);
    } finally {
        fObj.close();
    }
    if (!fFlag) {
        myError("003");
    }
    return result;
}

/**
 * 設定に記述されたフォントが利用可能かどうか確認する
 * @param {Object[]} confObj 
 */
function verifyFonts(confObj) {
    var erFonts = [];
    for (var i=0; i<confObj.length; i++) {
        var blOpt = confObj[i].bulletOptions;
        if (!doc.fonts.item(blOpt.bulletsFont+"\t"+blOpt.bulletsFontStyle).isValid) {
            erFonts.push(blOpt.bulletsFont+"  "+blOpt.bulletsFontStyle);
        }
        if (isNaN(blOpt.characterValue)) {
            myError("006");
        }
    }
    if (erFonts.length > 0) {
        myError("005", erFonts.join("\r"));
    }
}

/**
 * 現在適用されている箇条書き記号を設定と比較し、設定の何番目が適用されているかを返す
 * @param {Objcect[]} conf 
 * @returns {number} 設定のインデックス
 */
function getCurrentBullet(conf) {
    var cur = sel.bulletChar;
    for (var i=0; i<conf.length; i++) {
        var blOpt = conf[i].bulletOptions;
        if (cur.bulletsFont.fontFamily === blOpt.bulletsFont
            && cur.bulletsFontStyle === blOpt.bulletsFontStyle
            && cur.characterValue === blOpt.characterValue) {
                return i;
        }
    }
    return 0;
}

/**
 * エラー終了関数
 * @param {string} erNum - エラー番号
 */
function myError(erNum) {
    var errorMessage = {
        "001": "テキストを選択してから実行してください",
        "002": "設定ファイル " + configFileName + " が見つかりません",
        "003": "設定ファイル " + configFileName + " が正しく読み込めませんでした",
        "004": "設定ファイル " + configFileName + " の内容が不正です",
        "005": "設定ファイル " + configFileName + " に指定される以下のフォントが利用できません\r" + arguments[1],
        "006": "設定ファイル " + configFileName + " に数値に変換できないGID値が記述されています",
    };
    alert(erNum + ": " + errorMessage[erNum]);
    exit();
}
