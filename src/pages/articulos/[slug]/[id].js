import Layout from "../../../components/Layout";
import { API_URL } from "../../../constants/api";
import Head from "next/head";

export default function Articulo({ data }) {
  let dateModified = null;

  console.log(data);

  if (data.modified) {
    dateModified = new Date(data.modified);
  }

  if (!data) {
    <Layout>
      <div>Error al cargar post</div>
    </Layout>;
  }

  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.excerpt ? data.excerpt : ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-8 md:mx-24 lg:mx-40 mb-12">
        <div className="mb-8">
          <h1 className="text-sky-800 font-bold text-2xl mb-1">{data.title}</h1>

          <div>
            {data.author && data.author.name && (
              <p>Escrito por {data.author.name}</p>
            )}

            {dateModified && (
              <p className="text-sm mb-2">
                {dateModified.getDate()}/{dateModified.getMonth() + 1}/
                {dateModified.getFullYear()}
              </p>
            )}
          </div>

          <div>
            {data.categories.map((el) => (
              <span
                key={el.id}
                className="px-2 rounded-full border border-green-600 text-green-600 text-sm mr-2"
              >
                {el.name}
              </span>
            ))}
          </div>
        </div>

        <div
          className="htmlBox"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${API_URL}/posts/${context.query.id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
