# でぐろぐ

* 個人用のデグー飼育支援アプリ
* MEANスタックによる開発の練習が主な目的

# 機能

* 写真管理
  * 写真のCRUD
  * 写真へのタグ付け
* 飼育日記
  * 簡易ブログのCRUD
  * カレンダーによる記事一覧表示
* 体重管理
  * 個体別に体重を管理
  * 時系列で折れ線グラフ出力
* 購入履歴
  * デグー関連の支出の履歴(zaim連携)
  * 月ごとの支出詳細

## システム構成

|構成要素|バージョン|
|--------|----------|
|Debian|8.7|
|Node.JS|7.4.0|
|express|4.14.0|
|AngularJS|1.4.1|
|MongoDB|3.2.9|

## インストール手順

pull後、以下の手順でNode環境を構築

1. http://tomosoft.jp/design/?p=7525 に沿ってNode環境を構築

```lang=bash
$ sudo npm install
$ sudo apt-get install ImageMagick
```
