"use strict";
/**
 * fileoverview 行選択／段落選択支援スクリプト
 * @author SAEGUSA Yusuke
 * @version 0.1.0
 */
(function () {
    if (app.documents.length === 0) {
        callError("ドキュメントが開かれていません");
    }
    if (app.selection.length === 0) {
        callError("何も選択されていません");
    }
    if (app.selection.length > 1) {
        callError("テキストを選択してください");
    }
    /**
     * オブジェクトのコンストラクターを調べる
     */
    (function () {
        var acceptConstName = [
            "Text",
            "Paragraph",
            "Line",
            "Character",
            "Word",
            "TextStyleRange",
            "InsertionPoint"
        ];
        for (var i = 0; i < acceptConstName.length; i++) {
            if (acceptConstName[i] === app.selection[0].constructor.name) {
                return;
            }
        }
        callError("テキストを選択してください");
    })();
    var selObj = app.activeDocument.selection[0];
    var selName = selObj.constructor.name;
    if (selObj.paragraphs.length > 1 || selName === "Line") {
        selectPara();
    }
    else if (selObj.lines.length > 1) {
        return;
    }
    else {
        selectLine();
    }
    //
    // 以下 呼び出し関数群
    //
    /**
     * メッセージを投げてスクリプトを終了する
     *
     * @param {string} mes
     */
    function callError(mes) {
        alert(mes);
        exit();
    }
    ;
    /**
     * 段落を選択する
     */
    function selectPara() {
        var endParLen = selObj.paragraphs[-1].characters.length;
        selObj.paragraphs[0].characters[0].select();
        if (/[\r\n]$/.test(selObj.paragraphs[-1].contents)) {
            selObj.paragraphs[-1].characters[endParLen - 2].select(SelectionOptions.ADD_TO);
        }
        else {
            selObj.paragraphs[-1].characters[endParLen - 1].select(SelectionOptions.ADD_TO);
        }
    }
    ;
    /**
     * 行を選択する
     */
    function selectLine() {
        var chLen = selObj.lines[0].characters.length;
        selObj.lines[0].characters[0].select();
        if (/[\r\n]$/.test(selObj.lines[0].contents)) {
            selObj.lines[0].characters[chLen - 2].select(SelectionOptions.ADD_TO);
        }
        else {
            selObj.lines[0].characters[chLen - 1].select(SelectionOptions.ADD_TO);
        }
    }
    ;
})();
