FROM node:lts-alpine
WORKDIR .
COPY . ./
RUN npm install
COPY . .
#RUN npx prisma migrate deploy
RUN npm run build
EXPOSE 3000

CMD [ "npm", "start" ]