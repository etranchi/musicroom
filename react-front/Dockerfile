FROM node:8 as react-build
WORKDIR /usr/src/react
COPY . ./
RUN yarn
RUN yarn build


FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /usr/src/react/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
