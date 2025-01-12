import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import OurTake from '../../components/slugView/our-take'
import PostHeader from '../../components/slugView/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import PostTitle from '../../components/slugView/post-title'
import TokenStrength from '../../components/slugView/token-strength'
import Resources from '../../components/slugView/resources'
import TimeLine from '../../components/slugView/timeline'
import { Link } from 'react-scroll'
import FeedbackPopup from '../../components/feedback-popup'
import { useState, useCallback } from 'react'
import Login from '../../components/login'
import EditPiece from '../../components/edit-piece'
import prisma from '../../lib/prisma'
import Router from 'next/router'
import PostMeta from '../../components/postMeta'
import dynamic from 'next/dynamic'
import { useAuth } from '@clerk/clerk-react/dist/hooks/useAuth'
import { useUser } from '@clerk/clerk-react/dist/hooks/useUser'
import Calculation from '../../components/slugView/calculation'
import { clerkClient } from '@clerk/nextjs/server'
import { clerkConvertJSON, getTotalStrength, postStatus } from '../../lib/helper'

export default function Post({ post, morePosts, author }) {
  const PostBody = dynamic(
    () => import('../../components/slugView/post-body'),
    {
      loading: () => <p>Loading</p>,
    }
  )
  const AuthorCard = dynamic(() => import('../../components/authorCard'), {
    loading: () => <p>Loading</p>,
  })
  const ProtocolCard = dynamic(() => import('../../components/protocolCard'), {
    loading: () => <p>Loading</p>,
  })
  const ProtocolStats = dynamic(
    () => import('../../components/slugView/protocol-stats'),
    { loading: () => <p>Loading</p> }
  )
  const Diagram = dynamic(() => import('../../components/slugView/diagram'), {
    loading: () => <p>Loading</p>,
  })

  const [isSubmitting, setSubmitting] = useState(false)
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  // console.log("🚀 ~ file: [slug].tsx:51 ~ Post ~ user", user)

  var userIsAuthor = false
  if (user?.id === post?.authorClerkId) {
    userIsAuthor = true
  }
  // console.log("🚀 ~ file: [slug].tsx:54 ~ Post ~ user?.id", user?.id)

  const contributor = user?.publicMetadata?.contributor || false

  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpen = useCallback(
    (event) => {
      setIsOpen(false)
    },
    [isOpen]
  )

  const router = useRouter()

  function editPost() {
    setSubmitting(true)
    Router.push('/editPost/[id]', `/editPost/${post.id}`)
    setSubmitting(false)
  }

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        {/* <Header /> */}
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mt-10">
              <PostMeta title={post.title} content={post.shortDescription} />

              <PostHeader
                title={post.title}
                slug={post.slug}
                updatedAt={post.publishedAt}
                shortDescription={post.shortDescription}
                cats={post.categories}
                tags={post.tags}
                tokenStrength={getTotalStrength(post?._avg)}
                ticker={post.ticker}
                imageUrl={post.mainImageUrl}
                isOfficial={post.isOfficial}
              />
              <button
                onClick={editPost}
                disabled={
                  !(
                    (
                      userIsAuthor ||
                      contributor
                    )
                  ) ||
                  !isSignedIn ||
                  isSubmitting
                }
                className="mb-3 w-28 rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 disabled:opacity-40"
              >
                Edit
              </button>
              <FeedbackPopup isOpen={isOpen} handleIsOpen={handleIsOpen} />
              <div className={`top-3 w-full ${isOpen ? '' : 'sticky z-30'}`}>
                <div className="overflow-x-auto border-b-2 border-black bg-white md:px-10">
                  <ul className="flex">
                    <li>
                      <Link
                        className="flex items-center p-4 text-lg font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                        activeClass="active"
                        to="tokenStrength"
                        spy={true}
                        smooth={true}
                      >
                        Overview
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center p-4 text-lg font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                        to="stats"
                        spy={true}
                        smooth={true}
                      >
                        Stats
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center p-4 text-lg font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                        to="ourTake"
                        spy={true}
                        smooth={true}
                      >
                        Our Take
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center p-4 text-lg font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                        to="timeline"
                        spy={true}
                        smooth={true}
                      >
                        Timeline
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center p-4 text-lg font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                        to="deepDive"
                        spy={true}
                        smooth={true}
                      >
                        Deep Dive
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center p-4 text-lg font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                        to="calculation"
                        spy={true}
                        smooth={true}
                      >
                        Allocation and Emissions
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center p-4 text-lg font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                        to="diagram"
                        spy={true}
                        smooth={true}
                      >
                        Diagram
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center p-4 text-lg font-bold text-gray-900 no-underline hover:rounded hover:bg-gray-700 hover:text-white"
                        to="Resources"
                        spy={true}
                        smooth={true}
                      >
                        Resources
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <main className="m-auto flex max-w-4xl flex-col">
                {/* section header */}
                <div id="tokenStrength"></div>
                <TokenStrength post={post} contributor={contributor} />
                <div id="stats"></div>
                <ProtocolStats protocol={post.slug} />

                {!isSignedIn && (
                  <div className="mt-10">
                    <Login message="You need to sign in to see more - it's free" />
                  </div>
                )}
                <div className={`${isSignedIn ? '' : 'blur-sm'}`}>
                  <div id="ourTake"></div>
                  <OurTake content={post} />
                  <div id="timeline"></div>
                  <TimeLine items={post.protocolTimeLine} />
                  <div id="deepDive"></div>
                  <PostBody content={post.breakdown} />
                  <div id="calculation"></div>
                  <Calculation calculation={post.calculation} />
                  <div id="diagram"></div>
                  <Diagram diagram={post.diagramUrl} />
                  <div id="Resources"></div>
                  <Resources resources={post.ProtocolResources} />
                  <div className="mt-10">
                    <EditPiece />
                  </div>
                </div>
              </main>
              <h1 className="section-head mt-10 mb-4 text-xl font-bold text-black md:mt-20 md:text-2xl lg:text-3xl">
                Author.
              </h1>

              {!post.isOfficial ? <AuthorCard author={author} /> : <ProtocolCard author={author} post={post} >hi</ProtocolCard>}
            </article>
            <SectionSeparator />
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const txCalls = []
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      categories: {},
      tags: {},
      ProtocolResources: {},
      protocolTimeLine: {
        orderBy: {
          date: 'asc',
        },
      },
      author: {},
      calculation: {
        include: {
          CalculationRows: {},
        },
      },
    },
  })

  txCalls.push(
    prisma.post.count({
      where: {
        authorClerkId: post?.authorClerkId,
        status: postStatus.published,
      },
    })
  )

  txCalls.push(
    prisma.$queryRaw`select count(A) as count,A as cat,p.authorClerkId from _CategoryToPost join Post as p on p.id = B WHERE p.authorClerkId = ${post?.authorClerkId} AND p.status = ${postStatus.published} GROUP BY A, p.authorClerkId`
  )

  txCalls.push(
    prisma.userStrengthRating.aggregate({
      _avg: {
        tokenUtilityStrength: true,
        businessModelStrength: true,
        valueCreationStrength: true,
        valueCaptureStrength: true,
        demandDriversStrength: true,
      },
      where: {
        postId: post.id,
      }
    })
  )

  const response = await prisma.$transaction(txCalls)

  // console.log("🚀 ~ file: [slug].tsx:311 ~ getStaticProps ~ response[0]", response[2])

  let clerkUser = post?.authorClerkId
    ? await clerkClient.users.getUser(post?.authorClerkId)
    : {}

  clerkUser = clerkConvertJSON(clerkUser)

  clerkUser.articleCount = response[0] || 0
  
  clerkUser.cat = response[1] || null

  return {
    props: {
      post: Object.assign(post, response[2]) || null,
      author: clerkUser || null,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const allPosts = await prisma.post.findMany({
    select: {
      slug: true,      
    },
    // where: {
    //   status: postStatus.published
    // }
  })

  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
    // revalidate: 10, // In seconds
  }
}
