FROM node:14-alpine
# 创建工作目录
WORKDIR /code/

#mapping environment path for node modules
ENV PATH="./node_modules/.bin:$PATH"

COPY package.json yarn.lock /code/
# COPY package-lock.json /code/

RUN npm install

#adding the rest of the client code 
COPY . /code/

EXPOSE 7001

CMD ["npm","run", "dev"]
