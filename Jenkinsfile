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

  echo "Starting Pipeline for ${APP_NAME}..."

}


pipeline {
   agent { label 'jenkins-slave-npm' }
   environment {
        NODE_ENV="production"
        DATABASE_HOST="opl-mongodb"
        VERSION_TAG="""${sh(
                        returnStdout: true,
                        script: 'cat package.json | grep version | head -1 | awk -F: \'{ print $2 }\' | sed \'s/[",]//g\' '
                    )}"""
   }
   stages {
    stage('Install') {
        steps{
          sh "npm install"
          }
    }
    stage('Build'){
        steps{
          sh "npm run build"
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
        tagImage(sourceImageName: env.APP_NAME, sourceImagePath: env.BUILD, toImagePath: env.DEV, toImageName: env.APP_NAME, toImageTag: "${VERSION_TAG}" )
        sh "cd charts/open-practice-library && helm upgrade -f dev-values.yaml --set deployment.created_image_tag=${VERSION_TAG} opl-cms ."
      }
    }
  }
}

