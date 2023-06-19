import { P } from "@fullcalendar/core/internal-common";
import { ITeam } from "../team/team.model";
import { IUser } from "../user/user.model";
import * as dayjs from 'dayjs/esm';

export interface ICalendarEvent {
    id: number;
    title: string;
    description: string;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    assignee: Pick<IUser, 'id'>;
    team: Pick<ITeam, 'id'>;
    taskId?: number;
}

export type NewCalendarEvent = Omit<ICalendarEvent, 'id'> & { id: null };