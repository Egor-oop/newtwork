import { useInitData } from '@tma.js/sdk-react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { useEffect, useState, type FC } from 'react'
import { useParams } from 'react-router-dom';
import { Page } from '~/components/Page/Page'
import db from '~/firebase';

export const ProfilePage: FC = () => {
  const { id } = useParams()
  const initData = useInitData()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    console.log('ID QUERY PARAM:', id)
    const user = initData?.user

    const createProfile = async () => {
      console.log('!!! CREATING NEW PROFILE !!!')
      const profilesRef = collection(db, 'profiles')
      console.log('REFERENCE', profilesRef)
      await setDoc(doc(profilesRef, user?.id.toString()), {
        firstName: user?.firstName,
        lastName: user?.lastName,
        username: user?.username,
      })
      console.log('GETTING NEW PROFILE')
      await getProfile()
    }
    const getProfile = async () => {
      const profileRef = doc(db, 'profiles', user?.id?.toString()!)
      const profileSnap = await getDoc(profileRef)
      if (profileSnap.data() === undefined) {
        console.log('IM ABOUT TO CREATE A NEW PROFILE')
        await createProfile()
      } else {
        console.log('SETTING PROFILE DATA', profileSnap.data())
        setProfile(profileSnap.data())
      }
    }

    if (id === undefined) {
      try {
        getProfile()
      } catch (e) {
        console.error(e)
      }
    }
  }, [id])

  return (
    <Page>
      {profile ?
        <>
          <div className='flex gap-3'>
            <p className='text-xl inline-flex'>{profile.username}</p>
          </div>
          <p className='text-tgHintColor'>{profile.firstName} {profile.lastName}</p>
        </>
        : 'Loading...'}
    </Page>
  )
};
