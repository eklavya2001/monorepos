"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupInput = void 0;
// now here we will define all the zod types
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
