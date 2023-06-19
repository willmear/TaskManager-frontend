import { IUser } from "../user/user.model";

export interface ITeam {
    id: number;
    name: string;
    members: IUser[];
    admin: IUser;
}

export interface FauxTeam {
    id: number;
    name: string;
    members: string[];
    admin: IUser;
}

export type NewTeam = Omit<FauxTeam, 'id' | 'admin'> & { id: null };


