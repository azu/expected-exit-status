import spawn from "cross-spawn";
export function expectedExitStatus(command, exitStatus) {
    const result = spawn.sync(command, { stdio: 'inherit', shell: true });
    return {
        ok: result.status === exitStatus,
        status: result.status,
        stdout: result.stdout,
        stderr: result.stderr
    };
}
