import Head from 'next/head';

export default function AppLayout({ children }) {
  return (
    <div className='container'>
      <Head>
        <title>devtter</title>
        <meta
          name='description'
          content='Devtter is a twitter similar platform'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='main'>{children}</main>
    </div>
  );
}
