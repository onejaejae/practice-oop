import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Auth extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  certificationKey: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
