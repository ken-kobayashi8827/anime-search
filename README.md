## あにさ～ち

「あにさ～ち」は、現在放送されているクールのアニメがどの VOD サービスで配信されているかを調べることができるサービスです。

## 制作した目的

様々な VOD サービスによりアニメが配信されているため見たいアニメがどのサービスで配信されているか調べるのが手間と感じました。  
どの配信サイトで公開されているのか簡単に調べられるようにしたいと思い制作致しました。

## アプリ URL

ユーザー  
https://anime-search-tau.vercel.app/

管理画面  
https://anime-search-tau.vercel.app/admin

## 使用技術

### フロントエンド

- next.js (v14.2.3)
- react (v18.2.0)
- typescript (v5.4.5)
- chakra-ui (v2.8.2)
- material icons (v5.15.17)
- supabase/ssr (v0.3.0)
- supabase-js (2.43.0)
- eslist (v8.57.0)
- jsonwebtoken (v9.0.2)
- use-debounce (v10.0.0)
- uuid (v9.0.1)
- zod (v3.23.5)
- react-hook-form (7.51.3)

### バックエンド

- supabase

## 機能一覧

本アプリで実装した機能は以下となります。

### ユーザーサイト

#### 認証

- サインアップ
- パスワードを忘れた方 メール送信
- パスワード変更
- ログイン/ログアウト

#### アニメ一覧(トップページ)

- アニメタイトルでのフィルター
- VOD サービスでのフィルター
- タグのリンクから VOD の検索結果へ遷移
- ページネーション
- お気に入り登録/解除

#### マイページ

- プロフィール変更
  - ユーザー名
  - プロフィール画像
    - 変更プレビュー
- ユーザーのお気に入り
  - お気に入り解除
  - ページネーション

### 管理画面

#### 認証

- ログイン/ログアウト

#### ユーザーリスト

- ユーザー作成/編集
- ユーザー名でのフィルター
- ID/作成日でのソート
- ページネーション

#### アニメリスト

- アニメ作成/編集/削除
- アニメタイトルでのフィルター
- VOD サービスでのフィルター
- タグのリンクから VOD の検索結果へ遷移
- ページネーション
- ID/ステータス/作成日でのソート

#### アニメデータインポート

- Annict API からデータ取得

## アニメデータインポート詳細

### Annict API

Annict API
https://developers.annict.com/docs

Annict API の REST API を使用して今季アニメのデータを取得しています。  
取得したデータを Supabase のデータベースにて管理しています。  
不足しているアニメなどは手動でアニメ作成や編集を行います。  

## 現状対応しているVODサービス
- Netflix
- dアニメストア
- バンダイチャンネル
- U-Next
- Amazon Prime Video
- Abeme

## 今後の実装予定機能

実装していきたい機能は以下です。

- 過去アニメのデータ管理
- ソーシャルログイン
- アニメタイトルフィルターでのオートコンプリート
- アニメ最速配信カレンダーの作成
- 今日配信されるアニメの LINE での通知
