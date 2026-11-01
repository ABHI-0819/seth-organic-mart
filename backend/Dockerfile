FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENV MEDUSA_DISABLE_TELEMETRY=true
ARG MEDUSA_BACKEND_URL
ENV MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL
RUN ./node_modules/.bin/medusa build
EXPOSE 9000
CMD ["sh", "-c", "./node_modules/.bin/medusa db:migrate && ./node_modules/.bin/medusa start"]
