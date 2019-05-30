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
### 概要
段落の選択を補助するスクリプト。types-for-adobeによるTypeScriptでの開発第一号です。  
実際にInDesignで使うには、トランスパイルされた.jsファイルを利用してください。  
詳細は[当方ブログ記事](http://uske-s.hatenablog.com/entry/2019/02/02/231828)にアップしています。  
文字列を選択した状態で一度実行すると、その文字列を含む１行（ただし行末に改行がある場合はそれを除外）して選択し、  
さらに実行すると同じ要領でその段落を選択します。  
複数の段落にまたがって選択した状態で実行すると、最後の行末の改行文字を除外してまとめて段落を選択します。
### 動作画面
![assistselectparagraph](https://user-images.githubusercontent.com/32891783/52755826-a5d9cd00-3042-11e9-8c0c-2c3e1a8ba560.gif)

## genCaption
### 概要
選択したオブジェクトの下部にまとめてテキストフレームを生成するスクリプト。  
オブジェクトスタイルを充てた状態で生成するのがポイント。  
詳細は当方ブログ記事にアップしています。  
オブジェクトスタイルリストを更新したい場合は、ダイアログを閉じて再度スクリプトを実行し直してください。
### 動作画面
![0530-5](https://user-images.githubusercontent.com/32891783/58630231-bbd17c00-8319-11e9-85c7-34664841bc2f.gif)

# scriptModules
開発を手助けするモジュール群です。随時追加していきます。
## array_whose.jsxinc
AppleScriptにあるwhoseメソッドを模して、Arrayオブジェクトをプロトタイプ拡張したものです。  
もうちょっと改良する予定。
### サンプルコード
```
var paraStyles = app.activeDocument.allPagraphStyles;
var tgtParaStyle = paraStyles.whose({name: "hoge"});
```
## IdUtil.jsxinc
主にInDesign用のお助けモジュール。  
そのうち増えていくのでお待ち下さい。  
細かい使い方についてはいずれJSDocを用意する予定です。