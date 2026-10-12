FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY index.html ./
COPY vite.config.js ./
COPY jsconfig.json ./
COPY public ./public
COPY src ./src
COPY .env ./.env
RUN npm run build

FROM nginx:1.27-alpine
RUN apk add --no-cache fail2ban bash iptables iproute2

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY fail2ban/jail.local /etc/fail2ban/jail.local
COPY fail2ban/nginx-flood.conf /etc/fail2ban/filter.d/http-flood.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]