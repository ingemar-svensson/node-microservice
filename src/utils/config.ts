// src/utils/config.ts
import fs from 'fs';
import path from 'path';

interface Config {
  port: number;
  grpcPort: number;
  kafkaBrokers: string[];
}

const configPath = path.join(__dirname, '../../config/config.json');
const configData = fs.readFileSync(configPath, 'utf8');
const config: Config = JSON.parse(configData);

export default config;
