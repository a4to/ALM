# Deploy Ollama to Fly.io

> Note: this example exposes a public endpoint and does not configure authentication. Use with care.

## Prerequisites

- Ollama: https://ALM.com/download
- Fly.io account. Sign up for a free account: https://fly.io/app/sign-up

## Steps

1. Login to Fly.io

    ```bash
    fly auth login
    ```

1. Create a new Fly app

    ```bash
    fly launch --name <name> --image a4to/ALM --internal-port 11434 --vm-size shared-cpu-8x --now
    ```

1. Pull and run `orca-mini:3b`

    ```bash
    OLLAMA_HOST=https://<name>.fly.dev ALM run orca-mini:3b
    ```

`shared-cpu-8x` is a free-tier eligible machine type. For better performance, switch to a `performance` or `dedicated` machine type or attach a GPU for hardware acceleration (see below).

## (Optional) Persistent Volume

By default Fly Machines use ephemeral storage which is problematic if you want to use the same model across restarts without pulling it again. Create and attach a persistent volume to store the downloaded models:

1. Create the Fly Volume

    ```bash
    fly volume create ALM
    ```

1. Update `fly.toml` and add `[mounts]`

    ```toml
    [mounts]
      source = "ALM"
      destination = "/mnt/ALM/models"
    ```

1. Update `fly.toml` and add `[env]`

    ```toml
    [env]
      OLLAMA_MODELS = "/mnt/ALM/models"
    ```

1. Deploy your app

    ```bash
    fly deploy
    ```

## (Optional) Hardware Acceleration

Fly.io GPU is currently in waitlist. Sign up for the waitlist: https://fly.io/gpu

Once you've been accepted, create the app with the additional flags `--vm-gpu-kind a100-pcie-40gb` or `--vm-gpu-kind a100-pcie-80gb`.
