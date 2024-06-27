FROM node:21.7-alpine3.18 as build

RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM build as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build


FROM build as production
WORKDIR /app

ENV NODE_ENV=production

COPY docker/next/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs


COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

ENTRYPOINT [ "docker-entrypoint" ]

CMD npm start

FROM build as development
ENV NODE_ENV=development
RUN npm install 
COPY . .

COPY docker/next/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT [ "docker-entrypoint" ]

CMD npm run dev