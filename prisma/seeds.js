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
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function clearDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Clearing existing data from the database...');
                    return [4 /*yield*/, prisma.productsOnCarts.deleteMany({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.productsOnOrders.deleteMany({})];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.cart.deleteMany({})];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.order.deleteMany({})];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany({})];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.product.deleteMany({})];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.coupon.deleteMany({})];
                case 7:
                    _a.sent();
                    console.log('Database cleared successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
function seedData() {
    return __awaiter(this, void 0, void 0, function () {
        var coupons, _i, coupons_1, coupon;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Call clearDatabase function to clear existing data
                return [4 /*yield*/, clearDatabase()];
                case 1:
                    // Call clearDatabase function to clear existing data
                    _a.sent();
                    // Seed users
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                userId: 1,
                                name: 'John Doe',
                                email: 'john.doe@example.com',
                                address: '123 Main St, Anytown, USA',
                                password: 'password1',
                                cart: {
                                    create: {},
                                },
                            },
                        })];
                case 2:
                    // Seed users
                    _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                userId: 2,
                                name: 'Jane Smith',
                                email: 'jane.smith@example.com',
                                address: '456 Oak Ave, Smalltown, USA',
                                password: 'password2',
                                cart: {
                                    create: {},
                                },
                                // No orders created for user2 in this example
                            },
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                userId: 3,
                                name: 'Michael Brown',
                                email: 'michael.brown@example.com',
                                address: '789 Elm Rd, Villageville, USA',
                                password: 'password3',
                                cart: {
                                    create: {},
                                },
                                // No orders created for user3 in this example
                            },
                        })];
                case 4:
                    _a.sent();
                    // Seed products
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                productId: 1,
                                name: 'Toy Car',
                                description: 'A miniature car for kids',
                                price: 15.99,
                                stock: 10,
                            },
                        })];
                case 5:
                    // Seed products
                    _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                productId: 2,
                                name: 'Doll',
                                description: 'A doll with movable parts',
                                price: 12.99,
                                stock: 8,
                            },
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                productId: 3,
                                name: 'Board Game',
                                description: 'A family board game',
                                price: 24.99,
                                stock: 5,
                            },
                        })];
                case 7:
                    _a.sent();
                    coupons = [
                        {
                            code: 'DISCOUNT10',
                            discount: 10.0,
                            expiryDate: new Date('2024-12-31'),
                        },
                        {
                            code: 'SAVE20',
                            discount: 20.0,
                            expiryDate: new Date('2024-12-31'),
                        },
                        {
                            code: 'FREESHIP',
                            discount: 5.0,
                            expiryDate: new Date('2024-12-31'),
                        },
                    ];
                    _i = 0, coupons_1 = coupons;
                    _a.label = 8;
                case 8:
                    if (!(_i < coupons_1.length)) return [3 /*break*/, 11];
                    coupon = coupons_1[_i];
                    return [4 /*yield*/, prisma.coupon.createMany({
                            data: coupon,
                        })];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 8];
                case 11:
                    console.log('Seed data created successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 5]);
                    return [4 /*yield*/, seedData()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error seeding data:', error_1);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, prisma.$disconnect()];
                case 4:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
main();
