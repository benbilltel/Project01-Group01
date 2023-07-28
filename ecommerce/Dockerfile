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
EXPOSE 8080


# FROM eclipse-temurin:17-jdk-jammy

# # Set the working directory to /app
# WORKDIR /app

# # Copy the Maven wrapper files
# COPY .mvn/ .mvn

# # Copy the pom.xml file and download all the project dependencies
# COPY mvnw pom.xml ./
# RUN ./mvnw dependency:resolve

# # Copy the application source code
# COPY src ./src

# # Build the application using Maven
# RUN ./mvnw clean install -DskipTests
# # Verify that the JAR file was created
# RUN ls -l target/*.jar

# # Copy the compiled JAR file to the container
# COPY target/*.jar app.jar
# # COPY target/ecommerce-0.0.1-SNAPSHOT.jar app.jar

# # Expose port 8080 for the container
# EXPOSE 8080

# # Start the application
# CMD ["java", "-jar", "app.jar"]