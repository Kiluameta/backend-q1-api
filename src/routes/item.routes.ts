import { Router } from 'express';
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/item.controller';
import { authenticateToken } from '../middlewares/auth.middlewares';

const router = Router();

router.use(authenticateToken);

router.get('/', getItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;