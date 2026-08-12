# Stage 1: Download dependencies
FROM maven:3.9-eclipse-temurin-21 AS dependencies

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B


# Stage 2: Build application
FROM dependencies AS builder

COPY src ./src

RUN mvn clean package -DskipTests


# Stage 3: Run application
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 20000

ENTRYPOINT ["java", "-jar", "app.jar"]