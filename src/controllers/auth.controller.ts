import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../database/connection';
import { generateToken } from '../utils/jwt.utils';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(pool)
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

    const token = generateToken({ userId: result.rows[0].id });

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      token,
      user: {
        userId: result.rows[0].id,
        username: result.rows[0].username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      result.rows[0].password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const token = generateToken({ userId: result.rows[0].id });

    res.json({
      message: 'Login realizado com sucesso!',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
};