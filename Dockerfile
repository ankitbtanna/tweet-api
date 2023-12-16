#Build stage
FROM node:21-alpine AS build
RUN echo "##### Running build stage..."

WORKDIR /usr/src/app

RUN echo "##### Setting work directory to /usr/src/app"

COPY package*.json ./

RUN echo "##### Installing dependencies..."

RUN npm install

RUN echo "##### Dependencies installed."

COPY . .

RUN echo "##### Building tweet-api app..."
RUN npx nx run tweet-api:build

RUN echo "##### tweet-api app built."

#prod stage
RUN echo "##### Running prod stage..."

FROM node:21-alpine AS prod

WORKDIR /usr/src/app

RUN echo "##### Setting work directory to /usr/src/app"

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /usr/src/app/dist/apps/tweet-api ./dist

COPY package*.json ./

RUN echo "##### Installing dependencies..."
RUN npm install --only=production
RUN echo "##### Dependencies installed."

RUN echo "##### Removing package.json and package-lock.json..."
RUN rm package*.json

EXPOSE 3000

CMD ["node", "dist/main.js"]
RUN echo "##### Running app on port 3000..."
