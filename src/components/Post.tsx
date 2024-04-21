import { doc, getDoc } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import type { DocumentReference } from 'firebase/firestore/lite';
import type { FC } from 'react';

import db from '~/firebase';

interface IPostProps {
  body?: string
  date?: Date
  author?: DocumentReference
}

export const Post: FC<IPostProps> = ({ body, date, author }) => {
  const [authorData, setAuthorData] = useState<any>(null)
  useEffect(() => {
    console.log(date)
    const getAuthor = async () => {
      const authorRef = doc(db, author?.path!)
      const authorSnap = await getDoc(authorRef)
      setAuthorData(authorSnap.data())
    };

    try {
      getAuthor()
    } catch (e) {
      console.error(e)
    }
  }, [])
  return (
    <>
      {authorData ? (
        <div className="bg-postBg px-2 py-1 rounded-md flex flex-col gap-1">
          <p className="">{body}</p>
          <div className="flex justify-between">
            <span>{date?.toDateString()}</span>
            <span>{authorData?.username}</span>
          </div>
        </div>
      )
        : null}
    </>
  )
};
