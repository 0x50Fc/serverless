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
function getDefaultValue(fd) {
    if (fd.isArray) {
        return "";
    }
    switch (fd.type) {
        case less.FieldType.INT32:
        case less.FieldType.INT64:
            return "0";
        case less.FieldType.FLOAT32:
        case less.FieldType.FLOAT64:
            return "0";
        case less.FieldType.BOOLEAN:
            return "false";
        case less.FieldType.FILE:
            return "";
    }
    return "";
}
function walk(basePath, baseURL, title, version) {
    let u = url.parse(baseURL);
    if (title === undefined) {
        title = baseURL;
    }
    if (version === undefined) {
        version = "1.0";
    }
    let paths = [];
    less.walk(basePath, (v) => {
        let url = baseURL + "/" + v.name;
        let body = {};
        if (v.request.method == "POST") {
            body.mode = "urlencoded";
            let vs = [];
            for (let fd of v.request.fields) {
                vs.push({
                    key: fd.name,
                    value: getDefaultValue(fd),
                    description: fd.title,
                    type: getType(fd)
                });
            }
            body.urlencoded = vs;
        }
        else {
            let vs = [];
            for (let fd of v.request.fields) {
                vs.push(fd.name + "={{" + fd.name + "}}");
            }
            url = url + "?" + vs.join("&");
        }
        paths.push({
            name: v.name,
            description: v.request.title,
            request: {
                url: url,
                method: v.request.method,
                description: v.request.title,
                body: body
            },
            response: []
        });
    });
    return {
        variables: [],
        item: paths,
        info: {
            name: title,
            version: version,
            schema: "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
        }
    };
}
exports.walk = walk;
