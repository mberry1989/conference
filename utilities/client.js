import { createDeliveryClient } from '@kontent-ai/delivery-sdk';


// initialize delivery client
const deliveryClient = createDeliveryClient({
    projectId: process.env.KONTENT_PROJECT_ID
});

export default deliveryClient