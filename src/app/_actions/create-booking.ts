"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
interface CreateBookingParams {
  userId: string;
  serviceId: string;
  date: Date;
}
export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions);
  if (!user) throw new Error("Usuário não autenticado");
  /*TODO: && condicional pra verificar se é um administrador */
  if ((user.user as any).id != params.userId)
    throw new Error("Usuário não autorizado"); //TODO: remover quando as roles forem implementadas

  await db.booking.create({
    data: params,
  });
  revalidatePath("/barbershops/[id]");
};
