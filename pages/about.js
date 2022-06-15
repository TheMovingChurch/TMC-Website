import Head from "next/head";
import Layout from "@/components/layout";
import Container from "@/components/container";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>
          About Us | The Moving Church
        </title>
      </Head>
      <Container>
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
            About Page.
          </h1>
        </section>
      </Container>
    </Layout>
  )
}