import { createDeliveryClient } from '@kontent-ai/delivery-sdk';


// initialize delivery client
const deliveryClient = createDeliveryClient({
    projectId: process.env.KONTENT_PROJECT_ID,
    previewApiKey: process.env.KONTENT_PREVIEW_KEY,
    defaultQueryConfig: {
        usePreviewMode: Boolean(process.env.KONTENT_PREVIEW)
      }
});

export default deliveryClient