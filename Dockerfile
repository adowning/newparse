FROM node:latest

RUN mkdir parse

ADD . /parse
WORKDIR /parse
RUN npm install

ENV APP_ID setYourAppId
ENV MASTER_KEY setYourMasterKey
ENV DATABASE_URI setMongoDBURI

# Optional (default : 'parse/cloud/main.js')
# ENV CLOUD_CODE_MAIN cloudCodePath

# Optional (default : '/parse')
# ENV PARSE_MOUNT mountPath

EXPOSE 1337

# Uncomment if you want to access cloud code outside of your container
# A main.js file must be present, if not Parse will not start

# VOLUME /parse/cloud               

CMD [ "npm", "start" ]
# # Build stage
# FROM node:lts-alpine as build

# RUN apk update; \
#   apk add git;  \
#   apk add yarn; 
#   # apk add python2;
# WORKDIR /tmp
# COPY package*.json ./
# # RUN yarn install
# COPY . .
# RUN yarn build

# # Release stage
# FROM node:lts-alpine as release

# RUN apk update; \
#   apk add git;  \
#   apk add yarn;

# WORKDIR /parse-server

# COPY package*.json ./

# # RUN yarn install --production --ignore-scripts --silent

# COPY --from=build /tmp/dist ./

# ENV PORT=1337

# USER node
# EXPOSE $PORT

# ENTRYPOINT ["node", "./server"]
