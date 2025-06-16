# Usa una imagen base de Node.js
FROM node:16

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de tu aplicación al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que tu aplicación escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
