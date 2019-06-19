# cencosud-erik

| Choice   |      Why      |    Potential Issues    |
|----------|---------------|------------------------|
| React    |  fits requirements, I am familiar with it |
| Typescript |    will potentially help me find errors | additional build tooling adds complexity |
| create-react-app | batteries included, will help bootstrap the project quickly | opinionated |
| react-router    |  wide adoption, good pattern for state management |

## Dev environment 


Tested on:
* Ubuntu 18.04 / 18.10
* Node v8.16.0 / v10.15.2
* npm 6.4.1 / 6.9.0

### Installing:

Clone, `cd` to `./spa`

Run `npm i`

### Running dev mode:
In `./spa`: `npm start`


### Build Errors

Error: `npm does not support Node.js v10.15.2`

Problem: npm is wrong version

Solution: `sudo npm install npm -g`



Error: Hot reloading not working

Problem: some limit being hit by the watcher

Solution: `sudo echo 1048576 > /proc/sys/fs/inotify/max_user_watches`

Source: https://stackoverflow.com/a/42311067
