#!/usr/bin/env node

var program = require('commander');
var logwork = require('./lib/logwork');

program
  .arguments('<jira_ticket> [more_tickets...]')
  .option('-h, --hours <hours>', 'The number of hours to distribute over the tickets. Integer. Defqult is 8h.')
  .option('-c, --commentsFile <full path to file>', 'File with comma separated strings to use as random comments to the worklog. Default is no comments.')
  .action(function (jira_ticket, more_tickets) {
      logwork(jira_ticket, more_tickets, (program.hours || 8), (program.commentsFile || false));
  })
  .parse(process.argv);