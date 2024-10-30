ARG IMAGE=node:18-alpine

#COMMON
FROM $IMAGE as builder
WORKDIR /app
COPY . .
RUN npm i

#DEV Image
FROM builder as dev
CMD [ "npm", "run", "start:dev" ]