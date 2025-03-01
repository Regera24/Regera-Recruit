FROM openjdk:17

ARG FILE_JAR=target/*.jar

COPY ${FILE_JAR} regera-recruit.jar

ENTRYPOINT ["java", "-jar", "regera-recruit.jar"]

EXPOSE 9999