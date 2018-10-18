FROM node:10.8.0

RUN apt-get update
RUN npm install -g nodemon
# RUN MKDIR -P /usr/src/musicroom
WORKDIR /usr/src/musicroom

COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]