# 作業ログ

新しいエントリは **一番上** に追加する。
Mac / Windows どちらで作業しても、ここを見れば続きから入れる状態にしておく。

---

## 2026-08-25（Windows）

### やったこと
- **カスタムドメイン適用完了 — https://fivestarjapan.com/ が正式URLに**
  - 前提調査: サイトは以前からGitHub Pagesで公開済みだった（fsjjimu.github.io/fivestarjapan）。
    Netlifyは未使用・未ログインと確認 → Netlify案は廃止し「GitHub Pages + Formspree」路線に決定
  - fivestarjapan.com はGoogle Workspace契約時にSquarespaceへ登録されていた（2026-01-31）。
    apex/www はSquarespace駐車ページ、starter.fivestarjapan.com はSTARTER本番（Cloudflare Pages）
  - Squarespace DNS: 既定値ブロック（apex A×4 + www CNAME + HTTPSレコード）を削除し、
    A×4 = 185.199.108〜111.153（GitHub Pages）と www CNAME = fsjjimu.github.io を追加。
    MX / SPF / DKIM / starter / _domainconnect は不可侵で維持（メールとSTARTERを守るため）
  - GitHub Pages: Custom domain = fivestarjapan.com（DNS check successful）→ 証明書発行後 Enforce HTTPS ON
  - 検証: apex 200 / http→https 301 / www 200 / 旧URL→新URL 301 / starter 200 すべて確認
- プライバシーポリシーページ `privacy.html` を新規作成。フッターとフォーム注記の `href="#"` を差し替え
  - HP用途に加え、STARTERアプリストア申請（Apple法人登録・両ストア審査）の必須要件を兼ねる
- 文言修正: 「通話料無料」を削除（番号が携帯090のため）、会社概要住所の「(蜂駆除の教習所!!)」を削除
- キャッシュバスター: contents.js v=27→28
- **問い合わせフォームをSSGform化（Netlify Forms廃止）** — 本番でテスト送信成功
  - サービス比較の結果、国産のSSGform（無料100件/月・広告なし・送信内容をDB保存しない）を採用
  - アカウント: jimu@fivestarjapan.com / フォーム名「HPお問い合わせ（fivestarjapan.com）」
  - 送信先URL: `https://ssgform.com/s/hwV81gy1yqF7`
  - 通知先: jimu@fivestarjapan.com と five-starjapan_jimu@ymail.ne.jp の2件 / 件名「【HP】お問い合わせフォーム受信」
  - 許可ホスト制限: fivestarjapan.com / www.fivestarjapan.com のみ（スパム対策・localhostからのテスト送信は弾かれるので注意）
  - 送信後転送先: `thanks.html`（新規作成・サイト同デザインの完了ページ）
  - フォームのname属性を日本語化（通知メールが読みやすい）・main.jsは二重送信防止のみに簡素化・v=19→20

- 通知メール（【HP】お問い合わせフォーム受信）のjimu@着信をMSRが確認 → **フォーム全経路の動作確認完了**
- **本番QRコード差し替え完了** — 仮QR（旧STUDIOプレビューURL: preview.studio.site/live/EjOQoyKdaJ）を解読し、
  役割が「PC閲覧者がスマホでサイトを開くQR」と判明。`images/qr-fivestarjapan.png` を生成
  （https://fivestarjapan.com/ 行き・デコード検証済み）して差し替え。contents.js v=28→29。
  旧 仮QRコード2.png はファイルとしては残置（参照なし）

- **STARTERアプリ専用プライバシーポリシー `starter-privacy.html` を新規作成**（Apple/Google審査で読まれる公開資料）
  - 既存 `privacy.html`（一般のお客様向け）とは別ページ。デザイン・配色・フォントは完全に統一
  - 審査要件を網羅: 収集項目5区分（利用者本人／お客様=第三者／写真ファイル／通知トークン／利用記録）を書き分け・
    **取得しない情報**（位置情報/広告ID/アクセス解析/Cookie追跡/生体情報）を明記・
    委託先3社と**日本国内（東京リージョン）保管**・7年法定保存とアカウント削除の関係・
    **アプリ内「設定」からの削除導線**（Apple Guideline 5.1.1(v)）・招待制のクローズドシステムである旨
  - 連絡先は `<!-- 連絡先 ここから／ここまで -->` で囲み、ドメインメール移行時に1箇所だけ編集すれば済む形に
  - 目次（アンカーリンク）付き・`privacy.html` の末尾から相互リンク

### 次にやること
- [ ] **STARTER側の実装**: アプリ内「設定」画面にアカウント削除の申請導線を作る
      （starter-privacy.html に「アプリ内から削除申請できる」と明記したため、実装が必要。Apple Guideline 5.1.1(v)）
- [ ] ストア申請時、App Privacy（Apple）/ Data safety（Google）の申告内容を starter-privacy.html と一致させる
- [ ] 連絡先をドメインメール（jimu@fivestarjapan.com 等）へ差し替え（両プライバシーポリシーの連絡先ブロック）
- [ ] 重複リポジトリ `five-star-japan`（ハイフンあり）の整理（Pages無効化 or アーカイブ）
- [ ] D-U-N-S番号申請への着手（STARTERストア配信Phase 0。HP公開でApple法人登録の公開サイト要件はクリア済み）

### 判断メモ
- Netlify移行は取りやめ。GitHub Pagesで公開済み・ドメイン適用済みのため、フォームだけFormspreeに差し替える方が変更が小さい
- DNS編集はSquarespaceのドメイン管理画面（fsj@fivestarjapan.com のGoogleログイン）。変更のたびにGoogle再認証ポップアップが出る仕様
- HP公開によりAppleの法人登録要件「組織ドメインの機能する公開Webサイト」（FSJ関連/CLAUDE.mdの🔴項目）が解消。同ファイルも✅に更新済み

---

## 2026-08-24（macOS）

### やったこと
- Windows PC へ作業を引き継ぐための仕組みを整備した
  - `CLAUDE.md` を新規作成（プロジェクト構成・編集の大原則・注意点・OS別プレビュー設定）
  - `.claude/commands/handoff.md` を新規作成（`/handoff` および「引き継ぎ」キーワードで起動）
  - `WORKLOG.md`（このファイル）を新規作成
  - `.gitignore` を修正 — `.claude/` 全体の除外をやめ、`settings.local.json` と
    `launch.json` だけを除外するようにした。これで `commands/` が全マシンで共有される
  - `.gitattributes` を追加 — 改行コードを LF に統一し、Windows での差分ノイズを防ぐ

### 確認済みの状態
- `js/contents.js` が参照する画像は **すべて実在**（欠損なし）
- サイト本体（HTML / CSS / JS / 画像）は前回コミット `5f89101` から変更なし

### 次にやること
- [ ] Windows 側で clone して `/handoff` が正しく動くか確認する
- [ ] Netlify に公開済みかどうかを確認する（未公開なら公開作業）
- [ ] `company.qrImg` が `images/仮QRコード2.png` のまま＝**仮のQRコード**。本番用に差し替える
- [ ] フッターの「プライバシーポリシー」リンクが `href="#"` のまま。ページを作るか、リンクを外す
- [ ] `contact-tel-sub` に「通話料無料」とあるが、番号は携帯（090-5068-0298）。文言の整合性を確認する

### 判断メモ
- `.claude/launch.json` は gitignore のままにした。Python の実行パスが OS ごとに違い、
  共有すると片方で必ず壊れるため。各マシンで作成する（手順は `CLAUDE.md` に記載）
- リポジトリが重い（`.git` 359MB / `images` 329MB）のは `.psd` と `.docx` の元データを
  コミットしているため。履歴から削れば軽くなるが、元データを失うリスクがあるので今回は触らない
