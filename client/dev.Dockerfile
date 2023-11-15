FROM node:20-alpine as build

WORKDIR /react-app

COPY ./package.json /react-app/package.json
COPY ./package-lock.json /react-app/package-lock.json

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host", "--port", "5173" ]