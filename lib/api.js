async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: process.env.STORYBLOK_API_KEY,
      Version: preview ? 'draft' : 'published',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

// Grabs all news slug data
export async function getAllNewsWithSlug() {
  const data = await fetchAPI(`
    {
      NewsItems {
        items {
          slug
        }
      }
    }
  `)
  return data?.NewsItems.items
}

// Created for home page. News data are paginated in 3
export async function getAllNewsForHome(preview) {
  const data = await fetchAPI(
    `
    query NewsPreviewForHome {
      NewsItems(per_page: 5, sort_by: "first_published_at:desc") {
        items {
          full_slug
          created_at
          content {
            author
            image
            intro
            title
            updated_at
          }
          name
          slug
          uuid
        }
      }
    }
  `,
    { preview }
  )
  return data?.NewsItems.items
}

// Get individual news data. The passed in id param is full slug
export async function getNews(slug, preview) {
  const data = await fetchAPI(
    `
    query News($slug: ID!) {
      NewsItem(id: $slug) {
        slug
        full_slug
        created_at
        published_at
        first_published_at
        id
        content {
          title
          image
          intro
          long_text
          author
        }
      }
    }
    `,
    {
      variables: {
        slug: `news/${slug}`,
      },
    }
  )
  return {
    news: data?.NewsItem,
  }
}

export async function getPrevNews(first_published_at, excluded_slug) {
  const data = await fetchAPI(
    `
      query PrevNews ($first_published_at:String!, $excluded_slug: String!) {
        NewsItems(
          per_page: 1,
          excluding_slugs: $excluded_slug,
          sort_by: "first_published_at:desc",
          first_published_at_lt: $first_published_at, 
        ) {
          items{
            first_published_at
            full_slug
            name
            slug
          }
        }
      }
    `,
    {
      variables: {
        first_published_at,
        excluded_slug,
      },
    }
  )
  return data?.NewsItems.items
}

export async function getNextNews(first_published_at, excluded_slug) {
  const data = await fetchAPI(
    `
      query NextNews ($first_published_at:String!, $excluded_slug:String!) {
        NewsItems(
          per_page: 1,
          excluding_slugs: $excluded_slug,
          sort_by: "first_published_at:asc",
          first_published_at_gt: $first_published_at, 
        ) {
          items{
            first_published_at
            full_slug
            name
            slug
          }
        }
      }
    `,
    {
      variables: {
        first_published_at,
        excluded_slug,
      },
    }
  )
  return data?.NewsItems.items
}

// Get all news data for News Listing page
// Paginated by 5 data
export async function getNewsAndMoreNews(preview) {
  const data = await fetchAPI(`
    query MoreNews {
      NewsItems(per_page: 5) {
        items {
          full_slug
          created_at
          content {
            author
            image
            intro
            title
            updated_at
          }
          name
          slug
          uuid
        }
      }
    }
  `,
    {
      preview,
      headers: {
        'Content-Type': 'application/json',
        Token: process.env.STORYBLOK_API_KEY,
        Version: preview ? 'draft' : 'published',
      },
    },
  );

  return {
    newsList: data?.NewsItems,
  }
}
