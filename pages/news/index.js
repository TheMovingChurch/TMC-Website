import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getNewsAndMoreNews } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
// import RichTextResolver from 'storyblok-js-client/dist/richTextResolver'

export default function NewsListing({ news, preview }) {
  const router = useRouter()
  // Check if the route exists
  if (!router.isFallback && !news?.items) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <>
          {/* Render news cards */}
          {news.items.map((item) => (
            <>
              {router.isFallback ? (
                <PostTitle>Loading…</PostTitle>
              ) : (
                <>
                  <Head>
                    <title>
                      {item.content?.title || 'TMC'} | The Moving Church
                    </title>
                    <meta property="og:image" content={news?.content?.image} />
                  </Head>
                </>
              )}
              <Link
                href={`/${item.full_slug}`}
                key={item.uuid}
              >
                <article>
                  <div className="cursor-pointer p-8 max-w-[450px] min-w-[350px] border-solid border-2 rounded-md mx-auto">
                    <h1 className="font-bold text-xl mb-10">{item.content.title}</h1>
                    {item.content.image ? (
                      <div className="w-full mb-10">
                        <img src={item.content.image} />
                      </div>
                    ) : null}
                    <p>{item.content.intro}</p>
                    <br />
                    <p>{item.content.author}</p>
                  </div>
                  <SectionSeparator />
                </article>
              </Link>
            </>
          ))}
        </>
      </Container>
    </Layout>
  )
}

// Grab News Data from Storyblok
export async function getStaticProps({ params, preview = null }) {
  const data = await getNewsAndMoreNews(preview)

  return {
    props: {
      preview,
      news: {
        ...data.newsList,
      },
    },
  }
}
