FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN rm -fr .parcel-cache
CMD ["npm", "start"]
EXPOSE 1234