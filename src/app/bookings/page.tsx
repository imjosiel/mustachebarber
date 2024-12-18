import { getServerSession } from "next-auth";
import Header from "../_components/Header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import BookingItem from "../_components/BookingItem";
import { Separator } from "../_components/ui/separator";

const Bookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();
  const newBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  });

  const oldBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {newBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>

      <Separator />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Finalizados</h1>

        {oldBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  );
};

export default Bookings;
