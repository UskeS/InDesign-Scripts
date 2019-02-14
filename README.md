# InDesign-Scripts
一部例外がありますが、主にAdobe InDesign用のスクリプトです。  

## Getting Started
スクリプト（jsxファイル）はInDesignのScriptsフォルダにインストールしてください。  
jsxincファイルは読み込み用のモジュールです。  
スクリプトファイル冒頭で`#include`する必要があります。

## Licence
ライセンスの詳細は[LICENCE](https://github.com/UskeS/InDesign-Scripts/blob/master/LICENCE)を参照のこと。

# Code
## assistSelectParagraph
段落の選択を補助するスクリプト。types-for-adobeによるTypeScriptでの開発第一号です。  
実際にInDesignで使うには、トランスパイルされた.jsファイルを利用してください。  
詳細は[当方ブログ記事](http://uske-s.hatenablog.com/entry/2019/02/02/231828)にアップしています。  
[動作画面](https://raw.github.com/wiki/UskeS/InDesign-Scripts.wiki/image/assistSelectParagraph.gif)

## array_whose.jsxinc
AppleScriptにあるwhoseメソッドを模して、Arrayオブジェクトをプロトタイプ拡張したものです。  
### サンプルコード
```
var paraStyles = app.activeDocument.allPagraphStyles;
var tgtParaStyle = paraStyles.whose({name: "hoge"});
```
