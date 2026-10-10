import Book from "@/components/book/Book";
import { buildBook } from "@/components/book/pages";

export default function Home() {
  const { pages, chapters } = buildBook();
  return (
    <main id="main">
      <h1 className="sr-only">Mit Ramavat — AI / ML Engineer portfolio</h1>
      <Book pages={pages} chapters={chapters} />
    </main>
  );
}
