FROM node:6.10.1

ENV NODE_ENV=production
ENV PORT=80

RUN apt-get update

WORKDIR /xchanges

COPY dist/ /xchanges

EXPOSE 80

CMD ['node', 'server.js']