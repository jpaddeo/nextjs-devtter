import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '../components/Button';
import Avatar from '../components/Avatar';
import { colors } from '../styles/themes';
import { loginWithGitHub } from '../firebase/client';
import useUser, { USER_STATES } from '../hooks/useUser';

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace('/home');
  }, [user]);
  const handleLoginClick = () => {
    loginWithGitHub().catch((err) => console.log(err));
  };
  return (
    <>
      <Image src='/devtter.png' alt='logo_devtter' width='200' height='200' />
      <h1 className='title'>
        <a href='https://nextjs.org'>devtter</a>
      </h1>
      <h2 className='subtitle'>Talk about development with developers</h2>
      {user === USER_STATES.NOT_LOGGED ? (
        <Button onClick={handleLoginClick}>Login with GitHub</Button>
      ) : user === USER_STATES.NOT_KNOWN ? (
        <></>
      ) : (
        <>
          <Avatar src={user.avatar} alt={user.username} text={user.username} />
        </>
      )}
      <style jsx>{`
        .title a {
          color: ${colors.secondary};
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title {
          text-align: center;
        }

        .subtitle {
          color: ${colors.primary};
        }
      `}</style>
    </>
  );
}
