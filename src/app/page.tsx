import Header from "./_components/Header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { AppData } from "./_components/config/appData";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/BarbershopItem";
import { quickSearchOptions } from "./_constants/quickSearchQueries";
import BookingItem from "./_components/BookingItem";
import Search from "./_components/Search";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";

const Home = async () => {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({});
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const bookings = session?.user
    ? await db.booking.findMany({
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
        orderBy: {
          date: "asc",
        },
      })
    : [];
  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, {session?.user?.name}</h2>
        <p>Segunda-feira, 05 de Agosto</p>
      </div>

      <Search />
      <div className="pb-5">
        <div className="flex gap-3 overflow-auto px-5 [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="gap-2" variant={"secondary"}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="px-5">
        <div className="relative h-[200px] w-full">
          <Image
            src={AppData.ads.imgUrl}
            alt={AppData.ads.description}
            fill
            className="rounded-xl object-cover px-1"
          />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
        {bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>

      <div className="p-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="p-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarberShops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
