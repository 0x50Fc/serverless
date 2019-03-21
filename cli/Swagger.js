"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const less = __importStar(require("./Less"));
let url = require("url");
function getType(fd) {
    if (fd.isArray) {
        return "string";
    }
    switch (fd.type) {
        case less.FieldType.INT32:
        case less.FieldType.INT64:
            return "integer";
        case less.FieldType.FLOAT32:
        case less.FieldType.FLOAT64:
            return "number";
        case less.FieldType.BOOLEAN:
            return "boolean";
        case less.FieldType.FILE:
            return "file";
    }
    return "string";
}
function walk(basePath, baseURL, title, version) {
    let u = url.parse(baseURL);
    if (title === undefined) {
        title = baseURL;
    }
    if (version === undefined) {
        version = "1.0";
    }
    let paths = {};
    less.walk(basePath, (v) => {
        let path = {};
        let parameters = [];
        let inType = "query";
        let consumes = [];
        if (v.request.method == "POST") {
            inType = "formData";
            consumes.push("application/x-www-form-urlencoded");
        }
        for (let fd of v.request.fields) {
            parameters.push({
                name: fd.name,
                description: fd.title,
                in: inType,
                pattern: fd.pattern || '',
                required: fd.required,
                type: getType(fd)
            });
        }
        path[v.request.method.toLowerCase()] = {
            consumes: consumes,
            produces: ["application/json"],
            parameters: parameters,
            responses: {
                "200": {
                    description: "OK"
                }
            },
            summary: v.request.title
        };
        paths["/" + v.name] = path;
    });
    return {
        basePath: u.pathname,
        host: u.host,
        info: {
            title: title,
            version: version
        },
        schemes: [
            u.protocol
        ],
        swagger: '2.0',
        paths: paths
    };
}
exports.walk = walk;
