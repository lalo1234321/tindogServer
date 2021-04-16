"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const userModel_1 = require("../models/userModel");
const petModel_1 = require("../models/petModel");
router.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    try {
        const user = new userModel_1.default(body);
        yield user.save();
        res.status(200).json({
            msg: "usuario guardado",
            user
        });
    }
    catch (err) {
        res.status(500).json({
            err
        });
    }
}));
router.post('/pet', (req, res) => {
    let body = req.body;
    const pet = new petModel_1.default(body);
    pet.save((err, petDoc) => {
        if (err)
            return res.status(500).json(err);
        res.status(200)
            .json({
            message: 'Pet registered'
        });
    });
});
router.get('/user', (req, res) => {
    let query = userModel_1.default.find().populate('ownedPets');
    query.exec((err, userDoc) => {
        res.json({
            result: userDoc
        });
    });
});
module.exports = router;
//# sourceMappingURL=testRoutes.js.map