"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
var express = require('express');
var app = express();
var cors = require('cors');
var User = require('./models/User');
app.use(express.json());
var corsOptions = {
    origin: ['http://localhost:4000', 'http://localhost:3000']
};
app.use(cors(corsOptions));
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
app.get('/', function (req, res) {
    res.json('loginn success');
});
app.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, user, hashpassword, newUser, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                console.log("usermodel was");
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (user) {
                    res.json("user already exists");
                }
                return [4 /*yield*/, bcrypt.hash(password, 12)];
            case 3:
                hashpassword = _b.sent();
                return [4 /*yield*/, User.create(__assign(__assign({}, req.body), { password: hashpassword }))];
            case 4:
                newUser = _b.sent();
                token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
                    expiresIn: '90d'
                });
                res.status(201).json({
                    status: "success",
                    message: "user registered",
                    token: token,
                });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                res.json(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, user, isPasswordValid, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user)
                    res.json('user not found');
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                isPasswordValid = _b.sent();
                if (!isPasswordValid)
                    res.json("Invalid email or password");
                token = jwt.sign({ _id: user._id }, 'secretkey123', {
                    expiresIn: '90d'
                });
                res.status(201).json({
                    status: "success",
                    message: "user login successfully",
                    token: token,
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
app.listen(4000);
exports.default = app;
