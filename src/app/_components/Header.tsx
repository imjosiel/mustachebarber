import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { AppData } from "@/app/_components/config/appData";
import MenuHeader from "./MenuHeader";

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

          <MenuHeader />
        </CardContent>
      </Card>
    </>
  );
};

export default Header;
