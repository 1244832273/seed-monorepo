# # This is a basic workflow to help you get started with Actions

# name: action-publish

# # Controls when the workflow will run
# on:
#   # Triggers the workflow on push or pull request events but only for the "release" branch
#   pull_request:
#     types: [closed]

#   # Allows you to run this workflow manually from the Actions tab
#   workflow_dispatch:

# # A workflow run is made up of one or more jobs that can run sequentially or in parallel
# jobs:
#   release:
#     name: Release
#     if: github.event.pull_request.merged == true
#     runs-on: ubuntu-latest
#     steps:
#       - name: Checkout Repo
#         uses: actions/checkout@v3
      
#       - name: install pnpm
#         uses: pnpm/action-setup@v2.2.2
#         with:
#           version: 7

#       - name: Setup Node.js 16.x
#         uses: actions/setup-node@v3
#         with:
#           node-version: 16.x
#           cache: 'pnpm'
      
#       - name: Install dependencies
#         run: pnpm install

#       - name: Create Release Pull Request or Publish to npm
#         id: changesets
#         uses: changesets/action@v1
#         with:
#           publish: pnpm ci:publish
#         env:
#           GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
#           NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

#       - name: Send a Slack notification if a publish happens
#         if: steps.changesets.outputs.published == 'true'
#         # You can do something when a publish happens.
#         run: my-slack-bot send-notification --message "A new version of ${GITHUB_REPOSITORY} was published!"

