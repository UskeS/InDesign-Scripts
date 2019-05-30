/**
 * @fileoverview 選択したオブジェクトの下にオブジェクトスタイルを充てたテキストフレームを生成する
 * @author Uske_S
 * @version 0.2.0 SUIダイアログをpaletteに変更
 */

//@targetengine session

(function(){
    //--　変数・関数定義　--//
    var scriptInfo = "v0.2.0 ©2019 Uske_S";
    var doc, sel, objs, tgtObjs;
    main();

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
    function main() {
        objs = genAryNameWithID(app.activeDocument.allObjectStyles);
        var w = new Window("palette", "genCaption - "+scriptInfo);
        w.alignChildren = "fill";
        var gr = w.add("group");
        gr.add("StaticText {text: 'オブジェクトスタイル'}");
        var ddlist = gr.add("DropDownList", undefined, objs.nameList);
        ddlist.preferredSize = [100, -1];
        ddlist.selection = 0;
        w.add("Button", undefined, "実行", {name:'ok'}).onClick = function() {
            doc = app.activeDocument;
            sel = doc.selection;
            tgtObjs = objs.id[ddlist.selection.index];
            app.doScript(function(){
                for (var i=0; i<sel.length; i++) {
                    genTextFrame(sel[i], tgtObjs, "カスタムテキスト");
                }
            }, ScriptLanguage.JAVASCRIPT, null, UndoModes.ENTIRE_SCRIPT);
        };
        w.show();
    };

    //テキストフレームを生成する
    function genTextFrame(obj,styleID,text) {
        var vb = obj.visibleBounds;
        var wid = vb[3] - vb[1];
        if (!doc.objectStyles.itemByID(styleID).isValid) {
            alert("オブジェクトスタイルが参照できません");
        }
        return doc.textFrames.add({
            appliedObjectStyle: doc.objectStyles.itemByID(styleID),
            visibleBounds: [vb[2], vb[1], vb[2]+10, vb[1]+wid],
            contents: text
        });
    };
})();