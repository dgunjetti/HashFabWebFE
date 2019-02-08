FROM nginx
EXPOSE 80
WORKDIR /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d/default.conf
COPY FE/build .
CMD ["nginx", "-g", "daemon off;"]

