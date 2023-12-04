import { Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Pagination itemCount={100} pageSize={10} currentPage={2} />
    </main>
  )
}
