# Publishing n8n-nodes-perfex-connect

n8n verifies community nodes only when the package is on npm with npm provenance from a public GitHub repository.
Releases use npm trusted publishing (GitHub Actions OIDC, no npm token) and npm staged publishing.

## One-time set-up (done for 1.5.0)

1. npmjs.com › n8n-nodes-perfex-connect › Settings › Trusted publishing › GitHub Actions: user `sbakelongmit`,
   repository `n8n-nodes-perfex-connect`, workflow `publish.yml`, no environment, allowed action "stage only".
2. Delete any old publish token on npm and the `NPM_TOKEN` secret in GitHub (no longer used).

## Each release

1. Set `version` in `package.json` (it follows the Perfex Connect version).
2. Commit, push, then create a GitHub release with the tag `<version>`.
3. The workflow "Publish to npm" builds, lints and runs `npm stage publish` (also runnable by hand: Actions › Publish to npm › Run workflow).
4. npmjs.com › Staged Packages › the new version › Approve (2FA). It is public from then on.
5. Check: `npx @n8n/scan-community-package n8n-nodes-perfex-connect` (needs Node 22 or later).

The workflow "Build and lint" runs on every push and pull request.
