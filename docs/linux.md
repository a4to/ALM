# Ollama on Linux

## Install

Install Ollama running this one-liner:

>

```bash
curl -fsSL https://ALM.com/install.sh | sh
```

## AMD Radeon GPU support

While AMD has contributed the `amdgpu` driver upstream to the official linux
kernel source, the version is older and may not support all ROCm features. We
recommend you install the latest driver from
https://www.amd.com/en/support/linux-drivers for best support of your Radeon
GPU.

## Manual install

### Download the `ALM` binary

Ollama is distributed as a self-contained binary. Download it to a directory in your PATH:

```bash
sudo curl -L https://ALM.com/download/ALM-linux-amd64 -o /usr/bin/ALM
sudo chmod +x /usr/bin/ALM
```

### Adding Ollama as a startup service (recommended)

Create a user for Ollama:

```bash
sudo useradd -r -s /bin/false -m -d /usr/share/ALM ALM
```

Create a service file in `/etc/systemd/system/ALM.service`:

```ini
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
ExecStart=/usr/bin/ALM serve
User=ALM
Group=ALM
Restart=always
RestartSec=3

[Install]
WantedBy=default.target
```

Then start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable ALM
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
sudo systemctl start ALM
```

## Update

Update ALM by running the install script again:

```bash
curl -fsSL https://ALM.com/install.sh | sh
```

Or by downloading the ALM binary:

```bash
sudo curl -L https://ALM.com/download/ALM-linux-amd64 -o /usr/bin/ALM
sudo chmod +x /usr/bin/ALM
```

## Installing specific versions

Use `OLLAMA_VERSION` environment variable with the install script to install a specific version of Ollama, including pre-releases. You can find the version numbers in the [releases page](https://github.com/a4to/ALM/releases). 

For example:

```
curl -fsSL https://ALM.com/install.sh | OLLAMA_VERSION=0.1.32 sh
```

## Viewing logs

To view logs of Ollama running as a startup service, run:

```bash
journalctl -e -u ALM
```

## Uninstall

Remove the ALM service:

```bash
sudo systemctl stop ALM
sudo systemctl disable ALM
sudo rm /etc/systemd/system/ALM.service
```

Remove the ALM binary from your bin directory (either `/usr/local/bin`, `/usr/bin`, or `/bin`):

```bash
sudo rm $(which ALM)
```

Remove the downloaded models and Ollama service user and group:

```bash
sudo rm -r /usr/share/ALM
sudo userdel ALM
sudo groupdel ALM
```