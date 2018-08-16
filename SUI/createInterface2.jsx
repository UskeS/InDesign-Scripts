/**
 * @@@BUILD INFO@@@
 * Name: createInterface2
 * FileName: createInterface2.jsx
 * Version: 0.1.0
 * CreationDate: Thu Aug 16 2018 23:28:50 GMT+0900 (JST)
 * Author: @Uske_S（Yusuke SAEGUSA）
 * Copyright: @Uske_S（Yusuke SAEGUSA）
 * Notice: 
 * 著作者に無断で転載・配布・販売することを禁止します。
 * 個人利用の限りにおいて改変は可能とします。
 * スクリプトの使用により不都合・不具合が生じても責任は負いかねます。
 * Discription: 
 * 簡単なScriptUIを生成するスクリプトです。
 * 詳しい使い方については当ブログ記事をご参照ください。
 * 
 */

/**
 * SUIを生成する関数
 * @param {window} wObj SUI用のWindowオブジェクト
 * @param {string} control Windowオブジェクトに定義するコントロール
 * @return {array} 各コントロールを要素とした配列
 */
function createInterface2(wObj, control) {
    wObj.alignChildren = "fill";
    var container = []; //ダイアログオブジェクトのコンテナ
    //$.writeln(getControlType ("dd"));
    
    addControlItem(wObj, control);
    return container;
    
    function addControlItem(obj, item) {
        for (var i=0, len=item.length; i<len; i++) {
            if (item[i].constructor.name === "Object") {
                for (key in item[i]) {
                    var pnl = obj.add("panel", undefined, key);
                    container.push(pnl);
                    addControlItem(pnl, item[i][key]);
                }
            } else {
                var typeObj = {};
                setControlsProp(item[i], " *: *", " *\\| *");
                var V = (typeObj.typeName === "dropDownList")? eval(typeObj.value): typeObj.value;
                var cont = obj.add(typeObj.typeName, undefined, V);
                if (typeObj.typeName === "dropDownList") {
                    cont.selection = 0;
                } else if (typeObj.typeName === "button") {
                    cont.onClick = eval(typeObj.btFunc);
                }
            container.push(cont);
            }
        }
        function setControlsProp(valTxt, contSeparator, funcSeparator) {
            var reCont = RegExp(contSeparator);
            var reFunc = RegExp(funcSeparator);
            var temp = valTxt.split(reCont);
            typeObj.typeName = getControlType(temp[0]);
            if (typeObj.typeName === "button" && reFunc.test(temp[1])) {
                var bt = temp[1].split(reFunc);
                typeObj.value = bt[0];
                typeObj.btFunc = bt[1];
                return;
            }
            typeObj.value = temp[1];
        };
        function getControlType(type) {
            var typeList = {
                "staticText": ["st", "statictext"],
                "editText": ["et", "edittext"],
                "checkBox": ["cb", "checkbox"],
                "radioButton": ["rb", "radiobutton"],
                "dropDownList": ["dd", "dropdownlist"],
                "button": ["bt", "button"]
            };
            for (key in typeList) {
                for (var i=0; i<typeList[key].length; i++) {
                    var typeStr = type.toLowerCase();
                    if (typeList[key][i] === typeStr) {
                        return key;
                    }
                }
            }
            return new TypeError("許可されていないコントロール用文字列です");
        };
    };
};