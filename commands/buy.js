"use strict";

var machinomy = require("../index"),
    web3 = machinomy.web3;

var buy = function (uri) {
    var settings = machinomy.configuration.sender();

    web3.personal.unlockAccount(settings.account, settings.password, 1000);

    var transport = new machinomy.Transport();
    var storage = new machinomy.Storage(settings.databaseFile, "sender");
    var client = new machinomy.Client(settings.account, machinomy.contract, transport, storage);
    client.buy(uri, function (error, price, callback) {
        if (error) throw error;
        var value = price * 10;
        callback(null, value, function (error, response) {
            if (error) throw error;
            console.log(response.body);
        });
    });
};

module.exports = buy;