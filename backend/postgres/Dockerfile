FROM postgres:14.1-alpine
ADD postgres/init.sql /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*
EXPOSE 5432