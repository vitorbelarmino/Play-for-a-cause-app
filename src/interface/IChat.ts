import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IChat {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  users: IUser[];
  messages: IMessage[];
}
