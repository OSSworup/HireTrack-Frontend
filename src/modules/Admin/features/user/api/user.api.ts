import { api } from "../../../../../api/client";
import type {
  User,
  UserFormType,
  UpdateUserInput,
} from "../types/types";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/user/list");
  return response.data;
};

export const createUser = async (data: UserFormType) => {
  const response = await api.post("/user/register", data);
  return response.data;
};

export const updateUser = async (
  id: string,
  data: UpdateUserInput
) => {
  const response = await api.patch(`/user/update/${id}`, data);
  return response.data;
};

export const updatePassword = async (
  id: string,
  newPassword: string
) => {
  const response = await api.patch(
    `/user/updatePassword/${id}`,
    { password: newPassword }
  );

  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/user/delete/${id}`);
  return response.data;
};