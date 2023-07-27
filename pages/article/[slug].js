import { useState, useEffect } from "react";
import Layout from "/components/Layout";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";

export default function DetailPage({ slug }) {
  const [article, setArticle] = useState("");

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    await fetch(`/api/article?slug=${slug}`, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setArticle(json);
      });
  };

  return (
    <Layout title="Article" back={`/`}>
      <div className="py-10 px-4 bg-white">
        <div className="mb-5 rounded-lg overflow-hidden">
          {article.image ? (
            <div className="h-full w-full object-center object-cover">
              <Image
                src={`https://api.sehatcepat.com/images/article/${article.image}`}
                alt={article.title}
                height="130"
                width="200"
                layout="responsive"
              />
            </div>
          ) : (
            <Skeleton count={5} />
          )}
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="text-blue-400 text-md">
            {article.category || <Skeleton />}
          </div>
          <div className="text-gray-400 text-md">{article.CreatedAt}</div>
        </div>
        <h3 className="font-bold text-lg mb-3">
          {article.title || <Skeleton />}
        </h3>
        <div className="text-md text-gray-600 font-normal text-justify">
          {article.content ? (
            <div
              className="article"
              dangerouslySetInnerHTML={{
                __html: article != null && article.content,
              }}
            ></div>
          ) : (
            <Skeleton count={15} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;

  return {
    props: {
      slug,
    },
  };
}
