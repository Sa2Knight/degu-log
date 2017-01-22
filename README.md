# でぐろぐ(開発中)

* 個人用のデグー飼育支援アプリ
* MEANスタックによる開発の練習が主な目的

# 要件(目標)

* 写真管理
  * 写真のCRUD
  * 撮影日時別の整理
  * 写真への簡易コメントの挿入
  * 写真へのタグ付け
* 飼育日記
  * 簡易ブログ形式
  * 画像の投稿が可能
* 体重管理
  * 個体別に体重を管理
  * 時系列で折れ線グラフ出力
* 購入履歴
  * デグー関連の支出の履歴(zaim連携)
  * 時系列で折れ線グラフ出力

## システム構成

|構成要素|バージョン|
|--------|----------|
|Debian|8.7|
|Node.JS|7.4.0|
|express|4.14.0|
|AngularJS|1.6.1|
|MongoDB|3.2.9|

## インストール手順

pull後、以下の手順でNode環境を構築

1. http://tomosoft.jp/design/?p=7525 に沿ってNode環境を構築
2. 以下の追加nodeモジュールを導入

```lang=bash
$ npm install express
$ npm install ejs
$ npm install mongodb
$ npm install node-dev -g
```
