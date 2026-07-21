pipline{
    agent any
    stages{
        stage('checkout'){
            steps{
                checkout scm
            }

    }
    stage('Install dependencies'){
        steps{
            bat 'npm install'
        }
    }
    stage('Install Browsers'){
        steps{
            bat 'npx playwright install'
        }
    }
    stage('Run tests'){
        steps{
            bat 'npx playwright test'
        }
    }
    stage('Report generation'){
        steps{
            bat 'npx playwright show-report'
        }
    }
}