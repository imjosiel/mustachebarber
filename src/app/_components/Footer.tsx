import Link from "next/link";
import { Card, CardContent } from "./ui/card";

const Footer = () => {
  return (
    <Card>
      <CardContent>
        <h3 className="px-5 py-6 text-xs text-gray-400">
          © 2024 Copyright Overlinecast. Created by{" "}
          <Link href={"https://josielcardoso.com.br"}>
            <span className="font-bold">Josiel Cardoso</span>
          </Link>
        </h3>
      </CardContent>
    </Card>
  );
};

export default Footer;
