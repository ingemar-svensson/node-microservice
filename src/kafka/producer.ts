// src/kafka/producer.ts
import { Kafka, Producer } from 'kafkajs';
import config from '../utils/config';

class KafkaProducer {
  private static instance: KafkaProducer;
  private producer: Producer;

  private constructor() {
    const kafka = new Kafka({
      clientId: 'auth-service',
      brokers: config.kafkaBrokers,
    });
    this.producer = kafka.producer();
  }

  public static getInstance(): KafkaProducer {
    if (!KafkaProducer.instance) {
      KafkaProducer.instance = new KafkaProducer();
    }
    return KafkaProducer.instance;
  }

  public async connect() {
    await this.producer.connect();
  }

  public async disconnect() {
    await this.producer.disconnect();
  }

  public async sendMessage(topic: string, message: object) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}

export default KafkaProducer;
