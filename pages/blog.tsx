import { Text, renderBlock } from 'components/block'
import Nav from 'components/nav'
import { getBlocks, getDatabase } from 'lib/notion'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Fragment, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useIsSmall } from 'utils/hooks'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

export const databaseId = process.env.NOTION_DATABASE_ID

type Post = {
  id: string
  last_edited_time: string
  properties: {
    Name: {
      title: [
        {
          plain_text: string
        },
      ]
    }
  }
}

type Block = any

type BlogPostProps = {
  post: Post
  blocks: Block[]
}

const BlogPost = ({ post, blocks }: BlogPostProps) => {
  const date = new Date(post.last_edited_time).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
  const seoTitle = `${post.properties.Name.title[0].plain_text} | Trail Routes`
  return (
    <>
      <NextSeo
        title={seoTitle}
        openGraph={{
          url: `https://routes.samuekraft.com/?post=${post.id}`,
          title: seoTitle,
        }}
      />
      <article className="max-w-[700px] mx-auto my-0 py-14 px-5">
        <header className="mb-4">
          <h1 className="mb-2 text-3xl font-semibold">
            <Text text={post.properties.Name.title} />
          </h1>
          <p className="text-gray-500">{date}</p>
        </header>
        {blocks && (
          <section className="blogpost">
            {blocks.map(block => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
          </section>
        )}
      </article>
    </>
  )
}
type BlogProps = {
  posts: Post[]
  queryPostId: string
  queryPostBlocks: Block[]
}

const Blog = ({ posts, queryPostId, queryPostBlocks }: BlogProps) => {
  const router = useRouter()
  const currentPost = posts.find(post => post.id === queryPostId)
  const isSmall = useIsSmall()

  useEffect(() => {
    if (isSmall && !queryPostId && posts.length) {
      router.push({
        pathname: '/blog',
        query: { post: posts[0].id },
      })
    }
  }, [queryPostId, isSmall, posts.length])

  return (
    <main className="bg-[#E6E4E0] h-screen w-screen sm:overflow-hidden">
      <aside className="w-full sm:w-[430px] bg-white min-h-screen overflow-y-scroll overflow-x-hidden sm:absolute top-0 bottom-0 p-5">
        <div>
          <Nav />
          <section>
            <div className="sticky z-10 px-5 py-4 -mx-5 bg-blur -top-5">
              <h1 className="text-2xl font-bold text-forest-darkest">All posts</h1>
            </div>
            <ol>
              {posts.map(post => {
                const date = new Date(post.last_edited_time).toLocaleString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })
                return (
                  <Link href={{ query: { post: post.id } }} key={post.id}>
                    <a className="relative block p-4 mb-5 transition border border-gray-200 rounded hover:border-gray-300">
                      <p className="font-semibold text-xl mb-1.5 text-forest-darkest">
                        <Text text={post.properties.Name.title} />
                      </p>
                      <p className="text-gray-500">{date}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 w-[20px]"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </Link>
                )
              })}
            </ol>
          </section>
          <footer className="text-center text-gray-500">
            A project by{' '}
            <a href="https://twitter.com/samuelkraft" target="_blank" rel="noopener noreferrer" className="text-forest">
              @samuelkraft
            </a>
          </footer>
        </div>
      </aside>
      {currentPost && (
        <>
          {isSmall ? (
            <div className="block text-xl ml-[430px] h-screen relative bg-white border-l overflow-y-auto">
              <BlogPost post={currentPost} blocks={queryPostBlocks} />
            </div>
          ) : (
            <motion.div
              className="absolute top-0 z-50 w-full min-h-screen px-5 -ml-5 -mr-5 bg-white"
              initial={{ x: 430 }}
              animate={{ x: 0 }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            >
              <Link href="/blog">
                <a className="block px-3 pt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-[20px] mr-1 -mt-0.5 inline-block"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="inline-block font-semibold">Posts</span>
                </a>
              </Link>
              <BlogPost post={currentPost} blocks={queryPostBlocks} />
            </motion.div>
          )}
        </>
      )}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const database = await getDatabase(databaseId)
  const queryPostId = context.query.post
  let blocksWithChildren = []
  if (queryPostId) {
    const blocks = await getBlocks(queryPostId)
    const childBlocks = await Promise.all(
      blocks
        ?.filter(block => block.has_children)
        .map(async block => {
          return {
            id: block.id,
            children: await getBlocks(block.id),
          }
        }),
    )
    blocksWithChildren = blocks?.map(block => {
      // Add child blocks if the block should contain children but none exists
      if (block.has_children && !block[block.type].children) {
        block[block.type]['children'] = childBlocks.find(x => x.id === block.id)?.children // eslint-disable-line
      }
      return block
    })
  }

  return {
    props: {
      posts: database,
      queryPostId: queryPostId || null,
      queryPostBlocks: blocksWithChildren,
    },
  }
}

export default Blog
