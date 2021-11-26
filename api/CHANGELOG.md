# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Types of changes**:

- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## [Unreleased]

## [0.7.1] - 2021-11-26

### Changed

- Update the frontend URLs (email validation and token authentication)

## [0.7.0] - 2021-04-11

### Added

- Allow to fetch a comment's ancestors

### Changed

- Update reaction types
- Allow to specify the page size through a query param
- Align this package version with the app

## [0.5.3] - 2021-01-10

### Added

- Send a notification when a comments area requset is moderated

## [0.5.2] - 2020-11-10

### Added

- Allow to create comments area without an identifier

### Changed

- Multi-stage build

## [0.5.1] - 2020-10-10

### Added

- Implement database seeds
- List reported comments
- Ignore reported comments
- Add HTTPS support in development
- Delete reported comments
- Custom application logging
- Use redis to store the sessions

### Changed

- Multiple roles auhorization

## [0.5.0] - 2020-09-22

### Added

- Request to open new comments area
- List open comments area requests
- Reject a new comments area request
- Update user roles

### Removed

- Email authorization

## [0.4.2] - 2020-07-21

### Added

- Return email requires validation

## [0.4.1] - 2020-07-11

### Changed

- Render email using mjml and handlebars
- Validate the user email through the app

### Fixed

- Replace all replacements occurrences in email templates
- Copy assets after build

## [0.4.0] - 2020-06-13

### Added

- This changelog
