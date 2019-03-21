
import * as less from "./Less"
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

commander.parse(process.argv);