
export interface User{
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  roles: {
    id: string;
    name: string;
  }[];
}

export interface UserFormType {
  email: string;
  password: string;
  name: string;
  isActive: boolean;
}

export interface UpdateUserInput{
  email?:string,
  name?:string,
  isActive?:boolean
}