const express = require('express');
const FtpSrv = require('ftp-srv');
const colors = require('colors');
const logger = require('simple-node-logger');


// FTP server config //
const ftpServer = new FtpSrv('ftp://192.168.2.55:8888', {
    greeting: 'You are connected! :)',
    anonymous: true
});

const opts = {
    errorEventName:'error',
        logDirectory:'./FOLDER/LOG',  //log location
        fileNamePattern:'ftp-<DATE>.log',  //log file name
        dateFormat:'MM.DD.YYYY'
};

const log = logger.createRollingFileLogger( opts );

log.info('========================================');
log.info('::SERVER STARTED:: ', new Date().toJSON());

ftpServer.on('login', ({connection, username}, resolve, reject) => {
    log.info('USER CONNECTED: ', username, ' on ', new Date().toJSON());
    console.log(colors.green.underline('User connected:'),' ', username);

    // Client error and log //
    connection.on('client-error', (connection, context, error) => {
        log.error('CLIENT ERROR: ', error, ' on ', new Date().toJSON());
        console.log(colors.red.underline('ERROR:'),' ', error);
    });

    resolve({root: './FOLDER'});
    reject({error: 'Error logging in a client'});

    // Event listeners for logging on CRUD //
    connectionEventWatch('RETR', 'FILE DOWNLOADED', 'DOWNLOAD ERROR');
    connectionEventWatch('MKD', 'DIRECTORY CREATED', 'DIRECTORY CREATE ERROR');
    connectionEventWatch('STOR', 'FILE UPLOADED', 'UPLOAD ERROR');
    connectionEventWatch('DELE', 'FILE DELETED', 'FILE DELETE ERROR');
    connectionEventWatch('RMD', 'DIRECTORY DELETED', 'DIRECTORY DELETE ERROR');

    function connectionEventWatch(CMD, MESSAGESUCCESS, MESSAGEFAILURE) {

        connection.on(CMD, (error, fileName) => {
            if(!error){
                log.info(MESSAGESUCCESS + ': ', process.cwd()+'/'+ fileName, ' on ', new Date().toJSON());
                console.log(colors.blue.underline(MESSAGESUCCESS), ' ', process.cwd()+'/'+fileName);
                console.log(colors.blue.underline('BY USER:'), ' ', username);
            } else {
                log.error(MESSAGEFAILURE + ': ', error, ' on  ', new Date().toJSON());
                console.log(colors.red.underline(MESSAGEFAILURE), ' ', error);
            }
        });
    }
});

ftpServer.listen().then(() => {});


