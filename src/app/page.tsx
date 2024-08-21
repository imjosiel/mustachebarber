import { SearchIcon } from "lucide-react";
import Header from "./_components/Header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { AppData } from "./_components/config/appData";

export default function Home() {
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

      <div className="relative h-[200px] w-full">
        <Image
          src={AppData.ads.imgUrl}
          alt={AppData.ads.description}
          fill
          className="rounded-xl object-contain"
        />
      </div>
    </>
  );
}
