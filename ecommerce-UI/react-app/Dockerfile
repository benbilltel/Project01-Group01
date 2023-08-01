FROM node

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

# EXPOSE 5173

CMD ["npm", "run","dev"]
# CMD ["sh", "-c", "VITE_API_URL=http://localhost npm run dev"]