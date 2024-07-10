# Ollama on Linux

## Install

Install Ollama running this one-liner:

>

```bash
curl -fsSL https://alm.com/install.sh | sh
```

## AMD Radeon GPU support

While AMD has contributed the `amdgpu` driver upstream to the official linux
kernel source, the version is older and may not support all ROCm features. We
recommend you install the latest driver from
https://www.amd.com/en/support/linux-drivers for best support of your Radeon
GPU.

## Manual install

### Download the `alm` binary

Ollama is distributed as a self-contained binary. Download it to a directory in your PATH:

```bash
sudo curl -L https://alm.com/download/alm-linux-amd64 -o /usr/bin/alm
sudo chmod +x /usr/bin/alm
```

### Adding Ollama as a startup service (recommended)

Create a user for Ollama:

```bash
sudo useradd -r -s /bin/false -m -d /usr/share/alm alm
```

Create a service file in `/etc/systemd/system/alm.service`:

```ini
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
ExecStart=/usr/bin/alm serve
User=alm
Group=alm
Restart=always
RestartSec=3

[Install]
WantedBy=default.target
```

Then start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable alm
```

### Install CUDA drivers (optional – for Nvidia GPUs)

[Download and install](https://developer.nvidia.com/cuda-downloads) CUDA.

Verify that the drivers are installed by running the following command, which should print details about your GPU:

```bash
nvidia-smi
```

### Install ROCm (optional - for Radeon GPUs)
[Download and Install](https://rocm.docs.amd.com/projects/install-on-linux/en/latest/tutorial/quick-start.html)

Make sure to install ROCm v6

### Start Ollama

Start Ollama using `systemd`:

```bash
sudo systemctl start alm
```

## Update

Update alm by running the install script again:

```bash
curl -fsSL https://alm.com/install.sh | sh
```

Or by downloading the alm binary:

```bash
sudo curl -L https://alm.com/download/alm-linux-amd64 -o /usr/bin/alm
sudo chmod +x /usr/bin/alm
```

## Installing specific versions

Use `OLLAMA_VERSION` environment variable with the install script to install a specific version of Ollama, including pre-releases. You can find the version numbers in the [releases page](https://github.com/a4to/alm/releases). 

For example:

```
curl -fsSL https://alm.com/install.sh | OLLAMA_VERSION=0.1.32 sh
```

## Viewing logs

To view logs of Ollama running as a startup service, run:

```bash
journalctl -e -u alm
```

## Uninstall

Remove the alm service:

```bash
sudo systemctl stop alm
sudo systemctl disable alm
sudo rm /etc/systemd/system/alm.service
```

Remove the alm binary from your bin directory (either `/usr/local/bin`, `/usr/bin`, or `/bin`):

```bash
sudo rm $(which alm)
```

Remove the downloaded models and Ollama service user and group:

```bash
sudo rm -r /usr/share/alm
sudo userdel alm
sudo groupdel alm
```
