"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// modules for express server
var express_1 = require("express");
var cookie_parser_1 = require("cookie-parser");
var morgan_1 = require("morgan");
// enable .env file
require("dotenv/config");
// Database modules
var mongoose_1 = require("mongoose");
var db_1 = require("./db");
mongoose_1.default.connect(db_1.default.localURI);
// DB Connection Events
mongoose_1.default.connection.on('connected', function () {
    console.log("Connected to MongoDB");
});
mongoose_1.default.connection.on('disconnected', function () {
    console.log('Disconnected from MongoDB');
});
var index_1 = require("../Routes/index");
var app = (0, express_1.default)();
// middleware modules
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use('/api/', index_1.default);
exports.default = app;
