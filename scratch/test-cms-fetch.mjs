import { getPublishedContent } from '../lib/cms-service.js';
import { getCmsVal } from '../lib/api-helper.js';

async function test() {
  const cms = await getPublishedContent('/services/interior-designing');
  console.log('CMS object loaded:', !!cms);
  console.log('Hero image from getCmsVal:', getCmsVal(cms, '/images/services/interior.png'));
  console.log('Residential image from getCmsVal:', getCmsVal(cms, '/images/services/interior_residential.png'));
  console.log('Commercial image from getCmsVal:', getCmsVal(cms, '/images/services/interior_commercial.png'));
  console.log('Fitout image from getCmsVal:', getCmsVal(cms, '/images/services/interior_fitout.png'));
  console.log('Decorative image from getCmsVal:', getCmsVal(cms, '/images/services/interior_decorative.png'));
  console.log('Furniture image from getCmsVal:', getCmsVal(cms, '/images/services/interior_furniture.png'));
  console.log('Workflow image from getCmsVal:', getCmsVal(cms, '/images/services/interior_workflow.png'));
  process.exit(0);
}

test();
