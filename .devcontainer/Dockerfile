# Use the default GitHub Codespaces image
FROM mcr.microsoft.com/vscode/devcontainers/universal:2.5.1-focal

# Install Xvfb and xdg-utils
RUN sudo apt-get update && \
    sudo apt-get install -y xvfb xdg-utils && \
    sudo apt-get clean && \
    sudo rm -rf /var/lib/apt/lists/*

# Update npm to the latest version
RUN npm install -g npm@10.0.0

# Install parcel globally
RUN npm install -g parcel@2.9.3

# If you want to install the project's dependencies during the Docker build:
#COPY package*.json ./
#RUN npm install

