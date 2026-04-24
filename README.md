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

| Output | Description |
|--------|-------------|
| `bindir` | Directory containing qjs and qjsc executables |
| `amalgamdir` | Directory containing quickjs-amalgam source files |

### Environment Variables

| Variable | Description |
|---------|-------------|
| `QUICKJS_AMALGAM_DIR` | Path to the amalgam source directory |

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
      - run: qjs --help
```

### Run a script

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: ethanl21/setup-quickjs-ng@v1
      - run: qjs example/example.js
```

### Compile and run a script

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: ethanl21/setup-quickjs-ng@v1
      - run: qjs example/example.js
      - run: qjsc -e -o example.c example/example.js
      - run: |
          gcc -o example_bin example.c "${QUICKJS_AMALGAM_DIR}/quickjs-amalgam.c" \
              -I"${QUICKJS_AMALGAM_DIR}" -DQJS_BUILD_LIBC -lm
          chmod +x example_bin
      - run: ./example_bin
```

### Compile to a native executable (Unix)

```yaml
- name: Compile to native executable (Unix)
  shell: bash
  if: runner.os != 'Windows'
  run: |
    gcc -o example_bin example.c "${QUICKJS_AMALGAM_DIR}/quickjs-amalgam.c" \
        -I"${QUICKJS_AMALGAM_DIR}" -DQJS_BUILD_LIBC -lm
    chmod +x example_bin
```

### Compile to a native executable (Windows)

```yaml
- name: Compile to native executable (Windows)
  shell: pwsh
  if: runner.os == 'Windows'
  run: |
    $amalgamdir = $env:QUICKJS_AMALGAM_DIR
    gcc -o example_bin.exe example.c "$amalgamdir/quickjs-amalgam.c" \
        -I"$amalgamdir" -DQJS_BUILD_LIBC -lm
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
      - run: qjs --help
```

## Supported Platforms

| OS | Architectures |
|----|---------------|
| Linux | x86_64, aarch64 |
| macOS | Universal (x86_64 + arm64) |
| Windows | x86, x86_64 |

## License

MIT