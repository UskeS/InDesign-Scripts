/**
 * @fileoverview ページパネルで選択したページのみをPDFとして書き出す（PDF書き出しダイアログを開く）スクリプト
 * @author Yusuke SAEGUSA(Uske_S)
 * @version 0.0.2 とりあえず版
 */

//@target "indesign"

app.doScript(function() {
    //-- 変数定義 --//
    var doc, pag, exPageColors, tgtPages, tgtFolder, fileName;
    /** 
     * スクリプト動作前後では表示されないため特に意識する必要はないが，ページパネルの色名とオブジェクトを対応させている
     * 
     * @property {string} jp ページパネルのカラー設定のメニュー名（和文表記）
     * @property {stirng} en 上記jpに対応するpageColorオブジェクトのキーストリング
     */
    var clr = {jp: "黒", en: "BLACK"};
    var act = app.menuActions.itemByName(clr.jp); //ページパネルのカラー設定メニュー

    //-- 関数定義 --//
    /**
     * 指定した色が設定されたページの絶対ページ番号をカンマ区切りにして返す
     *
     * @param {string} colorName pageColorのキー名
     * @return {string} カンマ区切りテキスト
     */
    function getColoredPages(colorName) {
        var res = [];
        for (var i=0; i<pag.length; i++) {
            if (pag[i].pageColor.toString() === colorName) {
                res.push("+"+(i+1));
            }
        }
        return res.join(",");
    };

    /**
     * 現在のページのカラー設定をプールして削除する
     *
     * @return {string[]} pageColorのキーの配列
     */
    function clearPageColor() {
        var res = [];
        for (var i=0; i<pag.length; i++) {
            res.push(pag[i].pageColor.toString());
            pag[i].pageColor = PageColorOptions.NOTHING;
        }
        return res;
    };

    /**
     * ページのカラー設定を復元する
     *
     * @param {string[]} pgColorValue pageColorのキーが入った配列
     */
    function returnPageColor(pgColorValue) {
        for (var i=0; i<pag.length; i++) {
            if (pgColorValue[i] === "NOTHING" || pgColorValue[i] === "USE_MASTER_COLOR") {
                pag[i].pageColor = PageColorOptions[pgColorValue[i]];
            } else {
                pag[i].pageColor = UIColors[pgColorValue[i]];
            }
        }
    };

    /**
     * PDF書き出しダイアログを開く
     *
     * @param {string} range PDF書き出し範囲
     * @param {file} filePath 書き出し先のファイルオブジェクト
     */
    function openExportDialog(range, filePath) {
        app.pdfExportPreferences.pageRange = range;
        doc.exportFile(ExportFormat.PDF_TYPE, filePath, true);
    };

    //-- 実行処理 --//
    if (app.documents.length === 0) {exit();}
    doc = app.activeDocument
    pag = doc.pages;
    exPageColors = clearPageColor();
    if (!act.hasOwnProperty("length") && act.area === "パネルメニュー:ページ" && act.enabled) {
        act.invoke();
    } else {
        alert("ページパネルからアクションを実行できませんでした。スクリプトを中断します");
        returnPageColor(exPageColors);
        exit();
    }
    tgtPages = getColoredPages(clr.en);
    tgtFolder = Folder.selectDialog("PDF書き出し先のフォルダを選択");
    if (!tgtFolder) {
        returnPageColor(exPageColors);
        exit();
    }
    fileName = prompt("PDFのファイル名を入力（拡張子まで含めて入力）", decodeURI(doc.name).replace(/\.indd$/, ".pdf"));
    if (!fileName) {
        returnPageColor(exPageColors);
        exit();
    }
    openExportDialog(tgtPages, new File(tgtFolder.fsName+"/"+fileName));
    returnPageColor(exPageColors);

}, ScriptLanguage.JAVASCRIPT, null, UndoModes.ENTIRE_SCRIPT);