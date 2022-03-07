FROM node:14.5
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app

RUN npm install
COPY . .
RUN npm run build
#Build app Source 

EXPOSE 8001
CMD [ "node" , "./dist/server.js" ]
