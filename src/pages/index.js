import Head from "next/head";
import { API_URL } from "../constants/api";
import Card from "../components/Card";
import Layout from "../components/Layout";

export default function Home({ data }) {
  if (!data) {
    return (
      <Layout>
        <h1 className="text-center mb-4 text-2xl font-bold">
          Ha ocurrido un error al cargar el contenido por favor recarga la
          página.
        </h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Vida Sana</title>
        <meta
          name="description"
          content="Consejos de salud y buenos habitos que mejorarán tu vida."
        />
        <meta property="og:title" content="Vida sana" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-10 md:px-24">
        {/* DESTACADOS */}
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 mb-8">
          {data.highlights.map((el) => (
            <Card
              type="category"
              key={el.id}
              title={el.name}
              imgSrc={el.highlight_media && el.highlight_media}
              imgAlt={el.name}
              linkHref={`/search?q=${el.name.replace(/\s+/g, "%20")}`}
            />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row mb-8">
          {/* POSTS POPULARES */}
          <div>
            <h2 className="font-bold text-sky-800 text-2xl mb-3">
              Articulos Populares
            </h2>

            {data.popular_posts.map((el) => (
              <Card
                type="horizontal"
                key={el.id}
                title={el.title}
                imgSrc={el.featured_media && el.featured_media.thumbnail}
                imgAlt={el.title}
                description={
                  el.headline || el.excerpt.replace("&hellip;", "...")
                }
                categories={el.categories}
                linkHref={el.permalink + String(el.id)}
              />
            ))}
          </div>

          {/* ÚLTIMOS POSTS */}
          <div>
            <h2 className="font-bold text-sky-800 text-2xl mb-3">
              Lo más nuevo
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {data.latest_posts.map((el) => (
                <Card
                  type="thumbnail"
                  key={el.id}
                  title={el.title}
                  imgSrc={el.featured_media && el.featured_media.thumbnail}
                  imgAlt={el.title}
                  categories={el.categories}
                  linkHref={el.permalink + String(el.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* POSTS ADICIONALES */}
        <div>
          <h2 className="font-bold text-sky-800 text-2xl mb-3">
            Tambien te puede interesar
          </h2>

          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-5">
            {data.read_more.map((el) => (
              <Card
                type="vertical"
                key={el.id}
                title={el.title}
                imgSrc={el.featured_media.thumbnail}
                imgAlt={el.title}
                description={
                  el.headline || el.excerpt.replace("&hellip;", "...")
                }
                categories={el.categories}
                linkHref={el.permalink + String(el.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/home`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
