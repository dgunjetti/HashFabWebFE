pipeline {
  agent {
    kubernetes {
      label 'fe-build'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  name: fe-build
  labels:
    component: build
spec:
  containers:
  - name: fe-build
    image: dgunjetti/dockernode
    command:
    - cat
    tty: true
    volumeMounts:
    - name: server
      mountPath: /var/run/docker.sock
    - name: docker-cred
      mountPath: /etc/docker-cred
  volumes:
  - name: server
    hostPath:
      path: /var/run/docker.sock
  - name: docker-cred
    secret:
      secretName: docker-secret
"""
    }
  }
  stages {
    stage('Build') { 
      steps {
        container('fe-build') {
          dir('FE') {
            sh 'pwd'
            sh 'ls'
            sh 'npm i'
            sh 'npm run build'
          }

          sh 'docker build -t dgunjetti/hashfab-fe:1.2 .'
          sh 'cat /etc/docker-cred/password | docker login -u `cat /etc/docker-cred/username` --password-stdin'
          sh 'docker push dgunjetti/hashfab-fe:1.2'
        }               
      }
    }
  }
}