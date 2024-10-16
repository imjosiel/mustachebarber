import { SearchIcon } from "lucide-react";
import Header from "./_components/Header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { AppData } from "./_components/config/appData";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/BarbershopItem";
import Footer from "./_components/Footer";
import { quickSearchOptions } from "./_constants/quickSearchQueries";
import BookingItem from "./_components/BookingItem";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({});
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  console.log({ barbershops });
  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, pessoa</h2>
        <p>Segunda-feira, 05 de Agosto</p>
      </div>

      <div className="mt-[24px] flex gap-1 p-5">
        <Input placeholder="O que deseja?" />
        <Button>
          <SearchIcon />
        </Button>
      </div>
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

      <div className="p-5">
        <BookingItem />
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
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
