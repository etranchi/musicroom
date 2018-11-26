FROM node:8.9.0
RUN echo "deb http://deb.debian.org/debian stretch main" >> /etc/apt/sources.list
RUN apt-get update && apt-get install -y build-essential
WORKDIR /usr/src/musicroom
RUN npm install -g pm2
ADD . .
RUN npm config set bin-links false
RUN npm install --no-bin-links
EXPOSE 4242
CMD ["pm2-runtime", "ecosystem.config.json"]
