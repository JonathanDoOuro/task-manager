import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./enums/status";

@Entity("task")
export class Task {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.naoIniciada,
    })
    status: Status;

    @CreateDateColumn({ type: 'timestamp' })  
    date: Date;
}