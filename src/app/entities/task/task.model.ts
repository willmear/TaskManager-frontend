import { ITeam } from "../team/team.model";
import { IUser } from "../user/user.model";
import * as dayjs from 'dayjs/esm';


export interface ITask {
    id: number;
    title: string;
    assignee: string;
    dueDate: Date;
    description: string;
    priority: string;
    teamId: number;
    status: string;
}

export interface GetTask {
    id: number;
    title: string;
    assignee: IUser;
    dueDate: Date;
    startDate: Date;
    description: string;
    priority: string;
    team: ITeam;
    status: string;
}

export interface UpdateTask {
    id: number;
    title?: string;
    assignee?: number;
    dueDate?: Date;
    startDate?: Date;
    description?: string;
    priority?: string;
    status?: string;
}

export type NewTask = Omit<ITask, 'id' | 'status'> & { id: null };

// public class Task {
//     @GeneratedValue
//     @Id
//     private Integer id;
//     @Enumerated(EnumType.STRING)
//     private Status status;
//     @ManyToOne
//     private User assignee;
//     @ManyToOne
//     private Team team;
//     private LocalDate startDate;
//     private LocalDate dueDate;
//     private String description;
//     private Priority priority;
// }