var widths = {
    0: "fill",
    1: "",
    2: "20mm",
    3: "16mm",
    4: "30mm",
    5: "fill"
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
        var txfWidth = (function () {
            var g = sel.parent.geometricBounds;
            return g[3]-g[1];
        })();
        var fillCells = {
            ary: Array(C.length),
            sum: 0
        };
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
            if (widths[k] && widths[k] !== "fill") {
                C[k].width = widths[k];
                txfWidth -= C[k].width;
            } else if (widths[k] === "fill") {
                fillCells.ary[k] = true;
                fillCells.sum++;
            } else {
                txfWidth -= C[k].width;
            }
        }
        var fillWidth = txfWidth / fillCells.sum;
        for (var i=0; i<C.length; i++) {
            if (fillCells.ary[i]) {
                C[i].width = fillWidth;
            }
        }
        alert("終了しました");
    }, ScriptLanguage.JAVASCRIPT, null, UndoModes.ENTIRE_SCRIPT);
}();
