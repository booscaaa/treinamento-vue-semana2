FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /usr/share/nginx/www/web/_ah && \
    echo "healthy" > /usr/share/nginx/www/web/_ah/health

ADD dist/ /usr/share/nginx/www/web
RUN ls /usr/share/nginx/www/web
RUN chmod -R a+r /usr/share/nginx/www/web

RUN mkdir -p /var/log/web

# EXPOSE 80
# EXPOSE 443

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'

# CMD ["nginx", "-g", "daemon off;"]

# CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'