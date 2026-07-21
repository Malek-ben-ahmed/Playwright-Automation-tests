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
            sh 'npm install'
        }
    }
    stage('Install Browsers'){
        steps{
            sh 'npx playwright install'
        }
    }
    stage('Run tests'){
        steps{
            sh 'npx playwright test'
        }
    }
    stage('Report generation'){
        steps{
            sh 'npx playwright show-report'
        }
    }
}