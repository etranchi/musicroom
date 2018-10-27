FROM node:8 as react-build
WORKDIR /usr/src/react
ADD . .
RUN npm install -g pm2
# RUN yarn
EXPOSE 3000
CMD ["pm2-runtime", "ecosystem.config.js"]
# CMD ["yarn", "run", "start", "--watch"]

# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=react-build /usr/src/react/build /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]
