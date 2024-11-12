import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
//import { formatCurrency } from "../_helpers/price";
interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative h-[110px] w-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/** Direita */}
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="font-bold text-primary">
              {formatCurrency(Number(service.price))}
            </p>
            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ServiceItemProps {
  service: BarbershopService;
}
export default ServiceItem;
