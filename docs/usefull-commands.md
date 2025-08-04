# Usefull infos & commands

npm module public link:
- https://www.npmjs.com/package/@amwebexpert/react-native-sign-here

Whenever we publish, due to the @ package prefix we need to be explicit regarding public access:
- `npm publish --access=public`

Token generation on npmjs:
- `npm login`
- then goto https://www.npmjs.com/settings/amwebexpert/tokens
  - Generate New Token
  - Granular Access Token
- then on Github project, for the GitHub action to be able to publish:
  - goto https://github.com/VikingLichens/ci-cd-trials/settings/secrets/actions
  - add a repository secret (tokenname + value)
  - use it within the github action like so: `secrets.<token_name_here>`
