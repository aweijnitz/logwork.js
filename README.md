# LogWork - A command line utility for easy jira worklogging

## Motivation
Sometimes it can be difficult to track time to dedicated Jira tickets when working in multiple issues, 
all relating to a single feature. This is where LogWork comes in handy. It lets you simply specify a 
number of hours to distribute and a list of tickets to distribute them on. LogWork will take care of the rest.

## How to use

__Log 6 hours to the three given tickets, adding random comments from the given file__
```bash
$ logwork -c ./example/comments.txt 6 TICKET-A TICKET-B TICKET-C
```
__Dry Run Mode! Same thing as above, but just list the commands, do nothing__
```bash
$ logwork -c ./example/comments.txt 6 TICKET-A TICKET-B TICKET-C
```

__Diplay usage info
```bash
$ logwork -h # Displays usage info
```

## Installation

1. Install [jira-cmd](https://github.com/germanrcuriel/jira-cmd#readme) and set it up (user/password, etc).
2. ```npm install logwork```


