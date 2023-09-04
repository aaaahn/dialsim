const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "xz8xtb",
  e2e: {
    baseUrl: 'http://localhost:1234',
    supportFile: false
  },
})
