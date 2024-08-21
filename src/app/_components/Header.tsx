import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { AppData } from "@/app/_components/config/appData";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Image
            alt={AppData.app.name}
            src={AppData.app.logo}
            height={18}
            width={120}
          />

          <Button size={"icon"} variant={"outline"}>
            <MenuIcon />
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default Header;
