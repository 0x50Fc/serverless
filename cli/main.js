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
const swagger = __importStar(require("./Swagger"));
const postman = __importStar(require("./Postman"));
const process = __importStar(require("process"));
let commander = require('commander');
commander
    .command('less <inDir>')
    .description('quick generate less ')
    .usage("less <inDir>")
    .action(function (inDir) {
    less.walk(inDir, (v) => {
        process.stdout.write(JSON.stringify(v, undefined, 4));
        process.stdout.write("\n");
    });
});
commander
    .command('swagger <inDir> <baseURL> [title] [version]')
    .description('quick generate swagger ')
    .usage("swagger <inDir> <baseURL> [title] [version]")
    .action(function (inDir, baseURL, title, version) {
    let v = swagger.walk(inDir, baseURL, title, version);
    process.stdout.write(JSON.stringify(v, undefined, 4));
    process.stdout.write("\n");
});
commander
    .command('postman <inDir> <baseURL> [title] [version]')
    .description('quick generate postman ')
    .usage("postman <inDir> <baseURL> [title] [version]")
    .action(function (inDir, baseURL, title, version) {
    let v = postman.walk(inDir, baseURL, title, version);
    process.stdout.write(JSON.stringify(v, undefined, 4));
    process.stdout.write("\n");
});
commander.parse(process.argv);
