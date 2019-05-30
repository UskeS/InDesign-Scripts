/**
 * @fileoverview 選択したオブジェクトの下にオブジェクトスタイルを充てたテキストフレームを生成する
 * @author Uske_S
 * @version 0.1.0
 */

if (app.documents.length === 0) {exit();}
if (app.activeDocument.selection.length === 0) {exit();}


app.doScript(function(){
    //--　変数・関数定義　--//
    var doc = app.activeDocument;
    var sel = doc.selection;
    var objs = genAryNameWithID(doc.allObjectStyles);
    var tgtObjs;

    //一連のオブジェクトスタイルの配列からnameとidのリストを作って返す
    function genAryNameWithID(ary) {
        var temp = {nameList:[], id: []};
        for (var i=0; i<ary.length; i++) {
            temp.nameList.push(ary[i].name);
            temp.id.push(ary[i].id);
        }
        return temp;
    };

    //SUIの設定ダイアログ
    function settingDialog(list) {
        var w = new Window("dialog", "genCaption");
        w.alignChildren = "fill";
        var gr = w.add("group");
        gr.add("StaticText {text: 'オブジェクトスタイル'}");
        var ddlist = gr.add("DropDownList", undefined, list);
        ddlist.preferredSize = [100, -1];
        ddlist.selection = 0;
        w.add("Button", undefined, "実行", {name:'ok'}).onClick = function() {
            w.close(3);
        };
        if (w.show() === 3) {
            return ddlist.selection.index;
        } else {
            return null;
        }
    };

    //テキストフレームを生成する
    function genTextFrame(obj,styleID,text) {
        var vb = obj.visibleBounds;
        var wid = vb[3] - vb[1];
        return doc.textFrames.add({
            appliedObjectStyle: doc.objectStyles.itemByID(styleID),
            visibleBounds: [vb[2], vb[1], vb[2]+10, vb[1]+wid],
            contents: text
        });
    };

    //-- 実行処理 --//
    tgtObjs = objs.id[settingDialog(objs.nameList)];
    if (!tgtObjs) {exit();}
    for (var i=0; i<sel.length; i++) {
        genTextFrame(sel[i], tgtObjs, "カスタムテキスト");
    }
}, ScriptLanguage.JAVASCRIPT, null, UndoModes.ENTIRE_SCRIPT);