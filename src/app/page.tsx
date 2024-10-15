import { SearchIcon } from "lucide-react";
import Header from "./_components/Header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { AppData } from "./_components/config/appData";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/BarbershopItem";
import Footer from "./_components/Footer";

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
          <Button className="gap-2" variant={"secondary"}>
            <Image
              src={"/images/hairIcon.svg"}
              width={16}
              height={16}
              alt="Cabelo"
            />
            Cabelo
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image
              src={"/images/moustacheIcon.svg"}
              width={16}
              height={16}
              alt="Barba"
            />
            Barba
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image
              src={"/images/barberIcon.svg"}
              width={16}
              height={16}
              alt="Cabelo"
            />
            Sobrancelha
          </Button>

          <Button className="gap-2" variant={"secondary"}>
            <Image
              src={"/images/shaverIcon.svg"}
              width={16}
              height={16}
              alt="Cabelo"
            />
            Pezinho
          </Button>
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
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card className="mt-6">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <div>
                <Badge>Confirmado</Badge>
              </div>
              <h3>Corte de cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"></AvatarImage>
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
                <p className="text-sm">Mustachebarber</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>
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
