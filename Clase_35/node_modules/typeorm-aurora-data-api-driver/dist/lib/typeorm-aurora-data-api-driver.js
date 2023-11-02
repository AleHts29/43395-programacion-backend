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
        while (_) try {
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
exports.PostgresQueryTransformer = exports.MysqlQueryTransformer = exports.pg = void 0;
// @ts-ignore
var data_api_client_1 = require("data-api-client");
var query_transformer_1 = require("./query-transformer");
Object.defineProperty(exports, "MysqlQueryTransformer", { enumerable: true, get: function () { return query_transformer_1.MysqlQueryTransformer; } });
Object.defineProperty(exports, "PostgresQueryTransformer", { enumerable: true, get: function () { return query_transformer_1.PostgresQueryTransformer; } });
var DataApiDriver = /** @class */ (function () {
    function DataApiDriver(region, secretArn, resourceArn, database, loggerFn, queryTransformer, serviceConfigOptions, formatOptions, queryConfigOptions) {
        if (loggerFn === void 0) { loggerFn = function () { return undefined; }; }
        this.region = region;
        this.secretArn = secretArn;
        this.resourceArn = resourceArn;
        this.database = database;
        this.loggerFn = loggerFn;
        this.queryTransformer = queryTransformer;
        this.serviceConfigOptions = serviceConfigOptions;
        this.formatOptions = formatOptions;
        this.queryConfigOptions = queryConfigOptions;
        this.region = region;
        this.secretArn = secretArn;
        this.resourceArn = resourceArn;
        this.database = database;
        this.loggerFn = loggerFn;
        this.serviceConfigOptions = serviceConfigOptions || {};
        this.serviceConfigOptions.region = region;
        this.client = data_api_client_1.default({
            secretArn: secretArn,
            resourceArn: resourceArn,
            database: database,
            options: this.serviceConfigOptions,
            formatOptions: formatOptions,
        });
        this.queryTransformer = queryTransformer;
        this.queryConfigOptions = serviceConfigOptions === null || serviceConfigOptions === void 0 ? void 0 : serviceConfigOptions.queryConfigOptions;
    }
    DataApiDriver.prototype.query = function (query, parameters) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var transformedQueryData, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        transformedQueryData = this.queryTransformer.transformQueryAndParameters(query, parameters);
                        this.loggerFn(transformedQueryData.queryString, transformedQueryData.parameters);
                        return [4 /*yield*/, this.client.query({
                                sql: transformedQueryData.queryString,
                                parameters: transformedQueryData.parameters,
                                transactionId: this.transactionId,
                                continueAfterTimeout: (_b = (_a = this.queryConfigOptions) === null || _a === void 0 ? void 0 : _a.continueAfterTimeout) !== null && _b !== void 0 ? _b : false,
                            })
                            // TODO: Remove this hack when all Postgres calls in TypeORM use structured result
                        ];
                    case 1:
                        result = _c.sent();
                        // TODO: Remove this hack when all Postgres calls in TypeORM use structured result
                        if (result.records) {
                            result = result.records;
                            result.records = result;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DataApiDriver.prototype.preparePersistentValue = function (value, columnMetadata) {
        return this.queryTransformer.preparePersistentValue(value, columnMetadata);
    };
    DataApiDriver.prototype.prepareHydratedValue = function (value, columnMetadata) {
        return this.queryTransformer.prepareHydratedValue(value, columnMetadata);
    };
    DataApiDriver.prototype.startTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transactionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.beginTransaction()];
                    case 1:
                        transactionId = (_a.sent()).transactionId;
                        this.transactionId = transactionId;
                        return [2 /*return*/];
                }
            });
        });
    };
    DataApiDriver.prototype.commitTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.commitTransaction({ transactionId: this.transactionId })];
                    case 1:
                        _a.sent();
                        this.transactionId = undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    DataApiDriver.prototype.rollbackTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.rollbackTransaction({ transactionId: this.transactionId })];
                    case 1:
                        _a.sent();
                        this.transactionId = undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    return DataApiDriver;
}());
var createMysqlDriver = function (region, secretArn, resourceArn, database, loggerFn, serviceConfigOptions, formatOptions) {
    if (loggerFn === void 0) { loggerFn = function () { return undefined; }; }
    return new DataApiDriver(region, secretArn, resourceArn, database, loggerFn, new query_transformer_1.MysqlQueryTransformer({ enableUuidHack: formatOptions === null || formatOptions === void 0 ? void 0 : formatOptions.enableUuidHack }), serviceConfigOptions, formatOptions);
};
exports.default = createMysqlDriver;
var createPostgresDriver = function (region, secretArn, resourceArn, database, loggerFn, serviceConfigOptions, formatOptions) {
    if (loggerFn === void 0) { loggerFn = function () { return undefined; }; }
    return new DataApiDriver(region, secretArn, resourceArn, database, loggerFn, new query_transformer_1.PostgresQueryTransformer({ enableUuidHack: formatOptions === null || formatOptions === void 0 ? void 0 : formatOptions.enableUuidHack }), serviceConfigOptions, formatOptions);
};
exports.pg = createPostgresDriver;
//# sourceMappingURL=typeorm-aurora-data-api-driver.js.map