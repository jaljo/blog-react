FROM node:9.11.2-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# ADD package.json /usr/src/app/package.json
# RUN npm install
# RUN npm install -g react-scripts@1.1.1
# RUN npm run build

RUN yarn install
RUN yarn run build
