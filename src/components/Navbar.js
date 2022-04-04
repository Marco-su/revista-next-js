import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (term && !isOrdered) {
      router.push(`/search?q=${term.replace(/\s+/g, "%20")}`);
    } else if (term && isOrdered) {
      router.push(`/search?q=${term.replace(/\s+/g, "%20")}&orderby=relevance`);
    }
  };

  return (
    <nav className="sticky flex flex-align-center top-0 bg-white/90 z-[100] py-4 px-6 mb-2">
      <Link href="/">
        <a>
          <span className="cursive mr-6">Vida Sana</span>
        </a>
      </Link>

      <form className="flex" onSubmit={handleSubmit}>
        <div className="relative mr-4">
          <input
            className="py-1 px-3 rounded-full border-2 w-72"
            type="text"
            placeholder="Buscar"
            onChange={(e) => setTerm(e.target.value)}
          />

          <button
            className="absolute absolute-align-center right-0"
            type="submit"
          >
            <i className="fa-solid fa-magnifying-glass px-3 py-2 text-gray-300 hover:text-gray-400"></i>
          </button>
        </div>

        <div className="form-check">
          <input
            onChange={(e) => {
              if (e.target.checked) {
                setIsOrdered(true);
              } else {
                setIsOrdered(false);
              }
            }}
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-sky-700 checked:border-sky-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            id="flexCheckDefault"
          />
          <label
            className="form-check-label inline-block"
            htmlFor="flexCheckDefault"
          >
            Ordenar resultados por relevancia en próxima busqueda.
          </label>
        </div>
      </form>
    </nav>
  );
}
