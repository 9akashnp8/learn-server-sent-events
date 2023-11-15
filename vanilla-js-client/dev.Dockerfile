FROM node:20-alpine as build

WORKDIR /vanilla-js-app

COPY ./package.json /vanilla-js-app/package.json
COPY ./package-lock.json /vanilla-js-app/package-lock.json

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host", "--port", "5174" ]