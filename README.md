# 花蓮隨手查

公開的花蓮景點、美食、住宿、交通資訊與互動地圖。以 JSON 資料檔維護，不依賴 Google Sheet 或 Sites。

## 本機開發
需要 Node.js 22 以上，無須安裝套件。

```sh
npm run dev
```

開啟 http://127.0.0.1:8765/ 。再次啟動即可重新產生與開啟預覽。只有本機開發需要此程序；公開網站由 GitHub Pages 提供，可跨裝置開啟。

## 資料與協作
地點資料在 `data/places.json`，頁面在 `public/`，建置時產生 `dist/data.js`。兩個 Agent 的責任與交接規則在 `AGENTS.md`。一般資訊修改只需資料 PR，通過檢查後合併；無須讓第二個 Agent 為相同資料重改頁面。

## 發布
將專案推送至指定 GitHub repository，預設分支使用 main。在 Settings → Pages → Build and deployment 選擇 GitHub Actions。PR 執行檢查與建置；合併至 main 後自動發布。以成功 Actions deployment 輸出的網址為準。Repository：https://github.com/Li1ycoris/hualien-travel 。公開網址請以成功的 Actions deployment 結果為準。

目前沿用網站已有的 18 筆資料，本次遷移沒有重新核實所有店家資訊。照片出處與授權顯示於頁尾，Leaflet 授權保留於 vendor 檔案。地圖需連線載入 OpenStreetMap 圖磚。
