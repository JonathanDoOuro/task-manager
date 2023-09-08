import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./enums/status";

@Entity("task")
export class Task {
    
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: String;

    @Column()
    description: String;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.aFazer,
    })
    status: Status;

    @CreateDateColumn({ type: 'timestamp' })  
    date: Date;
}