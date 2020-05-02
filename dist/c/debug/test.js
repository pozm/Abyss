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
const class_1 = require("../../m/class");
module.exports = class test extends class_1.Command {
    constructor() {
        super({
            Name: 'test',
            Desc: 'Casual test to see if command handler is working.',
            Guild: false,
            Owner: true,
            Hidden: true,
            Args: [new class_1.CommandArgument({
                    Name: 'Test',
                    Needed: true,
                    Type: "bool",
                    Perms: null,
                    Position: 'all'
                })]
        });
        this.run = (message, client, args) => __awaiter(this, void 0, void 0, function* () {
            console.log('Test worked!', args);
            return { Worked: true };
        });
    }
};
