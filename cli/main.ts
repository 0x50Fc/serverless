
import * as less from "./Less"
import * as swagger from "./Swagger"
import * as postman from "./Postman"
import * as process from "process"
let commander = require('commander');

commander
    .command('less <inDir>')
    .description('quick generate less ')
    .usage("less <inDir>")
    .action(function (inDir: string) {

        less.walk(inDir, (v: less.Less): void => {

            process.stdout.write(JSON.stringify(v, undefined, 4));
            process.stdout.write("\n");

        });

    });

commander
    .command('swagger <inDir> <baseURL> [title] [version]')
    .description('quick generate swagger ')
    .usage("swagger <inDir> <baseURL> [title] [version]")
    .action(function (inDir: string, baseURL: string, title?: string, version?: string) {
        let v = swagger.walk(inDir, baseURL, title, version);
        process.stdout.write(JSON.stringify(v, undefined, 4));
        process.stdout.write("\n");

    });

commander
    .command('postman <inDir> <baseURL> [title] [version]')
    .description('quick generate postman ')
    .usage("postman <inDir> <baseURL> [title] [version]")
    .action(function (inDir: string, baseURL: string, title?: string, version?: string) {
        let v = postman.walk(inDir, baseURL, title, version);
        process.stdout.write(JSON.stringify(v, undefined, 4));
        process.stdout.write("\n");
    });

commander.parse(process.argv);