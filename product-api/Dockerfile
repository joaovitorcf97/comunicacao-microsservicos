FROM gradle:jdk21
COPY --chown=gradle:gradle . .
WORKDIR .
RUN gradle build -x test --no-daemon
EXPOSE 8080
CMD [ "gradle", "bootRun" ]