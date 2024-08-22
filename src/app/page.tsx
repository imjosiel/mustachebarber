import { SearchIcon } from "lucide-react";
import Header from "./_components/Header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { AppData } from "./_components/config/appData";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./_components/ui/avatar";

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
      <div className="p-5">
        <Card className="mt-6">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge>Confirmado</Badge>
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
    </>
  );
}
