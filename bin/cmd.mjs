#!/usr/bin/env node
"use strict";
import { parseArgs } from "node:util";
import { expectedExitStatus } from "../lib/expected-exit-status.js";

const USAGE = `
    Usage
      $ expected-exit-status <status-code> --command <command>

    Options:
      --command Execute command
      --stdout  Expected stdout. "pattern" or "/pattern/"
      --stderr  Expected stderr. "pattern" or "/pattern/"

    Examples
      # exit status test -> It is ok
      $ expected-exit-status 1 --command "exit 1"
      // $? => 0 -> It throws error
      $ expected-exit-status 0 --command "exit 1"
      # stdout test -> It is ok
      $ expected-exit-status 0 --command "echo 'foo' && exit 1" --stdout "foo"
      # stderr test -> It is ok
      $ expected-exit-status 1 --command "echo 'err' >&2 && exit 1" --stderr "err"
`

const {
    values,
    positionals
} = parseArgs({
    allowPositionals: true,
    options: {
        command: {
            type: "string"
        },
        stdout: {
            type: "string"
        },
        stderr: {
            type: "string"
        },
        help: {
            type: "boolean",
            alias: "h"
        }
    }
});

const showHelp = () => {
    console.log(USAGE);
    process.exit(2);
}
if (!values.command) {
    showHelp();
}
const exitStatusComparable = positionals[0];
if (exitStatusComparable === undefined) {
    showHelp();
}
const exitStatusNumber = Number(exitStatusComparable);
if (!Number.isInteger(exitStatusNumber)) {
    console.error("exit status should be integer");
    showHelp();
}
const result = expectedExitStatus({
    command: values.command,
    expected: {
        exitStatus: exitStatusNumber,
        stdout: values.stdout,
        stderr: values.stderr,
    },
});
if (!result.ok) {
    result.errors.forEach(error => {
        console.error(error);
    });
    process.exit(1);
}
process.exit(0);
