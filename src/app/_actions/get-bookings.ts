"use server";
import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface getBookingsProps {
  serviceId: string;
  date: Date;
}
export const getBookings = ({ date }: getBookingsProps) => {
  return db.booking.findMany({
    //estamos pegando os agendamentos
    where: {
      //onde
      date: {
        //a data e horário estão entre
        lte: endOfDay(date), //less than or equal(menor ou igual a)o final do dia
        gte: startOfDay(date), // gran than or equal (maior ou igual a)o começo do dia
      },
    },
  });
};
