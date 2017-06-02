import * as shell from "shelljs";

export function test() {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    } else {
        shell.echo('Yes,with git!!!')
    }
}