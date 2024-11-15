"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "../_lib/utils";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, { message: "Se você nada procura, nada encontrará" }),
});

interface SearchProp {
  className?: string;
}
const Search = ({ className }: SearchProp) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: "",
    },
  });

  //const [search, setSearch] = useState("");
  const router = useRouter();

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     router.push(`/search?q=${search}`);
  //   };
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/search?q=${data.q}`);
  };

  return (
    <>
      {/* <form
        onSubmit={handleSubmit}
        className={cn("mt-[24px] flex gap-1 p-5", className)}
      >
        <Input
          placeholder="O que deseja?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSubmit} type="submit">
          <SearchIcon />
        </Button>
      </form> */}
      {/** */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={cn("mt-[24px] flex gap-1 p-5", className)}
        >
          <FormField
            control={form.control}
            name="q"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="O que deseja?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <SearchIcon />
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Search;
