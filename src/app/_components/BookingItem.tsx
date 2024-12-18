import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
interface BookingItemProps {
  //lembrete: como incluir o service dentro de booking
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}
const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date);
  return (
    <>
      <Card className="mt-6 min-w-full">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <div>
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "outline"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
            </div>
            <h3>{booking.service.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={booking.service.barbershop.imageUrl}
                ></AvatarImage>
                <AvatarFallback>
                  {booking.service.barbershop.name.split(" ")[0][0]}
                  {booking.service.barbershop.name.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm">{booking.service.barbershop.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm capitalize">
              {format(booking.date, "MMMM", {
                locale: ptBR,
              })}
            </p>
            <p className="text-2xl">
              {format(booking.date, "dd", {
                locale: ptBR,
              })}
            </p>
            <p className="text-sm">
              {format(booking.date, "HH:mm", {
                locale: ptBR,
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingItem;
