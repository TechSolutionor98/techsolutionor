const { getCmsVal } = require('../lib/api-helper.js');

// Mock content from DB as would be returned when admin updates an image
const mockDbContent = {
  sections: [
    {
      sectionId: 'interior_designing_overview__hero_',
      fields: {
        t_image_12: {
          type: 'image',
          value: 'https://res.cloudinary.com/demo/image/upload/v12345/hero.jpg',
          originalValue: '/images/services/interior.png'
        }
      }
    },
    {
      sectionId: 'our_interior_designing_services',
      fields: {
        t_image_39: {
          type: 'image',
          value: 'https://res.cloudinary.com/demo/image/upload/v12345/residential.jpg',
          originalValue: '/images/services/interior_residential.png'
        },
        t_image_40: {
          type: 'image',
          value: 'https://res.cloudinary.com/demo/image/upload/v12345/commercial.jpg',
          originalValue: '/images/services/interior_commercial.png'
        },
        t_image_55: {
          type: 'image',
          value: 'https://res.cloudinary.com/demo/image/upload/v12345/fitout.jpg',
          originalValue: '/images/services/interior_fitout.png'
        },
        t_image_56: {
          type: 'image',
          value: 'https://res.cloudinary.com/demo/image/upload/v12345/decorative.jpg',
          originalValue: '/images/services/interior_decorative.png'
        },
        t_image_71: {
          type: 'image',
          value: 'https://res.cloudinary.com/demo/image/upload/v12345/furniture.jpg',
          originalValue: '/images/services/interior_furniture.png'
        }
      }
    },
    {
      sectionId: 'our_workflow',
      fields: {
        t_image_119: {
          type: 'image',
          value: 'https://res.cloudinary.com/demo/image/upload/v12345/workflow.jpg',
          originalValue: '/images/services/interior_workflow.png'
        }
      }
    }
  ]
};

const t = (val) => getCmsVal(mockDbContent, val);

console.log('Hero image:', t('/images/services/interior.png'));
console.log('Residential image:', t('/images/services/interior_residential.png'));
console.log('Commercial image:', t('/images/services/interior_commercial.png'));
console.log('Fitout image:', t('/images/services/interior_fitout.png'));
console.log('Decorative image:', t('/images/services/interior_decorative.png'));
console.log('Furniture image:', t('/images/services/interior_furniture.png'));
console.log('Workflow image:', t('/images/services/interior_workflow.png'));
