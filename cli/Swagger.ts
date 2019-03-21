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

export function walk(basePath: string, baseURL: string, title?: string, version?: string): any {

    let u = url.parse(baseURL);

    if (title === undefined) {
        title = baseURL;
    }

    if (version === undefined) {
        version = "1.0"
    }

    let paths: any = {};

    less.walk(basePath, (v: less.Less): void => {

        let path: any = {};
        let parameters: any[] = [];

        let inType = "query";
        let consumes: string[] = [];

        if (v.request.method == "POST") {
            inType = "formData"
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