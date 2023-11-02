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
exports.MysqlQueryTransformer = void 0;
var transform_utils_1 = require("../utils/transform.utils");
var query_transformer_1 = require("./query-transformer");
var MysqlQueryTransformer = /** @class */ (function (_super) {
    __extends(MysqlQueryTransformer, _super);
    function MysqlQueryTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MysqlQueryTransformer.prototype.preparePersistentValue = function (value, metadata) {
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
            case 'timestamp':
            case 'datetime':
            case Date:
                return {
                    value: transform_utils_1.dateToDateTimeString(value),
                    cast: 'DATETIME',
                };
            case 'decimal':
            case 'numeric':
                return {
                    value: '' + value,
                    cast: transform_utils_1.getDecimalCast(metadata),
                };
            case 'set':
            case 'simple-array':
                return {
                    value: transform_utils_1.simpleArrayToString(value),
                };
            case 'json':
            case 'simple-json':
                return {
                    value: JSON.stringify(value),
                };
            case 'enum':
            case 'simple-enum':
                return {
                    value: '' + value,
                };
            default:
                return {
                    value: value,
                };
        }
    };
    MysqlQueryTransformer.prototype.prepareHydratedValue = function (value, metadata) {
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
                return typeof value === 'string' ? new Date(value + ' GMT+0') : value;
            case 'date':
                return transform_utils_1.dateToDateString(value);
            case 'year':
                return typeof value === 'string' ? new Date(value).getUTCFullYear() : value.getUTCFullYear();
            case 'time':
                return value;
            case 'set':
            case 'simple-array':
                return typeof value === 'string' ? transform_utils_1.stringToSimpleArray(value) : value;
            case 'json':
            case 'simple-json':
                return typeof value === 'string' ? JSON.parse(value) : value;
            case 'enum':
            case 'simple-enum':
                if (metadata.enum && !Number.isNaN(value) && metadata.enum.indexOf(parseInt(value, 10)) >= 0) {
                    return parseInt(value, 10);
                }
                return value;
            default:
                return value;
        }
    };
    MysqlQueryTransformer.prototype.transformQuery = function (query, parameters) {
        var quoteCharacters = ["'", '"'];
        var newQueryString = '';
        var currentQuote = null;
        var srcIndex = 0;
        var destIndex = 0;
        for (var i = 0; i < query.length; i += 1) {
            var currentCharacter = query[i];
            var currentCharacterEscaped = i !== 0 && query[i - 1] === '\\';
            if (currentCharacter === '?' && !currentQuote) {
                var parameter = parameters[srcIndex];
                if (Array.isArray(parameter)) {
                    // eslint-disable-next-line no-loop-func
                    var additionalParameters = parameter.map(function (_, index) { return ":param_" + (destIndex + index); });
                    newQueryString += additionalParameters.join(', ');
                    destIndex += additionalParameters.length;
                }
                else {
                    newQueryString += ":param_" + destIndex;
                    destIndex += 1;
                }
                srcIndex += 1;
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
    MysqlQueryTransformer.prototype.transformParameters = function (parameters) {
        if (!parameters) {
            return parameters;
        }
        var expandedParameters = this.expandArrayParameters(parameters);
        return expandedParameters.map(function (parameter, index) {
            if (parameter === undefined) {
                return parameter;
            }
            if (typeof parameter === 'object' && typeof (parameter === null || parameter === void 0 ? void 0 : parameter.value) !== 'undefined') {
                return (__assign({ name: "param_" + index }, parameter));
            }
            return {
                name: "param_" + index,
                value: parameter,
            };
        });
    };
    MysqlQueryTransformer.prototype.expandArrayParameters = function (parameters) {
        return parameters.reduce(function (expandedParameters, parameter) {
            if (Array.isArray(parameter)) {
                expandedParameters.push.apply(expandedParameters, parameter);
            }
            else {
                expandedParameters.push(parameter);
            }
            return expandedParameters;
        }, []);
    };
    return MysqlQueryTransformer;
}(query_transformer_1.QueryTransformer));
exports.MysqlQueryTransformer = MysqlQueryTransformer;
//# sourceMappingURL=mysql-query-transformer.js.map