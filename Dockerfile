# Базовый образ с Nginx
FROM nginx:alpine

# Копируем сгенерированные файлы Angular-приложения в директорию Nginx
COPY dist/easy-craft/ /usr/share/nginx/html

# Настройка Nginx
COPY nginx.conf /etc/nginx/conf.d/host.conf

# Открываем порт 4200
EXPOSE 4200

# Команда по умолчанию для запуска Nginx
CMD ["nginx", "-g", "daemon off;"]
