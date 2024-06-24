# chillka README

<img width="1483" alt="Screenshot 2024-06-24 at 3 27 50 PM" src="https://github.com/ChillKa/chillka-frontend/assets/70035368/7743c3ab-cd0f-4227-8300-2040b0337ab1">

- [線上觀看連結](https://chillka-frontend.vercel.app/)

## 功能

測試帳號密碼

```bash
帳號： coach@gmail.com
密碼： qwer1234
```

- 登入
- 登出

## 畫面
單一活動頁面
![image](https://github.com/ChillKa/chillka-frontend/assets/70035368/facff796-bda9-4d96-8733-700035a31b7d)
搜尋活動頁面
![Untitled](https://github.com/ChillKa/chillka-frontend/assets/70035368/ec085eec-42a8-4187-813c-2c87676e67b1)
新增活動頁面
<img width="1344" alt="Screenshot 2024-06-24 at 1 15 13 PM" src="https://github.com/ChillKa/chillka-frontend/assets/70035368/51a6e07a-5b88-4e8d-91d7-e7481dab857f">
票券頁面
<img width="774" alt="截圖 2024-06-24 下午2 56 00" src="https://github.com/ChillKa/chillka-frontend/assets/70035368/0b757c7d-ad61-495d-820f-47f33a773fea">

## 安裝

以下將會引導你如何安裝此專案到你的電腦上。
Node.js 版本建議為：`18.18.0` 以上...

### 取得專案

```bash
git clone git@github.com:ChillKa/chillka-frontend.git
```

### 移動到專案內

```bash
cd chillka-frontend
```

### 安裝套件
需要設定.npmrc, 才能正常安裝tiptap (WYSIWYG)的pro 套件

```
@tiptap-pro:registry=https://registry.tiptap.dev/
//registry.tiptap.dev/:_authToken={你的tiptap API key}
```
- 詳情請參考：https://cloud.tiptap.dev/pro-extensions（需登入）

接著
```bash
yarn
```

### 環境變數設定

請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。

### 運行專案

```bash
yarn dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:3535/
```

## 環境變數說明

```env
JWT_SECRET= # JWT 認證密鑰
API_ENDPOINT= # 後端網址 
NEXT_PUBLIC_MAPS_API_KEY= # Google 地圖 API 密鑰 
```

## 資料夾說明

- public - 靜態檔案放置處
- src - 程式碼放置處
    - action - Next.js server actions
    - app - 路徑放置處
        - route - Next.js Route Handlers
    - components - React 元件
    - hooks - React hooks
    - store - 儲存內部狀態
    - type - 串接API的型別
    - lib - Zod Schema, 或其他共用程式碼
- .github - CI/CD (github action)
- .husky - husky檔案
- .vscode - visual studio code 的設定

## 專案技術

- Node.js v18.18
- Next.js v14.2.1
- tailwindcss
- shadcn(with radix)
- Framer-motion
- TypeScript
- React Hook Form
- husky
- tiptap (WYSIWYG 文字編輯器)

## 第三方服務

- Google Map API

## CI/CD 說明

此專案有使用 Github Actions，所以發起 PR 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 部署到vercel上，並產生preview url 在PR上

當專案 merge 到 main 時會自動執行以下動作：

- 建立 Node.js 環境
- 安裝相依套件
- 編譯程式碼
- 部署到vercel上

## 其他
### chillka 的github使用手冊

[前端環境指南](https://www.notion.so/chillka-83254641906b46e690ed2fab71f9179d)

## 聯絡作者

你可以透過以下方式與我們聯絡

Zim
- TBA

Louis
- [GitHub](https://github.com/ellallu0903)

Felix
- [GitHub](https://github.com/fufuShih)

Brian
- [個人網站](https://po-cheng-yeh.vercel.app)
- [linkedin](https://www.linkedin.com/in/po-cheng-yeh/)
- [GitHub](https://github.com/blp100)

# 後端連結
- [GitHub連結](https://github.com/ChillKa/chillka-backend)

## 專案協作作者（後端）
Mia 
- [GitHub](https://github.com/miamai)

Ben
- TBA
