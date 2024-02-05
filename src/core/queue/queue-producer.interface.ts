export const QueueProducerKey = 'QueueProducerKey';

export interface IQueueProducer {
  mailSend(email: string, certificationKey: string): Promise<void>;
}
