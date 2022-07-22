"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_1 = require("../utils/functions/sanitize");
describe("Sanitize", () => {
    test("Sanitize <script>", () => {
        expect((0, sanitize_1.Sanitize)({ field: "<script>alert('hello')</script>" })).toEqual({
            field: "&lt;script&gt;alert('hello')&lt;/script&gt;",
        });
    });
    test("Sanitize <img>", () => {
        expect((0, sanitize_1.Sanitize)({ field: "<img src='null' onerror='alert(1)'/>" })).toEqual({ field: "<img src />" });
    });
    test("Sanitize child fields", () => {
        expect((0, sanitize_1.Sanitize)({
            field: {
                child: "<script>alert('hello')</script>",
            },
        })).toEqual({
            field: { child: "&lt;script&gt;alert('hello')&lt;/script&gt;" },
        });
    });
});
