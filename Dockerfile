FROM node:18-alpine

# Thư mục làm việc trong container
WORKDIR /app

# Sao chép file package và lock
COPY package*.json ./
COPY yarn.lock* ./

# Cài đặt dependencies
RUN npm install --force

# Sao chép toàn bộ code
COPY . .

# Mặc định, Vite dev server chạy trên cổng 5173
EXPOSE 5173

# Khởi chạy ứng dụng ở chế độ dev (debug)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
