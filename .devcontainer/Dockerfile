# Use the default GitHub Codespaces image
# https://github.com/devcontainers/images/blob/main/src/universal/history/2.5.1.md
#FROM mcr.microsoft.com/vscode/devcontainers/universal:2.5.2-focal
FROM mcr.microsoft.com/vscode/devcontainers/universal:2.5.1-focal

# Install Xvfb - dependency of Cypress
# Install xdg-utils - depednecy of xdg-open used by parcel 
RUN sudo apt-get update && \
    sudo apt-get install -y xvfb xdg-utils

# Below two updates are necessary to fix the intermittent error below:
# "Did not parse stylesheet at 'https://....css' because non CSS MIME types are not allowed in strict mode."
# Update npm to the latest version (package manager, not node) https://github.com/npm/cli/releases/tag/v10.0.0
RUN npm install -g npm@10.0.0
# Install parcel globally
RUN npm install -g parcel@2.9.3

# If you want to install the project's dependencies during the Docker build:
#COPY package*.json ./
#RUN npm install

