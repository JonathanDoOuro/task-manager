import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./status";

@Entity()
export class Task {
    
    @PrimaryGeneratedColumn()
    
    @Column()
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
    status: Status
}