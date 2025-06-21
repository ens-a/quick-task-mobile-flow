# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт для Vite
EXPOSE 5173

# Запускаем dev-сервер Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 