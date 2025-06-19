
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { IsNotEmpty } from "class-validator";



export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done"
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid') 
  id!: string;

  @Column()
  @IsNotEmpty({ message: "Title is required" })
  title!: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({
    type: "text",  
    default: TaskStatus.TODO
  })
  status!: TaskStatus;

  @Column({ type: "date", nullable: true })
  dueDate?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

