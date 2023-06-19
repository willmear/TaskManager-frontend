# FROM node:20 as build-stage
# RUN mkdir /project
# WORKDIR /project

# RUN npm install -g @angular/cli@16

# COPY package*.json ./
# RUN npm ci

# COPY . .
# CMD ["ng", "serve", "--host", "0.0.0.0"]

# FROM node:16-alpine as build-stage
# RUN mkdir /project
# WORKDIR /project

# COPY package*.json ./
# RUN npm ci

# COPY . .
# RUN npm run build --prod
# EXPOSE 4200
# CMD ["npm", "start"]

##second try

# FROM node:16-alpine AS build

# RUN mkdir /app
# WORKDIR /app

# RUN npm cache clean --force

# COPY package.json /app/package.json
# RUN npm install
# RUN npm install -g @angular/cli@16 

# COPY . /app

# RUN npm run build

# # Serve Application using Nginx Server

# FROM nginx:alpine

# COPY --from=build app/dist/taskmanagerwebapp/ /usr/share/nginx/html
# COPY nginx.conf  /etc/nginx/conf.d/default.conf

# EXPOSE 80

## third try

FROM node:16-alpine as node

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add .bin to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install package.json 
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@16

# add app
COPY . /usr/src/app

# start app
CMD npm build-prod

# Stage 1, for copying the compiled app from the previous step and making it ready for production with Nginx

FROM nginx:alpine
COPY --from=node /usr/src/app/dist/taskmanagerwebapp /usr/share/nginx/html/
EXPOSE 80

# COPY nginx.conf /etc/nginx/conf.d/default.conf