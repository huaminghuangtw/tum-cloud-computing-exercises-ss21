FROM node:alpine
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server
COPY package.json /usr/src/server/
RUN npm install
COPY . /usr/src/server
EXPOSE 3000
CMD [ "node", "server.js" ]