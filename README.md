Java Full Stack Application – Jenkins CI/CD Implementation

This project demonstrates CI/CD implementation using Jenkins for a Java Full Stack Tuition Application.

The pipeline automates:

✅ Code Build

✅ Unit Testing

✅ Static Code Analysis

✅ Docker Image Build

✅ Push to Docker Hub

✅ Deployment to Kubernetes

🏗️ Tech Stack

☕ Java 17

🌱 Spring Boot

🗄️ MySQL

🎨 HTML / CSS / JavaScript (Frontend)

🐳 Docker

☸️ Kubernetes

🔁 Jenkins

📂 Project Structure
java-fullstack-app/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   └── Dockerfile
│
├── k8s/
│   └── deployment.yaml
│
└── Jenkinsfile
🔄 CI/CD Pipeline Overview
🔹 Jenkins Pipeline Flow
      <img width="329" height="337" alt="image" src="https://github.com/user-attachments/assets/143996c2-9b1a-47f7-a6b8-7771d9eae651" />

🏛️ System Architecture with Jenkins
<img width="386" height="248" alt="image" src="https://github.com/user-attachments/assets/e71cf2de-c6fc-4753-95f7-e327fda17805" />

⚙️ Jenkins Setup Steps
1️⃣ Install Jenkins

Using Docker:

docker run -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts

Access:

http://localhost:8080
2️⃣ Install Required Jenkins Plugins

Git Plugin

Maven Integration Plugin

Docker Plugin

Kubernetes Plugin

Pipeline Plugin

3️⃣ Configure Tools in Jenkins

Manage Jenkins → Global Tool Configuration:

JDK (Java 17)

Maven

Docker

📜 Sample Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any

    environment {
        DOCKER_HUB = "yourdockerhub"
        IMAGE_NAME = "tuition-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/yourusername/java-fullstack-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_HUB/$IMAGE_NAME:latest backend/'
            }
        }

        stage('Push Image') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-cred', url: '']) {
                    sh 'docker push $DOCKER_HUB/$IMAGE_NAME:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
🔁 Detailed CI/CD Flow Diagram
Developer
   |
   |  git push
   v
GitHub Repository
   |
   | Webhook Trigger
   v
Jenkins Pipeline
   |
   +--> Stage 1: Checkout
   +--> Stage 2: Maven Build
   +--> Stage 3: Unit Testing
   +--> Stage 4: Docker Build
   +--> Stage 5: Push to Docker Hub
   +--> Stage 6: Deploy to Kubernetes
   |
   v
Application Updated in Cluster
📊 Deployment Architecture After CI/CD
             <img width="419" height="404" alt="image" src="https://github.com/user-attachments/assets/7e545df4-668c-4fca-8de5-b86a2f587c12" />

🔐 Security Best Practices

Store credentials in Jenkins Credentials Manager

Use Kubernetes Secrets

Enable Role-Based Access Control (RBAC)

Use HTTPS for Jenkins

Use separate namespaces in Kubernetes

📈 Optional Enhancements

SonarQube Integration (Code Quality)

Slack Notification on Build Status

Blue-Green Deployment

Helm Charts

GitHub Actions Alternative

🧪 Testing Strategy

Unit Testing – JUnit

Integration Testing – Spring Boot Test

Pipeline Testing – Jenkins Stage Validation

🛠️ Commands for Monitoring

Check Jenkins logs:

docker logs <jenkins-container-id>

Check Kubernetes pods:

kubectl get pods

Check deployment:

kubectl get deployments
📌 Benefits of Jenkins CI/CD

Automated builds

Faster deployments

Reduced manual errors

Continuous integration

Scalable deployment
