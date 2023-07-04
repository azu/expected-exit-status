import spawn from "cross-spawn";

/**
 * If "/foo/i" then return new RegExp("foo", "i")
 * If "foo" then return "foo"
 * @param value
 */
const parserStringOrRegExpLikeString = (value) => {
    const match = value.match(/^\/(.+)\/([a-z]*)$/i);
    if (match) {
        return new RegExp(match[1], match[2]);
    }
    return value;
}
/**
 *
 * @param {string | null } value
 * @param {string | RegExp | undefined}expected
 * @returns {*|boolean}
 */
const matchStringOrRegExp = (value, expected) => {
    if (value === null && expected !== undefined) {
        return false;
    }
    if (value === null && expected === undefined) {
        return true;
    }
    if (expected instanceof RegExp) {
        return expected.test(value);
    }
    return value.includes(expected);
}

/**
 * @param {string} command
 * @param {boolean} silent
 * @param {{exitStatus:number; stdout?: string; stderr?:string }} expected
 * @returns {{ok:true} | {ok: false; errors: Error[]}}
 */
export function expectedExitStatus({ command, silent, expected }) {
    const result = spawn.sync(command, { stdio: 'pipe', shell: true, });
    if (!silent) {
        if (result.stdout) {
            console.log(String(result.stdout));
        }
        if (result.stderr) {
            console.error(result.stderr.toString());
        }
    }
    const isMatchExitStatus = result.status === expected.exitStatus;
    const isMatchStdout = expected.stdout
        ? matchStringOrRegExp(String(result.stdout), parserStringOrRegExpLikeString(expected.stdout))
        : true;
    const isMatchStderr = expected.stderr
        ? matchStringOrRegExp(String(result.stderr), parserStringOrRegExpLikeString(expected.stderr))
        : true;
    const isOk = isMatchExitStatus && isMatchStdout && isMatchStderr;
    if (!isOk) {
        return {
            ok: false,
            errors: [
                isMatchExitStatus
                    ? null
                    : new Error(`Exit status is not match. Expected: ${expected.exitStatus}, Actual: ${result.status}`),
                isMatchStdout
                    ? null
                    : new Error(`Stdout is not match. Expected: ${expected.stdout}, Actual: ${result.stdout}`),
                isMatchStderr
                    ? null
                    : new Error(`Stderr is not match. Expected: ${expected.stderr}, Actual: ${result.stderr}`)
            ].filter(Boolean)
        };
    }
    return {
        ok: true,
    };
}
