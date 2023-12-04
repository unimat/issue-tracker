import { Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";

export default function Home({ searchParams }: {searchParams: { page: string}}) {
  return (
    <main className="overflow-hidden">
      <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />
    </main>
  )
}
