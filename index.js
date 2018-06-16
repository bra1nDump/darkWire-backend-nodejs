const express = require('express');
const md5 = require("md5");

var SignalingToken = {};

var get = function(appid, appcertificate, account, validTimeInSeconds){
    var expiredTime = parseInt(new Date().getTime() / 1000)+ validTimeInSeconds;
    var token_items = [];

    //append SDK VERSION
    token_items.push("1");

    //append appid
    token_items.push(appid);

    //expired time
    token_items.push(expiredTime);

    //md5 account + appid + appcertificate + expiredtime
    token_items.push(md5(account + appid + appcertificate + expiredTime));

    return token_items.join(":");
}

//convenience function to get token valid within 1 day
var get1DayToken = function(appid, appcertificate, account){
    return get(appid, appcertificate, account, 3600 * 24);
}

const app = express();

app.get('/getToken/:account', (req, res) => {
    const account = req.params.account;
    res.send(get1DayToken("fe28615cf12e443983130a00cb07c939",
                          "31b43406da9348fa82d507438134721a",
                          account));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('Example app listening on port !' + port));


