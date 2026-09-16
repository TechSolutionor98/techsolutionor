import { scanRoutes } from '../lib/cms-service.js';

async function main() {
  console.log('Starting full scanRoutes synchronization...');
  const routes = await scanRoutes();
  console.log(`scanRoutes finished successfully! Total routes returned: ${routes.length}`);
  process.exit(0);
}

main().catch(err => {
  console.error('Failed to run scanRoutes:', err);
  process.exit(1);
});
