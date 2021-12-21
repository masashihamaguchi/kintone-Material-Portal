# kintone Material Portal

kintoneのポータルテンプレートです。

ポータルに表示するアプリをkintoneアプリで管理することができます。

詳しくはこちらをご覧ください。

> [kintoneのポータル画面をカスタマイズした話](https://qiita.com/MasashiHamaguchi/items/52312b6a077e474329c5)

## ファイル説明

`templates`

→ ポータル画面のテンプレートとポータルを管理するためのアプリのテンプレートが入っています。

`src`

→ カスタマイズのソースコードが入っています。さらにカスタマイズしたい方はこちらを参考にしてください。

## 使い方

### 1. ポータル管理用のアプリを作成

`templates`ディレクトリにあるkintoneのアプリテンプレート2つをダウンロードして、使用しているkintone環境に新しくアプリを作成してください。

アプリを作成後、それぞれのアプリIDをメモしておいてください。

- 【Portal】ポータル管理アプリ
- 【Portal】お知らせ管理アプリ

### 2. Kintone Portal Designerでテンプレートファイルを読み込む

サイボウズが提供しているKintone Portal DesignerをChromeに追加します。

※すでに追加している方はスキップしてください。

> [Kintone Portal Designer](https://chrome.google.com/webstore/detail/kintone-portal-designer/kmedncknheiegbelfmcfdlpcpfbnklmo)

githubの`templates`ディレクトリにある[`material-portal.json`]()をダウンロードします。

Portal Designerのエディター画面を開いて、ImportボタンからダウンロードしたJSONファイルを読み込みます。

※Kintone Portal Designerの使い方については、cybozu developer networkの記事をご覧ください。

> [Kintone Portal Designerを使ってポータルをデザインしよう](https://developer.cybozu.io/hc/ja/articles/360030856652)

### 3. パラメータの設定

Portal Designerのエディター画面にあるJavaScriptのタブを開き、1で作成したアプリのIDとフッターを設定します。

```JavaScript:main.js
// ウィジェット管理アプリ
const PORTAL_MANAGEMENT_APP_ID = 0;
// ポータルお知らせアプリ
const NOTICE_APP_ID = 0;
// Footer
const FOOTER = '©︎ Material Portal';
```

「0」となっているところを各アプリIDに書き換えます。フッターの設定は任意です。

### 4. ライブラリの読み込み

このポータルテンプレートではjQuery、Vue.js、Google Fontsを使用しています。

kintoneシステム管理設定にある「JavaScript / CSSでカスタマイズ」を開いて、JavaScriptファイルとCSSファイルをCDNから読み込みます。設定ページは以下のURLです。

`https://{subdomain}.cybozu.com/k/admin/system/customize/`

必ずしも記載通りのURLである必要はありませんが、動作確認はこの環境で行っています。

**PC用のJavaScriptファイル**

`https://js.cybozu.com/jquery/3.6.0/jquery.min.js`
`https://unpkg.com/vue@3.2.23/dist/vue.global.prod.js`

**PC用のCSSファイル**

`https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500&display=swap`

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/066bb886-0612-cc90-e9e4-3824b6934682.png)

### 5. アプリの設定

1で作成したアプリにレコードを追加して、ポータルの設定を行います。

#### 【Portal】ポータル管理アプリ

ポータルに表示するアプリを管理するアプリです。1レコードが1つのアプリグループに対応しています。

レコードを追加することでアプリグループを追加することができます。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/c32cbeaa-8cc4-dd9d-02f7-f5ac4ea11fb7.png)

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/df0f0ed5-940b-e305-3535-76f5aa4c73dd.png)

#### 【Portal】お知らせ管理アプリ

ポータルに表示するお知らせを管理するアプリです。1レコードが1つのお知らせに対応しています。

レコードを追加することで新しいお知らせを追加することができます。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/23adb4aa-cba1-c3a8-5d2a-6d3c8be1683f.png)

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/ebc75ca9-eb46-962f-5073-405665693f8e.png)![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/cf7a8cb2-ca3b-5dbb-2ec1-0b420f1c17c8.png)

kintoneのポータル画面を開いて、ポータルが正しく表示されていることを確認します。

※Portal Designerが有効になっていることを確認してください。

<img alt="image.png" width="200" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/5971debb-a602-b521-f4c3-8da135d82771.png">

すでにポータル画面に何かしらのカスタマイズをしている場合は、211行目のコメントアウトを外してください。

```JavaScript:main.js
// for development
$('.kintone-portal-designer-html').css('display', 'none');
```

### 6. ポータル画面の反映

Portal Designerのエディター画面にあるExportボタンを押して「Export as JavaScript (Desktop)」を選択してカスタマイズ用ファイルダウンロードします。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/d75955a4-57b0-fd46-7145-f0f80b687e2d.png)

4で設定した「JavaScript / CSSでカスタマイズ」を開いて、カスタマイズ用のファイルをアップロードします。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/390de416-0761-83fb-116c-6d032c77cbd9.png)

ポータルの設定画面を開き、コンテンツを全て非表示にします。

※表示していも問題はありません。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/e65438a7-e9f1-e7eb-1cd5-ddedb7614e99.png)


ポータル画面を開いて、正しく表示されていたら完成です！

※Portal Designerが無効になっていることを確認してください。（正しく表示されないことがあります）

<img alt="image.png" width="200" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/245180/c348cd78-e64f-b473-6472-59cf78c68ce1.png">


## 表示するアプリ・お知らせを変更するとき

表示するアプリやお知らせの内容を変更したい時は、今回作成した2つのアプリを編集すればOKです。
Portal Designerを使って変更を加える必要はありません。
