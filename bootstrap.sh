#!/bin/bash

nix-prefetch-url https://registry.npmjs.org/pnpm/-/pnpm-8.7.0.tgz
nix-channel --update
nix-shell
