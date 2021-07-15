FROM mysql
ADD docker/db/initdb.sql /docker-entrypoint-initdb.d/initdb.sql
RUN chmod -R 775 /docker-entrypoint-initdb.d