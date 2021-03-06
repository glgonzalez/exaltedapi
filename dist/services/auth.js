"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const database_1 = require("../config/database");
class AuthService {
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield jwt.verify(token, process.env.JWT_SECRET);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    createToken(details) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof details !== 'object') {
                    details = {};
                }
                if (!details.maxAge || typeof details.maxAge !== 'number') {
                    details.maxAge = 3600;
                }
                return yield jwt.sign({ data: details.sessionData }, process.env.JWT_SECRET, {
                    expiresIn: details.maxAge,
                    algorithm: 'HS256'
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    verifyPassword(password, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt.compare(password, passwordHash);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    login(param) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.db.query(`select user_id, username, password, email from users where username = $1 or email = $1`, [param]);
                return response;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.AuthService = AuthService;
const authService = new AuthService();
exports.authService = authService;
