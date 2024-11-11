import { db } from "@/app/_lib/prisma";
import BarbershopImage from "./_components/barbershop-image";
import { notFound } from "next/navigation";
import BarbershopDetails from "./_components/barbershop-details";
import ServiceItem from "@/app/_components/service-item";

interface barbershopPageProps {
  params: {
    id: string;
  };
}

const barbershopPage = async ({ params }: barbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) return notFound();

  return (
    <div>
      <BarbershopImage barbershop={barbershop} />
      <BarbershopDetails barbershop={barbershop} />
      <div className="gap-2 p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default barbershopPage;