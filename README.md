# LogWork - A command line utility for easy jira work logging

## Motivation
Sometimes it can be difficult to track time to dedicated Jira tickets when working on multiple issues, 
all relating to a single feature. This is where LogWork comes in handy. It lets you simply specify a 
number of hours to distribute and a list of tickets to distribute them on. LogWork will take care of the rest.


## Installation

1. Install [jira-cmd](https://github.com/germanrcuriel/jira-cmd#readme) and set it up (user/password, etc). ```npm install -g jira-cmd```
2. ```npm install -g logwork```


## How to use

__Log 6 hours randomly to the three given tickets, adding comments from the given file__
```bash
# Note! A ticket might get zero hours on a given day. If so, it will be ignored and not logged to jira.
$ logwork -d -c ./example/comments.txt 6 TICKET-A TICKET-B TICKET-C  
```
__Dry Run Mode! Same thing as above, but just list the commands, do nothing__
```bash
$ logwork -c ./example/comments.txt 6 TICKET-A TICKET-B TICKET-C
```

__Diplay usage info__
```bash
$ logwork -h 
$ logwork --help
```

__(Optional) Including your own worklog comments__

1. Create a file with comments to pick from. See [example](./example/comments.txt). Comments must be separated by line breaks.
2. Use the ```-c``` option and point to the file. LogWork will pick randomly form the comments and include them in the worklog.

_Example_
```bash
$ logwork -c ./example/comments.txt 6 TICKET-A TICKET-B TICKET-C
```


## How it works
The supplied number of hours will be randomly distributed over the list of tickets given. For each ticket with 
more than zero hours to it, jira-cmd will be invoked with the _worklogadd_ command.

```bash
# Example of the type of commands that will be created and run
$ jira worklogadd TICKET-A 2
or
$ jira worklogadd TICKET-B 1 "Refactoring and implementation"
```

## Releasing a new version

1. Make sure working directory is clean and everyting is checked in.
2. Update the version ```npm version minor -m "Comment here"```. [More details](https://docs.npmjs.com/cli/version).
3. Publish the new version ```npm publish```. [More details](https://docs.npmjs.com/getting-started/publishing-npm-packages)
