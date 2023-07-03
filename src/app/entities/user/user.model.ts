export interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    confirmationPassword?: string;
}

export type NewUser = Omit<IUser, 'id'> & { id: null };
export type AuthUser = Omit<IUser, 'id' | 'firstname' | 'lastname'>