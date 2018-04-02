const Promise = require('bluebird');

module.exports = {
  directive: 'DELE',
  handler: function ({log, command} = {}) {
    if (!this.fs) return this.reply(550, 'File system not instantiated');
    if (!this.fs.delete) return this.reply(402, 'Not supported by file system');

    const filePath = command.arg;
    const cmd = command.directive;

    return Promise.resolve(this.fs.delete(filePath))
    .then(() => {
      return this.reply(250)
      .then(() => this.emit(cmd, null, filePath));
    })
    .catch(err => {
      log.error(err);
      return this.reply(550, err.message);
    });
  },
  syntax: '{{cmd}} <path>',
  description: 'Delete file'
};