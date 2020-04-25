"use strict";

// subscriberモデルをロード
const Subscriber = require("../models/subscriber");

//すべての見込客の情報を取得
exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
        .exec()
        .then((subscribers) => {
            res.render("subscribers" {
                subscribers: subscribers
            });
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log("promise complete");
        });
};

// contactページを表示する
exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

// 見込客の情報を保存
exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    newSubscriber.save()
        .then(() => {
            res.render("thanks");
        })
        .catch(error => {
            res.send("error");
        });
};