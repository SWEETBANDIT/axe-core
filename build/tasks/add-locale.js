/*eslint-env node */
'use strict';
let clone = require('clone');
let buildManual = require('../build-manual');

module.exports = function (grunt) {
  function mergeMessages(newMessages, oldMessages) {
    Object.keys(newMessages).forEach(function (key) {
      if (!oldMessages.hasOwnProperty(key)) {
        return;
      }

      let newValue = newMessages[key];
      let oldValue = oldMessages[key];

      if (typeof newValue === 'object') {
        // the message format might be changed, ignore old message
        if (typeof oldValue !== 'object') {
          return;
        }

        newMessages[key] = mergeMessages(clone(newValue), oldValue);
      } else {
        newMessages[key] = clone(oldValue);
      }
    });

    return newMessages;
  }

  grunt.registerMultiTask(
    'add-locale',
    'Task for localizing messages in rules and checks',
    function () {
      let options = this.options({
        rules: ['lib/rules/**/*.json'],
        checks: ['lib/checks/**/*.json'],
        misc: ['lib/misc/**/*.json'],
        blacklist: ['metadata'],
        tags: '',
        lang: 'xxx'
      });

      this.files.forEach(function (file) {
        let commons = file.src[0];

        buildManual(grunt, options, commons, function (result) {
          let locale = {
            lang: options.lang,
            rules: result.rules.reduce(function (out, rule) {
              out[rule.id] = rule.metadata;
              return out;
            }, {}),
            checks: result.checks.reduce(function (out, check) {
              if (check.metadata) {
                out[check.id] = check.metadata.messages;
              }
              return out;
            }, {}),
            failureSummaries: result.misc.reduce(function (out, misc) {
              out[misc.type] = misc.metadata;
              return out;
            }, {}),
            incompleteFallbackMessage: result.misc.reduce(function (out, misc) {
              return misc.incompleteFallbackMessage
                ? misc.incompleteFallbackMessage
                : out;
            }, '')
          };

          // update locale file if exists
          let localeFile = './locales/' + options.lang + '.json';
          if (grunt.file.exists(localeFile)) {
            let oldMessages = grunt.file.readJSON(localeFile);

            // mergeMessages mutates out
            mergeMessages(locale, oldMessages);
          }

          grunt.file.write(file.dest, JSON.stringify(locale, null, '  '));
          console.log('created file at', file.dest);
        });
      });
    }
  );
};
