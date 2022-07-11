import { Entity, Column } from "typeorm";

import { BaseEntity } from "../config/base.entity";

@Entity({name: 'user'})
export class UserEntity extends BaseEntity {
  @Column({name: 'username', type: 'varchar', length: 255})
  username!: string;


  @Column({name: 'name', type: 'varchar', length: 255})
  name!: string;


  @Column({name: 'lastname', type: 'varchar', length: 255})
  lastname!: string;

  @Column()
  phone!: number;
}
