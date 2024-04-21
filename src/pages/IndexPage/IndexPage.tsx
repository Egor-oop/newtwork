import { collection, getDocs } from 'firebase/firestore/lite'
import { type FC, useEffect, useState } from 'react'

import { Header } from '~/components/Header'
import { Page } from '~/components/Page/Page.tsx'
import { Post } from '~/components/Post'
import db from '~/firebase'

import './IndexPage.css'

export const IndexPage: FC = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      const postsCol = collection(db, 'posts')
      const postSnapshot = await getDocs(postsCol)
      const postList = postSnapshot.docs.map((doc) => doc.data())
      setPosts(postList)
      setLoading(false)
    };
    try {
      getPosts()
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Page>
      <Header />
      {!loading ?
      posts.map((post) => (
        <Post
          body={post?.body}
          date={post?.createdAt?.toDate()}
          author={post?.author}
        />
      ))
    : 'SPINNER IS ALSO LOADING...'}
    </Page>
  );
}
