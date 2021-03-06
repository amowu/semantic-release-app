/**
 * @copyright 2017-present, Charlike Mike Reagent <olsten.larck@gmail.com>
 * @license Apache-2.0
 */

const dedent = require('dedent')

const defaultConfig = {
  npmRegistry: 'https://registry.npmjs.org',
  majorHeading: ':scream: BREAKING CHANGES :bangbang:',
  minorHeading: ':tada: New Features',
  patchHeading: ':bug: Bug Fixes',
  releaseTemplate: dedent`
  ## [v{{nextVersion}}]({{compareLink}}) ({{date}})

  ### {{commit.heading}}
  - {{#if commit.scope}}**{{commit.scope}}:** {{/if}}{{commit.subject}} ({{commit.anchor}})

  {{#if commit.body.length}}
    {{commit.body}}
  {{/if}}

  [\`v{{currentVersion}}...v{{nextVersion}}\`]({{compareLink}})
  `,
}

/**
 *
 * @param {*} context
 */
module.exports = async function getConfig (context, robot) {
  robot.log('getConfig')
  let config = null

  try {
    robot.log('config .github/semantic-release.yml start')
    config = await context.config('.github/semantic-release.yml', defaultConfig)
    robot.log('config .github/semantic-release.yml finish')
  } catch (err) {
    robot.log(err)
    if (err.code !== 404) {
      throw err
    }
  }
  
  const newConfig = Object.assign({}, defaultConfig, config);
  
  robot.log('newConfig', newConfig)

  return newConfig
}
