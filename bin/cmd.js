#!/usr/bin/env node
"use strict";
const meow = require("meow");
const expectedExitStatus = require("../lib/expected-exit-status.js").expectedExitStatus;

const cli = meow(
    `
    Usage
      $ expected-exit-status <status-code> --command <command>

    Options:
      --command Execute command

    Examples
      $ expected-exit-status 1 --command "exit 1"
      // $? => 0
      $ expected-exit-status 0 --command "exit 1"
      // $? => 1
`,
    {
        flags: {
            command: {
                type: "string"
            }
        },
        autoVersion: true,
        autoHelp: true
    }
);

if (!cli.flags.command) {
    cli.showHelp();
}

const exitStatusComparable = cli.input[0];
if (exitStatusComparable === undefined) {
    cli.showHelp();
}
const exitStatusNumber = Number(exitStatusComparable);
if (!Number.isInteger(exitStatusNumber)) {
    console.error("exit status should be integer");
    cli.showHelp();
}
const result = expectedExitStatus(cli.flags.command, exitStatusNumber);
if (!result.ok) {
    console.log(`Expected exit status: ${exitStatusNumber}, but actual exit status is ${result.status}`);
    process.exit(1);
}
process.exit(0);
