import { Barbershop } from "@prisma/client";
import { MapPinIcon, StarIcon } from "lucide-react";

interface BarbershopDetailsProp {
  barbershop: Pick<Barbershop, "id" | "name" | "address" | "description">;
}

const BarbershopDetails = ({ barbershop }: BarbershopDetailsProp) => {
  return (
    <>
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>

        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5.0</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-sm">{barbershop.description}</p>
      </div>
    </>
  );
};

export default BarbershopDetails;
