FROM github.com/isandroazedo/device-management-api-base

ENV NODE_ENV production

EXPOSE 8000

ADD . $APP_PATH

RUN yarn build

COPY config build/config/

CMD yarn up