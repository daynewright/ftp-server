# 🗄 Simple FTP Node Server

Simple FTP Node server implimentation of [ftp-srv](https://www.npmjs.com/package/ftp-srv).

 - Logs create & delete events to console.
 - Logs create & delete events to `ftp-<DATE>.log` file


## Install

### 1) Clone repo:

 `git clone <repo>`

 `cd <repo>`

### 2) Install dependencies:

 `npm install`

 You need to replace two files in ftp-srv for event emitters _(temporary solution)_:
<br/>
    `node-modules/ftp-srv/src/commands/registration/mkd.js` with `TEMP/mkd.js` 
<br/>
    `node-modules/ftp-srv/src/commands/registration/dele.js` with `TEMP/dele.js`

### 3) Update configs:

 _TODO: Separate out config file_

 - Change FTP IP & port
 - Change `logDirectory` location

### 4) Update FTP Login

_TODO: Add login & remove @anonymous_

Currently works for anonymous FTP user but you can add a [secure user](https://github.com/trs/ftp-srv/tree/4205caf7acce9457f65d71f7e6bd018dae063353#login)

<hr/>

🎥 _Quick project for use with [WIFI outdoor camera](https://www.amazon.com/Wireless-Security-Waterproof-Surveillance-Detection/dp/B077889YRN/) to store files locally_ 






