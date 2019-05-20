# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
No pending (unreleased changes) to mention

## [3.3.19] - 2019-05-20
### Changed
- Improve docs

## [3.3.18] - 2019-05-18
### Changed
- Update Field to reinstate useTargetCondition prop which is useful for writting RadioButton components

## [3.3.17] - 2019-05-17
### Changed
- Improve docs

## [3.3.16] - 2019-05-13
### Changed
- Improve docs

## [3.3.15] - 2019-05-13
### Changed
- Pass fieldInterface plus any extra props to validate functions as a third parameter. eg this can be used to use text of field name or label as part of an error message.

## [3.3.14] - 2019-05-12
### Changed
- Improve docs

## [3.3.13] - 2019-05-12
### Fixed
- Remove unwanted console.log

## [3.3.12] - 2019-05-12
### Changed
- Remove unused values from state.formStatus: isRestFieldDue & isPrevalidatedOnServer

## [3.3.11] - 2019-05-11
### Added
- Add stories/introduction with live example

## [3.3.10] - 2019-05-8
### Changed
- Assert that FormStateProvider is included so that forms that have accidently missed it are easier to debug. 

## [3.3.9] - 2019-05-7
### Changed
- Use yarn (with workspaces)