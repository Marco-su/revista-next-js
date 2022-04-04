import Head from "next/head";
import { API_URL } from "../constants/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

export default function Articulos({ data, page, query }) {
  return (
    <Layout>
      <Head>
        <title>{query.replace("%20", " ")}</title>
        <meta
          name="description"
          content={`Resultados de busqueda para: ${query.replace("%20", " ")}.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!data && (
        <h1 className="text-center mb-4 text-2xl font-bold">
          Error al cargar resultados.
        </h1>
      )}

      {data.data.length === 0 && (
        <h1 className="text-center mb-4 text-2xl font-bold">
          No se encontraron resultados para: {query.replace("%20", " ")}
        </h1>
      )}

      {data.data.length > 0 && (
        <div className="px-24 mb-5">
          <h1 className="text-center mb-4 text-2xl font-bold">
            {data.size} resultados para: {query.replace("%20", " ")}
          </h1>

          <div className="grid gap-6 md:px-24grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {data.data.map((el) => (
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

          <Pagination pages={data.pages} current={page} term={query} />
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let page = context.query.page;
  let q = context.query.q;

  if (!context.query.page) {
    page = context.query.page = 1;
  }

  if (!context.query.q) {
    q = "";
  }

  let res = null;

  if (!context.query.orderedBy) {
    res = await fetch(
      `${API_URL}/posts?search=${context.query.q}&page=${context.query.page}`
    );
  } else {
    res = await fetch(
      `${API_URL}/posts?search=${context.query.q}&page=${context.query.page}&orderby=relevance`
    );
  }

  const data = await res.json();

  return {
    props: {
      data,
      page,
      query: q,
    },
  };
}
