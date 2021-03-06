"use strict";

// expressをロードしてアプリケーションを実体化する
const express = require("express"),
    app = express();
app.set("port", process.env.PORT || 3000);
// mongooseをロードしてデータベース接続を設定する
const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParser: true}
);
mongoose.Promise = global.Promise;
const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(layouts);
const subscribersController =require("./controllers/subscribersController");
const errorController = require("./controllers/errorController");

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// 経路
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
app.use(errorController.pageNotFoundError);  // ※順番に注意！エラー処理は経路の最後。
app.use(errorController.internalServerError); // ※順番に注意！エラー処理は経路の最後。

// アプリケーションがポート3000を監視
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});