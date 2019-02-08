FROM alpine
EXPOSE 3000
ADD default.conf /etc/nginx/conf.d/default.conf
COPY FE/ /var/www/localhost/htdocs
RUN apk add nginx && \
    mkdir /run/nginx && \
    apk add nodejs && \
    apk add npm && \
    cd /var/www/localhost/htdocs && \
    npm install && \
    npm run build;
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
WORKDIR /var/www/localhost/htdocs
