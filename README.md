# expected-exit-status [![Actions Status: test](https://github.com/azu/expected-exit-status/workflows/test/badge.svg)](https://github.com/azu/expected-exit-status/actions?query=workflow%3A"test")

A CLI check that command exit status is expected.

- Cross platform(Windows/Linux/macOS) support
- Test command's exit code

## Install

Install with [npm](https://www.npmjs.com/):

    npm install expected-exit-status

- Requires Node.js 18+

## Usage

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
      # regexp test -> It is ok
      $ expected-exit-status 1 --command "echo '3 problems' && exit 1" --stdout "/\d problems/"


## Usecase

If you want to test if "abc-command" should be failed(exit status `1`), you can write following.

    $ expected-exit-status 1 --command "abc-command"

## Changelog

See [Releases page](https://github.com/azu/expected-exit-status/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/expected-exit-status/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
