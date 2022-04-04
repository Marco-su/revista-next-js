import Link from "next/link";

export default function Card({
  type,
  title,
  description,
  categories = [],
  imgSrc = "/default_post.jpg",
  imgAlt,
  linkHref,
}) {
  if (description) {
    description = description.slice(0, 100) + "...";
  }

  const tailwindCss = {
    category: {
      main_container: "relative overflow-hidden rounded",
      text_section: "static",
      title_container: "static",
      image: "w-full h-full object-cover",
      title:
        "absolute bottom-0 left-0 text-center w-full py-2 bg-green-300/50 text-white font-bold",
    },

    horizontal: {
      main_container: "flex mb-4",
      text_section: "py-2 px-4",
      title_container: "mb-3",
      image: "w-40 h-40 object-cover",
      title: "text-sky-800 font-bold text-xl mb-1",
    },

    thumbnail: {
      main_container: "flex w-full sm:w-80 mb-3",
      text_section: "py-1 px-2",
      title_container: "static",
      image: "w-16 h-16 object-cover",
      title: "text-sm font-bold text-sky-800",
    },

    vertical: {
      main_container: "overflow-hidden rounded",
      text_section: "static",
      title_container: "mb-3",
      image: "w-full mb-3",
      title: "font-bold mb-2 text-lg text-sky-800",
    },
  };

  function CardContent() {
    return (
      <div className={tailwindCss[type].main_container}>
        <img className={tailwindCss[type].image} src={imgSrc} alt={imgAlt} />

        <div className={tailwindCss[type].text_section}>
          <div className={tailwindCss[type].title_container}>
            <h3 className={tailwindCss[type].title}>{title}</h3>

            {categories.length > 0 && (
              <div>
                {categories.map((el) => (
                  <span
                    key={el.id}
                    className="px-2 rounded-full border border-green-600 text-green-600 text-sm mr-2"
                  >
                    {el.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {description && <p>{description}</p>}
        </div>
      </div>
    );
  }

  function LinkSimple({ children }) {
    return (
      <Link href={linkHref}>
        <a>{children}</a>
      </Link>
    );
  }

  function LinkParams({ children }) {
    return (
      <Link href="/articulos/[slug]/[id]" as={`/articulos${linkHref}`}>
        <a>{children}</a>
      </Link>
    );
  }

  return (
    <>
      {type === "category" && (
        <LinkSimple>
          <CardContent />
        </LinkSimple>
      )}

      {type != "category" && (
        <LinkParams>
          <CardContent />
        </LinkParams>
      )}
    </>
  );
}
