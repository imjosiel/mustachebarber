import BarbershopItem from "@/app/_components/BarbershopItem";
import { db } from "@/app/_lib/prisma";
import Header from "../_components/Header";
import Search from "../_components/Search";

interface SearchBarberProps {
  searchParams: {
    q?: string;
  };
}
const SearchBarber = async ({ searchParams }: SearchBarberProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.q,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />
      <Search className="my-0" />
      <div className="mx-5">
        <h2 className="mb-3 mt-2 text-xs font-bold uppercase text-gray-400">
          Resultados da busca para &quot;{searchParams.q}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchBarber;
