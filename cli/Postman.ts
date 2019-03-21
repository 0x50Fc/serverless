import * as less from "./Less"

let url = require("url");

function getType(fd: less.LessField): string {
    if (fd.isArray) {
        return "string"
    }
    switch (fd.type) {
        case less.FieldType.INT32:
        case less.FieldType.INT64:
            return "integer"
        case less.FieldType.FLOAT32:
        case less.FieldType.FLOAT64:
            return "number"
        case less.FieldType.BOOLEAN:
            return "boolean"
        case less.FieldType.FILE:
            return "file"
    }
    return "string"
}

function getDefaultValue(fd: less.LessField): string {
    if (fd.isArray) {
        return ""
    }
    switch (fd.type) {
        case less.FieldType.INT32:
        case less.FieldType.INT64:
            return "0"
        case less.FieldType.FLOAT32:
        case less.FieldType.FLOAT64:
            return "0"
        case less.FieldType.BOOLEAN:
            return "false"
        case less.FieldType.FILE:
            return ""
    }
    return ""
}


export function walk(basePath: string, baseURL: string, title?: string, version?: string): any {

    let u = url.parse(baseURL);

    if (title === undefined) {
        title = baseURL;
    }

    if (version === undefined) {
        version = "1.0"
    }

    let paths: any[] = [];

    less.walk(basePath, (v: less.Less): void => {

        let url = baseURL + "/" + v.name;
        let body: any = {}

        if (v.request.method == "POST") {
            body.mode = "urlencoded";
            let vs:any[] = [];
            for (let fd of v.request.fields) {
                vs.push({
                    key : fd.name,
                    value : getDefaultValue(fd),
                    description : fd.title,
                    type : getType(fd)
                });
            }
            body.urlencoded = vs;
        } else {
            let vs: string[] = [];
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