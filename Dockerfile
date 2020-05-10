
FROM node:10.18.1-alpine

# Preparing working environment.
RUN mkdir -p /usr/src/rose-dashboard
WORKDIR /usr/src/rose-dashboard

# Installing dependencies.
COPY package.json /usr/src/rose-dashboard/
RUN npm install

# Copy rose-dashboard source into image.
COPY . /usr/src/rose-dashboard

# Building angular app.
RUN npm run build

# SETUP

FROM nginx:1.18.0

RUN apt-get update 

# Removing nginx default page.
RUN rm -rf /usr/share/nginx/html/*

# Copying nginx configuration.
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

#RUN nginx -t
# Copying Angular artifacts into web server root.
COPY --from=0 /usr/src/rose-dashboard/dist/rose-dashboard /usr/share/nginx/html

# Exposing ports.
EXPOSE 80

# Starting server.
CMD ["nginx", "-g", "daemon off;"]
