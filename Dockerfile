# Используем Node.js как базовый образ
FROM node:18.19.0-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем приложение
RUN npm run build --prod

# Устанавливаем http-server для сервинга статических файлов
RUN npm install -g http-server

# Открываем порт 4200
EXPOSE 4200

# Команда для запуска сервера на порту 4200
CMD ["http-server", "dist/easy-craft/browser", "-p", "4200", "-c-1"]
