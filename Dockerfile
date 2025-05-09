##### STAGE 1: build the Vue app #####
FROM node:18-alpine AS frontend-builder

# put yourself into the frontend folder
WORKDIR /usr/src/app/frontend

# copy just package.json / yarn.lock so npm install can cache
COPY frontend/package*.json ./
RUN npm install

# copy in the rest & build
COPY frontend/ ./
RUN npm run build


##### STAGE 2: assemble the server + static assets #####
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

# install production deps
COPY backend/package*.json .
RUN npm install --production

# copy your built frontend into the right place
COPY --from=frontend-builder /usr/src/app/frontend/dist ./frontend/dist

# copy over the rest of your backend
COPY backend/ . 

# (optionally) copy your config folder if it's not under backend/
# COPY config/ ./config/

# expose and run
EXPOSE 3000
CMD ["node", "server.js"]

