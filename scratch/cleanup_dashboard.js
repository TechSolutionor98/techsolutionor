const fs = require('fs');
const path = require('path');

const filesToDelete = [
  path.join(__dirname, '..', 'app', 'admin', 'AdminDashboardClient.js'),
  path.join(__dirname, '..', 'app', 'api', 'admin', 'dashboard-stats', 'route.js')
];

filesToDelete.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log('Deleted:', file);
  }
});
