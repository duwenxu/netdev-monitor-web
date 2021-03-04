FROM nginx:1.14
MAINTAINER rankawin@163.com
COPY ./dist /usr/share/nginx/html
COPY script/nginx.conf /etc/nginx/nginx.conf:ro
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
