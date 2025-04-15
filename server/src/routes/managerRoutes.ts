import express from 'express';
import { 
    createManager, 
    getManager, 
    getManagerProperites, 
    updateManager, 
} from '../controller/managerControllers';


const router = express.Router();

router.get('/:cognitoId', getManager);
router.put('/:cognitoId', updateManager);
router.get('/:cognitoId/properties', getManagerProperites)
router.post('/', createManager);


export default router;