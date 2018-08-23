var widths = {
    //セル内のアキよりも小さい値などはエラーになるので注意
    //追加するときは　n: "XXmm", のような形で記述を追加してください
    //nは整数値のみ、 "XXmm"の部分は数値だけにするとドキュメントの単位に合わせます
    //例）1: 15,  ←これはドキュメントの定規単位がmmであれば15mm、ptであれば15ptと解釈されます
    //※数値のみの場合は、二重引用符は任意
    0: "10mm", //0番目の列幅を20mmに
    3: "80HA"  //3番目の列幅を40ptに（最後のものには,が不要）
};

!function () {
    if (!app.documents.length || !app.selection.length) {
        alert("ドキュメントを開き、表かセルを選択してから実行してください");
        return;
    }
    var doc = app.activeDocument;
    var sel = doc.selection[0];

    if (sel.constructor.name !== "Table" && sel.constructor.name !== "Cell") {
        alert("表かセルを選択してください");
        return;
    }

    if (sel.constructor.name === "Cell") {
        sel = sel.parent;
    }
    app.doScript(function() {
        var C = sel.columns;
        for (k in widths) {
            var kNum = parseInt(k,10);
            try {
                if (isNaN(kNum) || kNum > C.length-1) {
                    throw new RangeError("widthsオブジェクトのキーが対象外の列を指定しています");
                }
            } catch(e) {
                alert(e);
                return;
            }
            C[k].width = widths[k];
        }
        alert("終了しました");
    }, ScriptLanguage.JAVASCRIPT, null, UndoModes.ENTIRE_SCRIPT);
}();