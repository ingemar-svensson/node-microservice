import { Request, Response } from 'express';
import KafkaProducer from '../../kafka/producer';

interface User {
  username: string;
  password: string;
}

// In-memory user store
const users: Map<string, string> = new Map();

export class AuthController {
  static async signup(req: Request, res: Response) {
    const user: User = req.body;
    users.set(user.username, user.password);

    const producer = KafkaProducer.getInstance();
    await producer.connect();
    await producer.sendMessage('user-signup', { username: user.username });
    await producer.disconnect();

    res.status(200).json({ message: 'User signed up' });
  }

  static login(req: Request, res: Response) {
    const user: User = req.body;
    const storedPassword = users.get(user.username);
    if (storedPassword && storedPassword === user.password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  static getUser(username: string): User | null {
    const password = users.get(username);
    if (password) {
      return { username, password };
    }
    return null;
  }
}
