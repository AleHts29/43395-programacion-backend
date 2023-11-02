"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresQueryTransformer = void 0;
var transform_utils_1 = require("../utils/transform.utils");
var query_transformer_1 = require("./query-transformer");
var PostgresQueryTransformer = /** @class */ (function (_super) {
    __extends(PostgresQueryTransformer, _super);
    function PostgresQueryTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostgresQueryTransformer.prototype.preparePersistentValue = function (value, metadata) {
        if (!value) {
            return value;
        }
        switch (metadata.type) {
            case 'date':
                return {
                    value: transform_utils_1.dateToDateString(value),
                    cast: 'DATE',
                };
            case 'time':
                return {
                    value: transform_utils_1.dateToTimeString(value),
                    cast: 'TIME',
                };
            case 'time with time zone':
                return {
                    value: transform_utils_1.dateToTimeString(value),
                    cast: 'time with time zone',
                };
            case 'timetz':
                return {
                    value: transform_utils_1.dateToTimeString(value),
                    cast: 'timetz',
                };
            case 'interval':
                return {
                    value: value,
                    cast: 'interval',
                };
            case 'timestamp':
            case 'datetime':
            case 'timestamp with time zone':
            case 'timestamptz':
                return {
                    value: transform_utils_1.dateToDateTimeString(value),
                    cast: 'TIMESTAMP',
                };
            case 'decimal':
            case 'numeric':
                return {
                    value: '' + value,
                    cast: transform_utils_1.getDecimalCast(metadata),
                };
            case 'simple-array':
                return {
                    value: transform_utils_1.simpleArrayToString(value),
                };
            case 'simple-json':
            case 'json':
            case 'jsonb':
                return {
                    value: JSON.stringify(value),
                    cast: 'JSON',
                };
            case 'uuid':
                return {
                    value: '' + value,
                    cast: 'UUID',
                };
            case 'simple-enum':
            case 'enum':
                return {
                    value: '' + value,
                    cast: metadata.enumName || metadata.entityMetadata.tableName + "_" + metadata.databaseName.toLowerCase() + "_enum",
                };
            default:
                return {
                    value: value,
                };
        }
    };
    PostgresQueryTransformer.prototype.prepareHydratedValue = function (value, metadata) {
        if (value === null || value === undefined) {
            return value;
        }
        switch (metadata.type) {
            case Boolean:
                return !!value;
            case 'datetime':
            case Date:
            case 'timestamp':
            case 'timestamp with time zone':
            case 'timestamp without time zone':
            case 'timestamptz':
                return typeof value === 'string' ? new Date(value + ' GMT+0') : value;
            case 'date':
                return transform_utils_1.dateToDateString(value);
            case 'time':
                return value;
            case 'hstore':
                if (metadata.hstoreType === 'object') {
                    var unescapeString_1 = function (str) { return str.replace(/\\./g, function (m) { return m[1]; }); };
                    var regexp = /"([^"\\]*(?:\\.[^"\\]*)*)"=>(?:(NULL)|"([^"\\]*(?:\\.[^"\\]*)*)")(?:,|$)/g;
                    var object_1 = {};
                    ("" + value).replace(regexp, function (_, key, nullValue, stringValue) {
                        object_1[unescapeString_1(key)] = nullValue ? null : unescapeString_1(stringValue);
                        return '';
                    });
                    return object_1;
                }
                return value;
            case 'simple-array':
                return typeof value === 'string' ? transform_utils_1.stringToSimpleArray(value) : value;
            case 'json':
            case 'simple-json':
            case 'jsonb':
                return typeof value === 'string' ? JSON.parse(value) : value;
            case 'enum':
            case 'simple-enum':
                if (metadata.isArray) {
                    // manually convert enum array to array of values (pg does not support, see https://github.com/brianc/node-pg-types/issues/56)
                    value = value !== '{}' ? value.substr(1, value.length - 2)
                        .split(',') : [];
                    // convert to number if that exists in possible enum options
                    return value.map(function (val) { return (!Number.isNaN(+val) && metadata.enum.indexOf(parseInt(val, 10)) >= 0 ? parseInt(val, 10) : val); });
                }
                // convert to number if that exists in poosible enum options
                return !Number.isNaN(+value) && metadata.enum.indexOf(parseInt(value, 10)) >= 0 ? parseInt(value, 10) : value;
            default:
                return value;
        }
    };
    PostgresQueryTransformer.prototype.transformQuery = function (query) {
        var quoteCharacters = ["'", '"'];
        var newQueryString = '';
        var currentQuote = null;
        for (var i = 0; i < query.length; i += 1) {
            var currentCharacter = query[i];
            var currentCharacterEscaped = i !== 0 && query[i - 1] === '\\';
            if (currentCharacter === '$' && !currentQuote) {
                newQueryString += ':param_';
            }
            else {
                newQueryString += currentCharacter;
                if (quoteCharacters.includes(currentCharacter) && !currentCharacterEscaped) {
                    if (!currentQuote) {
                        currentQuote = currentCharacter;
                    }
                    else if (currentQuote === currentCharacter) {
                        currentQuote = null;
                    }
                }
            }
        }
        return newQueryString;
    };
    PostgresQueryTransformer.prototype.transformParameters = function (parameters) {
        var _this = this;
        if (!parameters) {
            return parameters;
        }
        return parameters.map(function (parameter, index) {
            var _a;
            if (parameter === undefined) {
                return parameter;
            }
            if (typeof parameter === 'object' && typeof (parameter === null || parameter === void 0 ? void 0 : parameter.value) !== 'undefined') {
                return (__assign({ name: "param_" + (index + 1) }, parameter));
            }
            // Hack for UUID
            if (((_a = _this.transformOptions) === null || _a === void 0 ? void 0 : _a.enableUuidHack) && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test('' + parameter)) {
                return {
                    name: "param_" + (index + 1),
                    value: '' + parameter,
                    cast: 'uuid',
                };
            }
            return {
                name: "param_" + (index + 1),
                value: parameter,
            };
        });
    };
    return PostgresQueryTransformer;
}(query_transformer_1.QueryTransformer));
exports.PostgresQueryTransformer = PostgresQueryTransformer;
//# sourceMappingURL=postgres-query-transformer.js.map