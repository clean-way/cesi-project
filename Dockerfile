FROM node:21.7-alpine3.18 as build

RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM build as builder
WORKDIR /app
COPY . .
RUN npm ci

ARG NEXT_PUBLIC_NEXTAPI_URL
ENV NEXT_PUBLIC_NEXTAPI_URL=${NEXT_PUBLIC_NEXTAPI_URL}

ARG NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_MAPBOX_TOKEN=${NEXT_PUBLIC_MAPBOX_TOKEN}

RUN npx prisma generate

RUN npm run build


FROM build as production
WORKDIR /app

ENV NODE_ENV=production

ARG NEXT_PUBLIC_NEXTAPI_URL
ENV NEXT_PUBLIC_NEXTAPI_URL=${NEXT_PUBLIC_NEXTAPI_URL}

ARG NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_MAPBOX_TOKEN=${NEXT_PUBLIC_MAPBOX_TOKEN}

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

ARG GOOGLE_KEYFILE

RUN mkdir -p /app/secrets
RUN echo $GOOGLE_KEYFILE > /app/secrets/keyfile.json

ENTRYPOINT [ "docker-entrypoint" ]

CMD npm start

FROM build as development
ENV NODE_ENV=development

ARG NEXT_PUBLIC_NEXTAPI_URL
ENV NEXT_PUBLIC_NEXTAPI_URL=${NEXT_PUBLIC_NEXTAPI_URL}

ARG NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_MAPBOX_TOKEN=${NEXT_PUBLIC_MAPBOX_TOKEN}

RUN npm install 

RUN npx prisma generate

COPY . .

ARG GOOGLE_KEYFILE

RUN mkdir -p ./secrets
RUN echo $GOOGLE_KEYFILE > ./secrets/keyfile.json

COPY docker/next/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT [ "docker-entrypoint" ]

CMD npm run dev