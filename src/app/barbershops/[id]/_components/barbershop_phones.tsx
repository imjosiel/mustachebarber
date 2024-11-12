"use client";
import { Button } from "@/app/_components/ui/button";
import { SmartphoneIcon } from "lucide-react";
import { toast } from "sonner";
interface barbershopPhones {
  phone: string;
}
const BarbershopPhones = ({ phone }: barbershopPhones) => {
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Telefone copiado com sucesso!");
  };
  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      <Button variant={"outline"} onClick={() => handleCopyPhone(phone)}>
        Copiar
      </Button>
    </div>
  );
};

export default BarbershopPhones;
