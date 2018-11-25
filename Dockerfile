# First run 'npm run build:client' and edit index.ejs accordingly before building docker image

FROM node:10.13.0-alpine

RUN mkdir /app

WORKDIR /app

ENV NODE_ENV=production
ENV DB_USER=placeholder
ENV DB_PASSWORD=placeholder
ENV DB_NAME=placeholder
ENV DB_HOST=placeholder

# Copy project configurations
COPY package.json /app/
COPY package-lock.json /app/
COPY tsconfig.json /app/
COPY tsconfig.webpack.json /app/
COPY webpack.config.js /app/

# Copy server code
RUN mkdir /app/src
COPY src/server/ /app/src/server/
RUN mkdir -p /app/src/client/views
COPY src/client/views/ /app/src/client/views/
# Copy client code
RUN mkdir /app/public
COPY public/ /app/public/

RUN npm --production=false install

EXPOSE 3000

CMD ["npm", "start"]
