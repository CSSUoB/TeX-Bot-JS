# Contributing

A big welcome and thank you for considering contributing to CSS' open source projects! We welcome anybody who wants to contribute, and we actively encourage everyone to do so, especially if you have never contributed before.

## Quick links

* [Getting started](#getting-started)
* [Using the issue tracker](#using-the-issue-tracker)
* [Project structure](#project-structure)
* [Making your first contribution](#making-your-first-contribution)
* [Guidance](#guidance)

## Getting started

If you have never used git before, we would recommend that you read the [GitHub's Getting Started guide](https://guides.github.com/introduction/getting-started-with-git/). Additionally, linked below are some helpful resources:

* [GitHub git guides](https://github.com/git-guides)
* [git - the simple guide](https://rogerdudler.github.io/git-guide/)
* [Getting Git Right (Atlassian)](https://www.atlassian.com/git/)

If you are new to contributing to open-source projects on GitHub, the general workflow is as follows:
1. Fork this repository and clone it
2. Create a branch off master
3. Make your changes and commit them
4. Push your local branch to your remote fork
5. Open a new pull request on GitHub

We recommend also reading the following if you're unsure or not confident:

* https://makeapullrequest.com/
* https://www.firsttimersonly.com/

## Using the issue tracker

We use GitHub issues to track bugs and feature requests. If you find an issue with the bot, the best place to report it is through the issue tracker. If you are looking for issues to contribute code to, it's a good idea to look at the [issues labelled "good-first-issue"](https://github.com/CSSUoB/TeX-Bot-JS/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Agood-first-issue)!

When submitting an issue, please be as descriptive as possible. If you are submitting a bug report, please include the steps to reproduce the bug, and the environment it is in. If you are submitting a feature request, please include the steps to implement the feature.

## Project structure

This bot is written in JavaScript using discord.js and uses [Discord's slash commands](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ). We would recommend being somewhat familiar with the library and language terminology before contributing.

* `commands`: contains slash commands
  * Each module must export an object with a `data` parameter with a [SlashCommandBuilder](https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder). 
  * Additionally, there must also be a method `execute` with an [interaction](https://discord.js.org/#/docs/discord.js/main/class/BaseInteraction) object as its only argument.
* `events`: contains event listeners

## Making your first contribution

After you have found an issue which needs solving, it's time to start working on a fix! However, there are a few guidelines we would like you to follow first.

### Code style

In general, follow the formatting in the file you are editing. We also have ESLint and Prettier files which you can configure your editor to use.

### Git commit messages

Commit messages should be written in the imperative, present tense. For example, "Fix bug #1".

Additionally, we request that you keep the commit subject under 80 characters for a comfortable viewing experience on GitHub and other git tools. If you need more, please use the body of the commit.

For example:
```
Fix TeX becoming sentient

<more detailed description here>
```

### What happens next?

Once you have made your changes, please describe them in your pull request in full. We will then review them and communicate with you on GitHub. We may ask you to change a few things so please do check GitHub or your emails frequently.

After that, that's it! You've made your first contribution. 🎉

## License

Please note that any contributions you make will be made under the terms of the [Apache Licence 2.0](https://github.com/CSSUoB/TeX-Bot-JS/blob/main/LICENSE).

## Guidance

We aim to get more people involved with our projects, and help build members' confidence in using git and contributing to open-source. If you see an error, we encourage you to *be bold* and fix it yourself, rather than just raising an issue. If you are stuck, need help, or have a question, the best place to ask is on our Discord.

Happy editing!
