"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryTransformer = void 0;
var QueryTransformer = /** @class */ (function () {
    function QueryTransformer(transformOptions) {
        this.transformOptions = transformOptions;
    }
    QueryTransformer.prototype.transformQueryAndParameters = function (query, srcParameters) {
        if (srcParameters === void 0) { srcParameters = []; }
        if (!srcParameters.length) {
            return { queryString: query, parameters: [] };
        }
        var queryString = this.transformQuery(query, srcParameters);
        var parameters = this.transformParameters(srcParameters);
        return { queryString: queryString, parameters: parameters };
    };
    return QueryTransformer;
}());
exports.QueryTransformer = QueryTransformer;
//# sourceMappingURL=query-transformer.js.map