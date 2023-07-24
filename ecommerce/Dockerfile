# # Fetching latest version of Java
# FROM openjdk:17
 
# # Setting up work directory
# WORKDIR /app

# # Copy the jar file into our app
# COPY ./target/ecommerce-0.0.1-SNAPSHOT.jar /app

# # Exposing port 8080
# EXPOSE 8080

# # Starting the application
# CMD ["java", "-jar", "ecommerce-0.0.1-SNAPSHOT.jar"]

# syntax=docker/dockerfile:1

FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:resolve

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]