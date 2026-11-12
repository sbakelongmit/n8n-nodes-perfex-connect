# Publishing n8n-nodes-perfex-connect

This folder is the content of the public GitHub repository for the n8n package. n8n verifies community nodes only when
the package is on npm, published with npm provenance from a public GitHub repository.

## One-time set-up

1. Create a public GitHub repository named `n8n-nodes-perfex-connect` and push this folder to it.
2. In `package.json` check `repository` and `bugs` (github.com/sbakelongmit/n8n-nodes-perfex-connect).
3. On npmjs.com create an account (or organisation), then an access token of type "Automation" (or a granular token
   with publish rights for this package).
4. In the GitHub repository: Settings › Secrets and variables › Actions › New repository secret `NPM_TOKEN` = that token.

## Each release

1. Set `version` in `package.json` (it follows the Perfex Connect version, e.g. 1.5.0).
2. Commit, push, then create a GitHub release with the tag `v<version>`.
3. The workflow "Publish to npm" builds, lints and runs `npm publish --provenance --access public`.
4. Check the package: `npx @n8n/scan-community-package n8n-nodes-perfex-connect`.
5. Submit the package for verification in the n8n Creator Portal.

The workflow "Build and lint" runs on every push and pull request.
