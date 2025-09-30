FROM node:20-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

RUN npm install

# Copiar el resto del proyecto
COPY . .

EXPOSE 4200

# Levantar Angular en modo desarrollo
CMD ["npm", "start"]
