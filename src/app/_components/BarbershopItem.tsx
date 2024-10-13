import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";

interface barbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: barbershopItemProps) => {
  return (
    <Card className="min-w-[189px] rounded-2xl p-3">
      <CardContent className="p-1 pb-0">
        <div className="relative mb-5 h-[159px] w-full">
          <Image
            fill
            className="rounded-xl object-cover"
            alt={barbershop.name}
            src={barbershop.imageUrl}
          />

          <Badge className="absolute left-2 top-2" variant={"secondary"}>
            <StarIcon className="fill-primary text-primary" size={12} />
            <p className="text-xs">5,0</p>
          </Badge>
        </div>

        <div className="pb-3">
          <h2 className="truncate font-semibold">{barbershop.name}</h2>
          <p className="tex-sm truncate text-nowrap text-gray-400">
            {barbershop.address}
          </p>
          <Button variant={"secondary"} className="mt-3 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
/**<>
      <h1>{barbershop.name}</h1>
    </> */
