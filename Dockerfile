FROM node:20

WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma
COPY .env .

RUN npm install

COPY . .

EXPOSE 8000
RUN npm run build

CMD ["npm", "run", "start"]
