import API from "./axios";

export const register = async (body: 
  { email: string; password: string }) => {
  const { data } = await
   API.post("/Account/register", body);
  return data;
};

export const login = async (body: 
  { userName: string; password: string }) => {
  const { data } = await
   API.post("/Account/login", body);
  return data;
};
