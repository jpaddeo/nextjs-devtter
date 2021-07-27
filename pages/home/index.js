import { useState, useEffect } from 'react';

import Link from 'next/link';

import Devit from '../../components/Devit';
import useUser from '../../hooks/useUser';
import Home from '../../components/Icons/Home';
import Search from '../../components/Icons/Search';
import Create from '../../components/Icons/Create';

import { colors } from '../../styles/themes';

import { listenLatestDevits } from '../../firebase/client';

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    let unsuscribe;
    if (user) {
      unsuscribe = listenLatestDevits(setTimeline);
    }
    return () => unsuscribe && unsuscribe();
  }, [user]);
  return (
    <>
      <div>
        <header>
          <h1>Inicio</h1>
        </header>
        <section>
          {timeline.map((devit) => {
            return (
              <Devit
                key={devit.id}
                id={devit.id}
                avatar={devit.avatar}
                userId={devit.userId}
                userName={devit.userName}
                content={devit.content}
                createdAt={devit.createdAt}
                image={devit.image}
              />
            );
          })}
        </section>
        <nav>
          <Link href='/'>
            <a>
              <Home width={32} height={32} storke='#00dbaf' />
            </a>
          </Link>
          <Link href='/search'>
            <a>
              <Search width={32} height={32} storke='#00dbaf' />
            </a>
          </Link>
          <Link href='/compose/devit'>
            <a>
              <Create width={32} height={32} storke='#00dbaf' />
            </a>
          </Link>
        </nav>
      </div>
      <style jsx>{`
        div {
          width: 100%;
        }
        header {
          position: sticky;
          width: 100%;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          height: 49px;
          border-bottom: 1px solid #ccc;
          algin-items: center;
          display: flex;
          top: 0;
        }
        h1 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        article {
          display: flex;
          padding: 10px 15px;
        }
        section {
          padding-top: 100px;
          flex: 1;
        }
        nav {
          bottom: 0;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
          display: flex;
        }
        nav a {
          align-items: center;
          height: 100%;
          display: flex;
          flex: 1 1 auto;
          justify-content: center;
        }
        nav a:hover {
          stroke: ${colors.secondary};
        }
      `}</style>
    </>
  );
}
