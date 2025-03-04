import jwt from "../utils/jwt.key";
import { prisma } from "../db/prisma.db";
import { IPayload } from "../types/types";

export const verifyToken = async (token: string) => {
  try{
  const decode:IPayload | any = jwt.verify(token);
  const username = decode?.username;
  const id = decode?.id
  const verifyColab = await prisma.userColab.findUnique({
    where: { username },
  });
  if(!verifyColab) return false

  return {username, id}
  }catch(error){
    return false
  }
  
};
