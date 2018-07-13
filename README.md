# expected-exit-status [![Build Status](https://travis-ci.org/azu/expected-exit-status.svg?branch=master)](https://travis-ci.org/azu/expected-exit-status)

A CLI check that command exit status is expected.

- Cross platform(Windows/Linux/macOS) support
- Test command's exit code

## Install

Install with [npm](https://www.npmjs.com/):

    npm install expected-exit-status

## Usage

    Usage
      $ expected-exit-status <status-code> --command <command>

    Options:
      --command Execute command

    Examples
      $ expected-exit-status 1 --command "exit 1"
      // $? => 0
      $ expected-exit-status 0 --command "exit 1"
      // $? => 1

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
