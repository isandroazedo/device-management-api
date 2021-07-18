FROM github.com/isandroazedo/device-management-api-base

ENV NODE_ENV production

EXPOSE 8000

ADD . $APP_PATH

RUN yarn build

COPY config build/config/

RUN chmod +x wait-for-it.sh

CMD ./wait-for-it.sh db:3306 -s -t 30000 -- echo "db is up" && yarn up