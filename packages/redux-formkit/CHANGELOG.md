# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
No pending (unreleased changes) to mention

## [3.4.2] - 2019-05-23
### Fixed
- Fix rerender loop on updateFields action.

## [3.4.1] - 2019-05-22
### Changed
- Call traditional form submit if no onSubmit is provided.

## [3.3.21] - 2019-05-22
### Fixed
- Correct dispatch of resetFieldsIsDone which was causing 'ReferenceError: dispatch is not defined'.

## [3.3.20] - 2019-05-21
### Fixed
- Field error messages were not set correctly when updateFields action was dispatched. This was also impacting forms with initialvalues. 

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