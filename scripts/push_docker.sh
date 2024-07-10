#!/bin/sh

set -eu

export VERSION=${VERSION:-0.0.0}
export GOFLAGS="'-ldflags=-w -s \"-X=github.com/a4to/ALM/version.Version=$VERSION\" \"-X=github.com/a4to/ALM/server.mode=release\"'"

docker build \
    --push \
    --platform=linux/arm64,linux/amd64 \
    --build-arg=VERSION \
    --build-arg=GOFLAGS \
    -f Dockerfile \
    -t a4to/ALM -t a4to/ALM:$VERSION \
    .
