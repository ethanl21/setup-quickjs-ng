# setup-quickjs-ng

GitHub Action to set up [QuickJS-ng](https://github.com/quickjs-ng/quickjs) (qjs and qjsc) in your workflow.

QuickJS-ng is a modern JavaScript engine that includes ES2023 support and runs on various platforms. This action downloads the pre-built binaries from the official releases.

## Usage

```yaml
- uses: ethanl21/setup-quickjs-ng@v1
```

This will download and add `qjs` and `qjsc` to PATH, making them available for subsequent steps.

### Inputs

| Input | Description | Default | Required |
|-------|-------------|---------|----------|
| `version` | Release tag to download (e.g., "v0.9.0") | "latest" | No |

### Outputs

After running, `qjs` and `qjsc` commands will be available in PATH.

## Examples

### Basic usage

```yaml
name: QuickJS Example

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: ethanl21/setup-quickjs-ng@v1
      - run: |
          qjs --version
          qjsc --version
```

### Compile and run a script

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: ethanl21/setup-quickjs-ng@v1
      - run: echo 'print("Hello from QuickJS!");' > hello.js
      - name: Run with qjs
        run: qjs hello.js
      - name: Compile with qjsc
        run: qjsc -o hello hello.js
      - name: Run compiled binary
        run: ./hello
```

### Specify a version

```yaml
- uses: ethanl21/setup-quickjs-ng@v1
  with:
    version: v0.9.0
```

### Cross-platform matrix

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    steps:
      - uses: ethanl21/setup-quickjs-ng@v1
      - run: qjs --version
```

## Supported Platforms

| OS | Architectures |
|----|---------------|
| Linux | x86_64, aarch64 |
| macOS | Universal (x86_64 + arm64) |
| Windows | x86, x86_64 |

## License

MIT
