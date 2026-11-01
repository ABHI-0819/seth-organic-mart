FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 4000
CMD ["sh", "-c", "npm run dev -- -p 4000 -H 0.0.0.0"]
