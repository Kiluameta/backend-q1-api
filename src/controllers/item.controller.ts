import { Request, Response } from 'express';
import pool from '../database/connection';
import { Item } from '../models/item.model';

export const getItems = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const result = await pool.query(
      'SELECT * FROM items WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar itens.' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { name, description }: Item = req.body;
    const result = await pool.query(
      'INSERT INTO items (user_id, name, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar item.' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const { name, description }: Item = req.body;
    const result = await pool.query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [name, description, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item não encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar item.' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM items WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item não encontrado.' });
    }

    res.json({ message: 'Item excluído com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir item.' });
  }
};