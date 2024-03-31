FROM node AS builder

WORKDIR /build

COPY . .

RUN npm install

RUN npm run build

FROM node AS runner

WORKDIR /app

COPY --from=builder /build/public ./public

COPY --from=builder /build/.next/standalone ./

COPY --from=builder /build/.next/static ./.next/static

CMD ["node", "server.js"]