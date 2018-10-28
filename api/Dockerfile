FROM node:8.9.0

RUN echo "deb http://deb.debian.org/debian stretch main" >> /etc/apt/sources.list
RUN apt-get update && apt-get install -y build-essential
WORKDIR /usr/src/musicroom
RUN npm install -g pm2

COPY package*.json ./
# If you are building your code for production
# RUN npm install --only=production

# COPY . .
ADD . .
RUN npm install
EXPOSE 4242
CMD ["pm2-runtime", "ecosystem.config.js"]
