// shipitfile.js
module.exports = shipit => {
    // Load shipit-deploy tasks
    require('shipit-deploy')(shipit)
  
    shipit.initConfig({
      default: {
        deployTo: '/var/apps/super-project',
        repositoryUrl: 'https://github.com/adowning/newparse.git',
      },
      staging: {
        servers: 'fix@ashdevtools.com',
      },
    })
  }