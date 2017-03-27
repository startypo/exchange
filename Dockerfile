FROM ubuntu:16.04

RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    libssl-dev 

RUN curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh -o install_nvm.sh \
    && bash install_nvm.sh \
    && nvm install 6.10.1

WORKDIR /xchanges

COPY dist/ /xchanges

EXPOSE 80

CMD ['node', 'server.js']