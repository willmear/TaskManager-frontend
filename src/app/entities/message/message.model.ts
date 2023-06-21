import { ITeam } from "../team/team.model";
import { IUser } from "../user/user.model";

export interface IMessage {
    id: number;
    message: string;
    timestamp: Date;
    author : Pick<IUser, 'id' | 'firstname' | 'lastname' | 'email'>;
    Team: Pick<ITeam, 'id'>;
}

export type NewMessage = Omit<IMessage, 'id'> & { id: null };