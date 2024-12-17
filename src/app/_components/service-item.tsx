"use client";
import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { format, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "./ui/calendar";
import { createBooking } from "../_actions/create-booking";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
//import { formatCurrency } from "../_helpers/price";
interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const TIME_LIST = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
  ];

  const BARBER_LIST = [
    "João Barbeiro",
    "Pedro Estilo",
    "Lucas Tesoura",
    "Rafael Corte",
    "Gabriel Linha",
    "André Fade",
    "Felipe Barbudo",
    "Matheus Estilo",
    "Carlos Clássico",
    "Victor Navalha",
    "Bruno Trim",
    "Henrique Barba",
    "Diego Moderno",
    "Leonardo Arte",
    "Thiago Barbeiro",
  ];

  const getTimeList = (bookings: Booking[]) => {
    return TIME_LIST.filter((time) => {
      const hour = Number(time.split(":")[0]);
      const minutes = Number(time.split(":")[1]);
      const hasBookingOnCurrentTime = bookings.some(
        (booking) =>
          booking.date.getHours() === hour &&
          booking.date.getMinutes() === minutes,
      );
      if (hasBookingOnCurrentTime) return false;

      return true;
    });
  };
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [selectedBarber, setSelectedBarber] = useState<string | undefined>(
    undefined,
  );
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);

  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return;
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectedDay, service.id]);
  const handleCheckLogin = () => {
    if (!data?.user)
      toast("Vamos logar", {
        description: "Você precisa estar logado para reservar",
        action: {
          label: "Logar",
          onClick: () => signIn(),
        },
      });
  };
  const handleBookingSheetOpenChange = () => {
    handleCheckLogin();
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setSelectedBarber(undefined);
    setBookingSheetIsOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };
  // const generateDayTimeList = () => {};
  const handleTimeSelect = (time: string) => {
    setSelectedTime((current) => (current === time ? undefined : time));
  };

  const handleBarberSelect = (barber: string) => {
    setSelectedBarber((current) => (current === barber ? undefined : barber));
  };

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime || !data?.user) return;
      const hour = Number(selectedTime?.split(":")[0]);
      const minute = Number(selectedTime?.split(":")[1]);
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      });
      await createBooking({
        serviceId: service.id,
        userId: data.user.id,
        date: newDate,
      });
      toast.success("Reserva criada com sucesso!");
      console.log("criou");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar reserva!");
      console.log("deu ruim");
    }
  };
  return (
    <>
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
                {formatCurrency(Number(service.price.toString()))}
              </p>
              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  onClick={() => setBookingSheetIsOpen(true)}
                  variant="secondary"
                  size="sm"
                >
                  Reservar
                </Button>
                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>
                  <Separator />
                  <div className="mx-5 border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      className="rounded-md border"
                      fromDate={new Date()}
                      disabled={{ dayOfWeek: [0] }}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>
                  {selectedDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                      {getTimeList(dayBookings).map((time) => (
                        <Button
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full"
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {selectedDay && selectedTime && (
                    <div className="p-5">
                      <h3 className="font-semibold">Escolha um barbeiro:</h3>
                      <div className="flex gap-3">
                        {BARBER_LIST.map((barber) => (
                          <Button
                            key={barber}
                            variant={
                              selectedBarber === barber ? "default" : "outline"
                            }
                            onClick={() => handleBarberSelect(barber)}
                          >
                            {barber}
                          </Button>
                        ))}
                        {/* {service.barberService.map(({ barber }) => (
                            <Button
                            key={barber.id}
                            variant={
                              selectedBarber === barber.id ? "default" : "outline"
                              }
                              onClick={() => handleBarberSelect(barber.id)}
                              >
                              {barber.name}
                              </Button>
                      ))} */}
                      </div>
                    </div>
                  )}

                  {selectedTime && selectedDay && selectedBarber && (
                    <div className="p-5">
                      <Card>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm">{service.name}</h2>
                            <h2 className="text-sm">
                              {formatCurrency(Number(service.price.toString()))}
                            </h2>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground">Data: </p>
                            <p className="text-sm">
                              {format(selectedDay, "d/MM/yyyy", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground">Hora: </p>
                            <p className="text-sm">{selectedTime}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground">Barbearia: </p>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground">
                              Tempo estimado:{" "}
                            </p>
                            <p>{service.minutes} minutos</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  <SheetFooter className="mt-5 px-5">
                    <SheetClose asChild>
                      <Button
                        onClick={handleCreateBooking}
                        disabled={
                          !selectedDay || !selectedTime || !selectedBarber
                        }
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

interface ServiceItemProps {
  service: BarbershopService;
}
export default ServiceItem;
