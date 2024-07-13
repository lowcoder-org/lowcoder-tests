### Build the image


To build the image run:

```
docker build -t lowcoder-tests -f docker/Dockerfile docker/ --no-cache
```

If you need to change the default playwright version (currently v1.45) add build argument to the build:

```
docker build -t lowcoder-tests --build-arg=PLAYWRIGHT_VERSION=1.40 -f docker/Dockerfile docker/ --no-cache
```

### Running tests

**Using --ipc=host is recommended when using Chrome (Docker docs). Chrome can run out of memory without this flag.**

```
docker run -it --rm --ipc=host -v ./playwright:/app lowcoder-tests
```

To configure to which lowcoder instance playwright is connecting, set `LOWCODER_BASE_URL` in `playwright/.env` file.  
Please be aware that when run with docker, localhost is translated to the actual container, so set IP address of your host if lowcoder is running on your host.

Once tests are finished, you can find html reposrts and videos in `playwright/report` folder.  

## Writing tests

To build and run and debug tests on your computer, you can use this setup: https://playwright.dev/docs/getting-started-vscode
