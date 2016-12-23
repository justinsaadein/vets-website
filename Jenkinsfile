def envNames = ['development', 'staging', 'production']


env.NODE_ENV = 'production'

def isPushNotificationOnFeature = {
  !env.CHANGE_TARGET && !['master', 'production'].contains(env.BRANCH_NAME)
}

def isContentTeamUpdate = {
  env.BRANCH_NAME ==~ /^content\/wip\/.*/
}

def isDeployable = {
  (env.BRANCH_NAME == 'master' ||
    env.BRANCH_NAME == 'production') &&
    !env.CHANGE_TARGET
}

def buildDetails = { vars ->
  """
    BUILDTYPE=${vars['buildtype']}
    NODE_ENV=production
    BRANCH_NAME=${env.BRANCH_NAME}
    CHANGE_TARGET=${env.CHANGE_TARGET}
    BUILD_ID=${env.BUILD_ID}
    BUILD_NUMBER=${env.BUILD_NUMBER}
  """.stripIndent()
}

node('vets-website-linting') {
  def dockerImage, args

  // Checkout source, create output directories, build container

  stage('Setup') {
    if (isPushNotificationOnFeature()) {
      return
    }

    checkout scm

    sh "mkdir -p build"
    sh "mkdir -p logs/selenium"

    dockerImage = docker.build("vets-website:${env.BUILD_TAG}")
    args = "-u root:root -v ${pwd()}/build:/application/build -v ${pwd()}/logs:/application/logs"
  }

  // Check package.json for known vulnerabilities

  stage('Security') {
    if (isContentTeamUpdate() || isPushNotificationOnFeature()) {
      return
    }

    dockerImage.inside(args) {
      sh "cd /application && nsp check" 
    }
  }

/*
  // Check source for syntax issues

  stage('Lint') {
    if (isContentTeamUpdate() || isPushNotificationOnFeature()) {
      return
    }

    dockerImage.inside(args) {
      sh "cd /application && npm --no-color run lint"
    }
  }

  stage('Unit') {
    if (isContentTeamUpdate() || isPushNotificationOnFeature()) {
      return
    }

    sh "cd /application && npm --no-color run test:unit"
  }

  // Perform a build for each required build type

  stage('Build') {
    if (isPushNotificationOnFeature()) {
      return
    }

    Set buildSet = ['production']

    if (isContentTeamUpdate()) {
      buildSet = ['development']
    }

    if (env.BRANCH_NAME == 'master') {
      buildSet << 'development'
      buildSet << 'staging'
    }

    def buildList = buildSet.toList()
    def builds = [:]

    for (int i=0; i<buildList.size(); i++) {
      def envName = buildList.get(i)

      builds[envName] = {
        dockerImage.inside(args) {
          sh "cd /application && npm --no-color run build -- --buildtype=${envName}"
          sh "cd /application && echo \"${buildDetails('buildtype': envName)}\" > build/${envName}/BUILD.txt" 
        }
      }
    }

    parallel builds
  }

  // Run integration tests for each build type

  stage('Integration') {
    if (isContentTeamUpdate() || isPushNotificationOnFeature()) {
      return
    }

    parallel [
      'e2e': {
        dockerImage.inside(args + " -e BUILDTYPE=production") {
          sh "cd /application && npm --no-color run test:e2e"
        }
      },

      'accessibility': {
        dockerImage.inside(args + " -e BUILDTYPE=production") {
          sh "cd /application && npm --no-color run test:accessibility"
        }
      },
    ]
  }

  stage('Deploy') {
    if (!isDeployable()) {
      return
    } 

    def targets = [
      'master': [
        [ 'build': 'development', 'bucket': 'dev.vets.gov' ],
        [ 'build': 'staging', 'bucket': 'staging.vets.gov' ],
      ],

      'production': [
        [ 'build': 'production', 'bucket': 'www.vets.gov' ]
      ],
    ][env.BRANCH_NAME]

    def builds = [:]

    for (int i=0; i<targets.size(); i++) {
      def target = targets.get(i)

      builds[target['bucket']] = {
        dockerImage.inside(args) {
          withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'vets-website-s3',
                              usernameVariable: 'AWS_ACCESS_KEY', passwordVariable: 'AWS_SECRET_KEY']]) {
          sh "s3-cli sync --acl-public --delete-removed --recursive --region us-gov-west-1 /application/build/${target['build']} s3://${target['bucket']}/"
          }
        }
      }
    }

    parallel builds
  } 
*/
}
