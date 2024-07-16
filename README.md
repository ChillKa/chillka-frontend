# chillka - README

![首頁](https://i.imgur.com/KZiNovQ.jpeg)

<br/>

<center>
    <font size='4'>
        <a href="https://chillka-frontend.vercel.app/">🚀 DEMO</a>
    </font>
</center>

## 功能

測試帳號密碼：

```bash
帳號： coach@gmail.com
密碼： qwer1234
```

- 登入
- 登出

<br/>

## 畫面

- 單一活動頁面
  ![單一活動頁面](https://i.imgur.com/CgM2bqS.jpeg)
- 搜尋活動頁面
  ![搜尋活動頁面](https://i.imgur.com/He2nxox.jpeg)
- 新增活動頁面
  ![新增活動頁面](https://i.imgur.com/Qhb9HNn.jpeg)
- 票券頁面
  ![票券頁面](https://i.imgur.com/PoJM2N7.jpeg)

<br/>

## 安裝

以下將會引導你如何安裝此專案到你的電腦上。
Node.js 版本建議為：`18.18.0` 以上。

<br/>

### 取得專案

```bash
git clone git@github.com:ChillKa/chillka-frontend.git
```

<br/>

### 移動到專案內

```bash
cd chillka-frontend
```

<br/>

### 安裝套件

必須先設定 `.npmrc`，才能正常安裝 tiptap（WYSIWYG）的 pro 套件

```
@tiptap-pro:registry=https://registry.tiptap.dev/
//registry.tiptap.dev/:_authToken={你的tiptap API key}
```

- 詳情請參考（需登入）：https://cloud.tiptap.dev/pro-extensions

接著執行

```bash
yarn
```

<br/>

### 環境變數設定

請在終端機輸入 `cp .env.example .env` 來複製 `.env.example` 檔案，並依據 `.env` 內容調整相關欄位。

<br/>

### 運行專案

```bash
yarn dev
```

<br/>

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:3535/
```

<br/>

## 環境變數說明

```env
JWT_SECRET= # JWT 認證密鑰
API_ENDPOINT= # 後端網址
NEXT_PUBLIC_GOOGLE_MAP_API_KEY= # Google 地圖 API 密鑰
```

<br/>

## 資料夾說明

- public - 靜態檔案放置處
- src - 程式碼放置處
  - action - Next.js Server Actions
  - app - 路徑放置處
    - route - Next.js Route Handlers
  - components - React 元件
  - hooks - React hooks
  - store - 儲存內部狀態
  - type - 串接 API 的型別
  - lib - Zod Schema，或其他共用程式碼
- .github - CI/CD (GitHub Actions)
- .husky - Husky 檔案
- .vscode - Visual Studio Code 的設定

<br/>

## 專案技術

- Node.js v18.18
- Next.js v14.2.1
- Tailwind CSS
- shadcn/ui (with radix)
- Framer Motion
- TypeScript
- React Hook Form
- Husky
- tiptap（WYSIWYG 文字編輯器）

<br/>

## 第三方服務

- Google Maps API

<br/>

## CI/CD 說明

此專案有使用 GitHub Actions，所以發起 PR 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 部署到 Vercel 上，並產生 preview url 在 PR 上

當專案 merge 到 main 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 部署到 Vercel 上

<br/>

## 其他

### chillka 的使用手冊

通用操作

- [使用者登入](https://childlike-overcoat-a86.notion.site/3cae6a11888344a89ec8eee1504f18aa)

活動舉辦者

- [舉辦者創建活動](https://childlike-overcoat-a86.notion.site/59de1ed2d9934a2f8a0f2e93b788818e)
- [舉辦者檢驗票券](https://childlike-overcoat-a86.notion.site/16ed1fdebee14ee38cc96fc2225df6c9)

活動參加者

- [參加者搜尋與參加活動](https://childlike-overcoat-a86.notion.site/e165e810e02b48129b702b3f30521167)
- [參加者出示票券](https://childlike-overcoat-a86.notion.site/5082b50383ce48f1b497696a23d02347)

<br />

## 聯絡作者

你可以透過以下方式與我們聯絡

Zim

- [LinkedIn](www.linkedin.com/in/zim314)
- [GitHub](https://github.com/zim314)

Louis

- [GitHub](https://github.com/ellallu0903)

Felix

- [個人網站](https://felixshih.com/)
- [GitHub](https://github.com/fufuShih)

Brian

- [個人網站](https://po-cheng-yeh.vercel.app)
- [LinkedIn](https://www.linkedin.com/in/po-cheng-yeh/)
- [GitHub](https://github.com/blp100)

<br />

# 後端連結

- [chillka-backend](https://github.com/ChillKa/chillka-backend)

<br />

## 專案協作作者（後端）

Mia

- [LinkedIn](https://www.linkedin.com/in/chih-yi-mai-b302391aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- [GitHub](https://github.com/miamai)

Ben

- [GitHub](https://github.com/cedarwud)
