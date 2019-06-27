# Syncret

Syncret is a cli tool that lets you sync LastPass secure notes as files to your filesystem. My use case for this was 
wanting to find a way to store secrets and sensitive data in a way similar to [RCM](https://github.com/thoughtbot/rcm).
For example, syncing my AWS credentials, secure tokens (like GitHub tokens). This piece plays a crucial role in 
[automating my entire development environment configuration](https://github.com/tomtomau/provision-dev).

## Setup & requirements

TODO: Install info

Syncret uses the [lpass](https://github.com/lastpass/lastpass-cli) LastPass CLI tool under the hood to communicate with
LastPass.
