var path = require('path');
var fs = require('fs');

var sys = require('sys')
var exec = require('child_process').exec;


/**
 * Read file and split it per line. Return array of trimmed lines.
 *
 * @param commentsFile
 * @returns {Array}
 */
var getComments = function getComments(commentsFile) {
    var comments = [];

    if (commentsFile) {
        var file = path.resolve(commentsFile);
        if (fs.statSync(file).isFile()) {
            var commentsRaw = fs.readFileSync(file, 'utf8').match(/[^\r\n]+/g); // read and split file at line breaks
            commentsRaw.forEach(function (s) {
                comments.push(s.trim());
            });
        }
    }

    return comments;
};


/**
 * Randomly distribute a given number of hours over a given number of tickets (bins).
 * Returns a nested array of integers, the same length as the number of tickets.
 * The sum of the array elements will be the same as the given number of hours.
 *
 * @param nrTickets
 * @param hours
 * @returns []
 */
var distributeHours = function distributeHours(nrTickets, hours) {

    if (nrTickets == 1)
        return [hours];
    else {
        var perTicketMax = Math.round(hours / nrTickets);
        var part = Math.round(perTicketMax * Math.random());
        return [part,
            distributeHours(nrTickets - 1, (hours - part))
        ];
    }
};

var flattenArrayOfArrays = function flattenArrayOfArrays(a, r) {
    if (!r) {
        r = []
    }
    for (var i = 0; i < a.length; i++) {
        if (a[i].constructor == Array) {
            flattenArrayOfArrays(a[i], r);
        } else {
            r.push(a[i]);
        }
    }
    return r;
};

// Fisher-Yates shuffle
function shuffle(array) {
    var i = 0
        , j = 0
        , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    return array;
}


var logwork = function logwork(tickets, hours, commentsFile, isDryRun) {
    var comments = [];

    !!commentsFile ? comments = shuffle(getComments(commentsFile)) : comments = [];
    var hoursDistributed = flattenArrayOfArrays(distributeHours(tickets.length, hours));


    // for each ticket, execute jira command
    tickets.forEach(function (ticket, index) {

        // Ignore tickets that got zero hours
        if (hoursDistributed[index] == 0)
            return;

        var child;
        var cmd = 'jira worklogadd ' + ticket + ' ' + hoursDistributed[index];
        if (!!commentsFile)
            cmd = cmd + ' "' + (comments[index % comments.length] || '') + '"';
        if (isDryRun)
            console.log('DRY RUN > ' + cmd);
        else {
            child = exec(cmd, function (error, stdout, stderr) {
                console.log(stdout);
                //console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        }
    });

};

exports = module.exports = logwork;
