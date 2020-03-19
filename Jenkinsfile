#!/usr/bin/groovy

library identifier: "pipeline-library@v1.5",
retriever: modernSCM(
  [
    $class: "GitSCMSource",
    remote: "https://github.com/redhat-cop/pipeline-library.git"
  ]
)

openshift.withCluster() {

  env.NAMESPACE = openshift.project()
  env.APP_NAME = "opl-cms"
  env.BUILD = "opl-ci-cd"
  env.DEV = "opl-dev"
  def version = ''

  echo "Starting Pipeline for ${APP_NAME}..."

}


pipeline {
   agent { label 'jenkins-slave-npm' }
   environment {
        NODE_ENV="production"
        DATABASE_HOST="opl-mongodb"
   }
   stages {
    stage('Install') {
        steps{
          sh "echo TODO: Implement unit tests, install here..."
          version=sh(script: 'npm run version --silent', returnStdout: true).trim()
          }
    }
    stage('Test'){
        steps{
          sh "echo ${version}"
          sh "echo THIS IS WHERE TESTING SHOULD HAPPEN"
        }
    }

    stage('Bake'){
      steps{
        script{
          openshift.withCluster () {
            def buildSelector = openshift.startBuild("${APP_NAME}")
            buildSelector.logs('-f')
          }
        }
      }
    }

    stage('Deploy to Dev'){
      agent { label 'jenkins-slave-helm' }
      steps {
        tagImage(sourceImageName: env.APP_NAME, sourceImagePath: env.BUILD, toImagePath: env.DEV, toImageName: env.APP_NAME, toImageTag: version )
        sh "cd charts/open-practice-library && helm upgrade -f dev-values.yaml --set deployment.created_image_tag=${version} opl-cms ."
      }
    }
  }
}

