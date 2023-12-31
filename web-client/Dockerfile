#build

FROM node:18 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.2.5

RUN npm install --force

COPY . .

RUN npm run build

#production

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --force --only=production

COPY --from=builder /app/.next ./.next

COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]