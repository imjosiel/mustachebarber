"use client";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  // SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/quickSearchQueries";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
const MenuHeader = () => {
  const { data } = useSession();
  const handleSignOutClick = () => signOut();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>

          {data?.user ? (
            <>
              <div className="flex justify-between border-b py-5">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="px-1">
                    <h3 className="text-left font-semibold">
                      {data?.user?.name}
                    </h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-b border-solid p-5">
                <SheetClose asChild>
                  <Button
                    className="justify-start gap-1"
                    variant={"ghost"}
                    asChild
                  >
                    <Link href={"/"}>
                      <HomeIcon size={18} /> Início
                    </Link>
                  </Button>
                </SheetClose>
                <Button className="justify-start gap-2" variant={"ghost"}>
                  <CalendarIcon /> Agendamentos
                </Button>
              </div>

              <div className="flex flex-col gap-4 border-b border-solid p-5">
                {quickSearchOptions.map((option) => (
                  <Button
                    key={option.title}
                    className="justify-start gap-1"
                    variant={"ghost"}
                  >
                    <Image
                      src={option.imageUrl}
                      alt={option.title}
                      height={18}
                      width={18}
                      className="fill-white"
                    />
                    {option.title}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-b border-solid p-5">
                <Button
                  variant={"ghost"}
                  className="justify-start"
                  onClick={handleSignOutClick}
                >
                  <LogOutIcon /> Sair da conta
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <SheetDescription>Olá, faça seu login</SheetDescription>
              <Button onClick={() => signIn()}>
                <LogInIcon className="px-1" /> Entrar
              </Button>
            </div>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MenuHeader;
