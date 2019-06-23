# Game of Thrones API consumption demo

## Dev environment 

### Tested on:
* Ubuntu 18.04 / 18.10
* Node v8.16.0 / v10.15.2
* npm 6.4.1 / 6.9.0
* Firefox 67 / Chrome 75

### Installing and running:
1. Clone Repo
1. Run `npm i`
1. Run `npm start`

If running in an Amazon Cloud9 environment, follow the same procedure, then click on Preview > Running Application to get the preview URL

---

## Publishing

### CI/CD with AWS Amplify

* After verifying local build, push to `stage` branch, and wait for CI to run tests and build. Verify on [stage.erik.cl](https://stage.erik.cl)
* After verifying local build, push to `deploy` branch, and wait for CI to run tests and build. Verify on [deploy.erik.cl](https://deploy.erik.cl)

---

## Technology choices

| Choice   |      Why      |    Potential Issues    |
|----------|---------------|------------------------|
| React    |  fits requirements, I am familiar with it |
| Typescript |    will potentially help me find errors | additional build tooling adds complexity |
| create-react-app | batteries included, will help bootstrap the project quickly | opinionated |
| react-router    |  wide adoption, good pattern for state management |
| ant design    |  gives me premade design patterns so that I can get something up quickly | I'm not familiar with it, so might run into unexpected issues |

---

## Troubleshooting

#### Error: `npm does not support Node.js v10.15.2`
* Problem: npm is wrong version
* Solution: `sudo npm install npm -g`

#### Error: Hot reloading not working
* Problem: some limit being hit by the watcher
* Solution: `sudo echo 1048576 > /proc/sys/fs/inotify/max_user_watches`
* Source: https://stackoverflow.com/a/42311067

---