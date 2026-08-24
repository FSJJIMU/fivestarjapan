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

### 次にやること
- [ ] 問い合わせフォームのFormspree化（現状Netlify Forms前提のためGitHub Pages上では送信エラーになり届かない。Formspree無料登録はMSR本人が実施）
- [ ] `company.qrImg` の本番QRコード差し替え（仮QRコード2.png のまま・保留中）
- [ ] 重複リポジトリ `five-star-japan`（ハイフンあり）の整理（Pages無効化 or アーカイブ）

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
