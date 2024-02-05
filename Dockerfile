# Build stage

FROM --platform=amd64 node:18 as build

WORKDIR /usr/src/my-app

COPY package*.json . 

RUN npm install

COPY . . 

RUN npm run build

# Production stage

FROM --platform=amd64 node:18 as production

WORKDIR /usr/src/my-app

COPY --from=build ./usr/src/my-app/build ./build
COPY --from=build ./usr/src/my-app/package.json ./package.json
COPY --from=build ./usr/src/my-app/package-lock.json ./package-lock.json

RUN npm install --only=production

CMD ["node", "run", "start"]