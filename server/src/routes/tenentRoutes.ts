import express from 'express';
import { 
    addFavoriteProperty,
    createTenant, 
    getCurrentResidence, 
    getTenant, 
    removeFavoriteProperty, 
    updateTenant, 
} from '../controller/tenantControllers';


const router = express.Router();

router.get('/:cognitoId', getTenant);
router.put('/:cognitoId', updateTenant);
router.get('/:cognitoId/current-residences', getCurrentResidence);
router.post('/:cognitoId/favorites/:propertyId', addFavoriteProperty);
router.delete('/:cognitoId/favorites/:propertyId', removeFavoriteProperty);

router.post('/', createTenant);


export default router;