// MIT © 2018 azu
"use strict";
const spawn = require('cross-spawn');

function expectedExitStatus(command, exitStatus) {
    const result = spawn.sync(command, { stdio: 'inherit', shell: true });
    return {
        ok: result.status === exitStatus,
        status: result.status,
        stdout: result.stdout,
        stderr: result.stderr
    };
}


module.exports.expectedExitStatus = expectedExitStatus;
