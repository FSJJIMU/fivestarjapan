# FIVE-STAR JAPAN GROUP — 公式サイト

## キーワード引き継ぎ（重要）

ユーザーが **「引き継ぎ」「ひきつぎ」「handoff」「続きから」** のいずれかを言ったら、
`.claude/commands/handoff.md` の手順をそのまま実行して、現在の状態を報告すること。
`/handoff` スラッシュコマンドでも同じ動作をする。

Mac ↔ Windows のどちらで作業していても、このファイルと handoff.md があれば
プロジェクトの文脈は完全に復元できる。

---

## プロジェクト概要

ロードサービス（レッカー・バッテリー・脱輪救出など）と蜂駆除を行う
「FIVE-STAR JAPAN GROUP」のコーポレートサイト。

**ビルド不要の静的サイト。** フレームワーク・npm・バンドラは一切使っていない。
`index.html` をブラウザで開く／静的サーバーに置くだけで動く。

## ファイル構成

| パス | 行数 | 役割 |
|---|---|---|
| `index.html` | 333 | 骨組みのみ。中身が空の `<div id="...">` を JS が埋める |
| `css/style.css` | 2020 | 全デザイン。黒＋ゴールドの高級感路線 |
| `js/contents.js` | 236 | **★ 全テキスト・画像パスのデータ**（`SITE_CONTENTS`） |
| `js/main.js` | 395 | DOM 構築 + ナビ / パーティクル / スクロール演出 / フォーム |
| `images/` | 76ファイル / 329MB | 画像。`.psd` `.docx` の元データも含む |
| `README.txt` | — | **クライアント（非エンジニア）向けの操作説明書。** Claude 向けではない |

## 編集の大原則

1. **文章・画像の差し替えは `js/contents.js` だけを触る。**
   `SITE_CONTENTS` のキー名と `index.html` の `id` / `main.js` の DOM 生成は
   1対1で対応しているので、キー名を変えると表示が壊れる。

2. **`css/style.css` や `js/main.js` を編集したら、`index.html` のキャッシュバスターを +1 する。**
   現在の値：
   ```
   css/style.css?v=99    js/contents.js?v=27    js/main.js?v=19
   ```
   これを上げ忘れると、クライアントのブラウザに古いファイルが残り続ける。

3. **画像ファイル名を勝手にリネームしない。**
   `images/背景画像.jpg` `images/タイヤ パンク.jpg` `images/ロゴ/output/...` のように
   日本語・スペース・サブフォルダを含むパスがあり、すべて `contents.js` から参照されている。
   （2026-08 時点で、参照されている画像はすべて実在することを確認済み）

## `SITE_CONTENTS` の構造（js/contents.js）

```
company              基本情報（社名 / TEL / email / 住所 / ロゴ・背景・QR画像パス）
nav                  ナビゲーションメニュー
carServicesDesc      ロードサービスのリード文
carServices[8]       ロードサービス一覧（title / desc / img）
beeServicesDesc      蜂駆除のリード文（HTML可。<br class="sp-br"> でSP改行制御）
beeServices[4]       蜂駆除一覧（title / desc / img）
beeOrganic           独自の「オーガニック蜂駆除」セクション（concerns[] / tools[]）
updates.car[4]       施工実績・車（before / after の2枚組）
updates.bee[4]       施工実績・蜂（before / after の2枚組）
about                代表挨拶の本文と署名
companyInfo[7]       会社概要テーブル
partnerRegions[4]    エリア別協力店（関西 / 東海 / 四国 / 九州）
partnersCombinedLogo パートナーロゴの「まとめ画像」（PC用 / SP用）
partners[8]          個別ロゴ配列 ← ★ 現在は未使用
footer               コピーライトとリンク
```

⚠️ `partners[8]` は **今は表示されていない。** `main.js:106` で
`partnersCombinedLogo` が設定されていればまとめ画像を優先し、`partners` 配列は
フォールバックとしてしか使われないため。個別ロゴ表示に戻したい場合は
`partnersCombinedLogo` を空にする。

## `js/main.js` の関数

```
buildPage()            SITE_CONTENTS を読んで全セクションを組み立てる入口
buildServiceGrid()     サービスカードのグリッド
buildUpdates()         施工実績の before/after 表示
buildPartnerRegions()  エリア別協力店カード
buildBeeOrganic()      オーガニック蜂駆除セクション
initNav()              スクロール連動ナビ + モバイルドロワー
initParticles()        ヒーローのパーティクル演出
initScrollReveal()     .reveal クラスの IntersectionObserver フェードイン
initForm()             フォーム送信 → showSuccess()
```

## 外部依存（CDN）

オフラインだと表示が崩れるので注意：
- **Google Fonts** — Cinzel（英字見出し）/ Noto Sans JP / Noto Serif JP
- **Lucide Icons** — `https://unpkg.com/lucide@latest`。`<i data-lucide="car">` の形で使用

## デプロイ / 問い合わせフォーム

- **Netlify** 前提。フォルダごとドラッグ＆ドロップで公開する運用（`README.txt` 参照）
- 問い合わせフォームは **Netlify Forms**（`data-netlify="true"` / honeypot は `bot-field`）
- 受信内容は Netlify 管理画面の「Forms」タブで確認する
- ※ 実際に公開済みか・独自ドメインの有無は未確認。作業前にユーザーに聞くこと

## ローカルプレビュー

`.claude/launch.json` は **gitignore 対象**（Python の実行パスが OS ごとに違うため）。
無ければ以下を作る。

**Windows:**
```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "five-star-japan", "runtimeExecutable": "python",
      "runtimeArgs": ["-m", "http.server", "3000"], "port": 3000 }
  ]
}
```

**macOS:**
```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "five-star-japan", "runtimeExecutable": "/opt/homebrew/bin/python3",
      "runtimeArgs": ["-m", "http.server", "3000"], "port": 3000 }
  ]
}
```

## リポジトリの注意

- **重い。** `.git` 約 359MB / `images` 約 329MB。`.psd`（数十MB）や `.docx` が
  コミットされているため。clone には時間がかかる
- 新しく巨大な元データを追加するときは、コミットする前にユーザーに確認する
- 改行コードは `.gitattributes` で LF に統一済み（Windows での差分ノイズ防止）

## 会社情報（問い合わせ先）

- FIVE-STAR JAPAN株式会社 / 代表取締役社長 中瀬 貞範 / 設立 2022年
- TEL: 090-5068-0298
- Email: five-starjapan_jimu@ymail.ne.jp
- 〒607-8426 京都府京都市山科区御陵下御廟野町１６番地
- 対応エリア: 関西一円 / 東海一円 / 四国（蜂のみ）/ 九州・熊本（車のみ）
