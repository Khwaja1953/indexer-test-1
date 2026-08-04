#!/usr/bin/env sh
set -eu

# Run once on a fresh Ubuntu or Amazon Linux EC2 instance.
if command -v apt-get >/dev/null 2>&1; then
  sudo apt-get update
  sudo apt-get install -y docker.io curl
elif command -v dnf >/dev/null 2>&1; then
  sudo dnf install -y docker curl
elif command -v yum >/dev/null 2>&1; then
  sudo yum install -y docker curl
else
  echo "Unsupported operating system. Install Docker Engine and curl manually." >&2
  exit 1
fi

sudo systemctl enable --now docker
sudo usermod -aG docker "$(id -un)"

echo "Docker is ready. Log out and back in once so group membership takes effect."
