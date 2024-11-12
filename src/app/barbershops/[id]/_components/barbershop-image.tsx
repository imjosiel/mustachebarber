"use client";

import MenuHeader from "@/app/_components/MenuHeader";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopImageProp {
  barbershop: Pick<Barbershop, "id" | "name" | "imageUrl">;
}

const BarbershopImage = ({ barbershop }: BarbershopImageProp) => {
  const router = useRouter();
  const handleBackClick = () => router.back();

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop?.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          size={"icon"}
          variant="secondary"
          className="absolute left-4 top-4"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          size={"icon"}
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuHeader />
        </Button>
      </div>
    </div>
  );
};

export default BarbershopImage;
