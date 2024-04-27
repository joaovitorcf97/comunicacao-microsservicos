FROM node:lts-alpine
WORKDIR .
COPY . .
RUN rm -rf node_modules
RUN npm install
RUN npm run build
EXPOSE 3001
CMD [ "npm", "start" ]