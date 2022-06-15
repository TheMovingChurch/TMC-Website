import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import {
  getAllNewsWithSlug,
  getNews,
} from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import RichTextResolver from 'storyblok-js-client/dist/richTextResolver'

export default function NewsSlug({ blok, story, news, preview }) {
  const router = useRouter()
  // Render 404 page if route does not exist
  if (!router.isFallback && !news?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <Layout preview={preview}>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {news.content?.title || 'TMC'} | The Moving Church
                </title>
                <meta property="og:image" content={news.content?.image} />
              </Head>
              <h2 className="text-center text-2xl font-bold mb-10">{news.content.title}</h2>
              <p className="text-center">{news.content?.intro}</p>
              <br />
              {news.content.image ? (
                <div className="w-[400px] m-auto">
                  <img
                    className="w-full"
                    src={news.content.image}
                  />
                </div>
              ): null}
              <br />
              <div dangerouslySetInnerHTML={{ __html: news?.html }}></div>
              <br />
              <div className="flex justify-between">
                <p>작성자: {news.content?.author}</p>
              </div>
            </article>
            <SectionSeparator />
          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps({
  params,
  preview = null,
}) {
  // console.log("params", params)
  // const data = await getNewsAndMoreNews(params.slug, preview)

  // Get news data
  const data = await getNews(params.slug[0], preview)

  // console.log('the news data:',data)

  /* /////////////////////////////////////////////////////////////////////////
   * Below codes are commented out for now                                   *
   * but are intended to be used for getting previous and next news data     *
  ////////////////////////////////////////////////////////////////////////// */
  let sbParams = {
    version: "draft",
    // resolve_relations: ["featured-posts.posts", "selected-posts.posts"],
    // language: locale,
  };

  // const prevNews = await getPrevNews(
  //   data['news']['first_published_at'],
  //   data['news']['full_slug']
  // )
  // if (prevNews.length > 0) prevNews[0]['indicator'] = 'Previous'
	// // Get the next News
	// const nextNews = await getNextNews(
  //   data['news']['first_published_at'],
  //   data['news']['full_slug']
  // )
  // if (nextNews.length > 0) nextNews[0]['indicator'] = 'Next'

  // const storyblokApi = getStoryblokApi();
  // let { data } = await storyblokApi.get(`cdn/stories/${params.slug[0]}`, sbParams);

  // console.log('data from api',data)

  ///////////////////////////////////////////
  /* Craft props data to include news data */
  ///////////////////////////////////////////
  return {
    props: {
      preview,
      news: {
        ...data.news,
        html: data.news?.content?.long_text
          ? new RichTextResolver().render(data.news.content.long_text) // Use RichTextResolver for long text (md file data resolver)
          : null,
      },
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths({ params }) {
  const allNews = await getAllNewsWithSlug()
  return {
    fallback: true,
    paths: allNews.map(news => `/news/${news.slug}`)
  }
}

////////////////////////////////////////////////////////////////////////
// Below code block is left for reference, but can be ignored for now //
////////////////////////////////////////////////////////////////////////

// export async function getStaticPaths() {
//   const storyblokApi = getStoryblokApi();
//   let { data } = await storyblokApi.get("cdn/links/");

//   let paths = [];
//   Object.keys(data.links).forEach((linkKey) => {
//     if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
//       return;
//     }

//     const slug = data.links[linkKey].slug;
//     let splittedSlug = slug.split("/");

//     paths.push({ params: { slug: splittedSlug } });
//   });

//   return {
//     paths: paths,
//     fallback: false,
//   };
// }