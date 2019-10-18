FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY build/libs/boxinator-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8077
ENTRYPOINT ["java","-jar","/app.jar"]