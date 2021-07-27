import Devit from '../../components/Devit';

export default function DevitPage(props) {
  return (
    <>
      <Devit {...props}></Devit>
      <style jsx>{``}</style>
    </>
  );
}

/*
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'Rsgm5xaD1EQU7TVXvaRi' } }],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context; // params, req, res, query
  const { id } = params;

  const apiRes = await fetch(`http://localhost:3000/api/devits/${id}`);
  if (apiRes.ok) {
    const props = await apiRes.json();
    return { props: props };
  }
}
*/
export async function getServerSideProps(context) {
  const { params, res } = context; // params, req, res, query
  const { id } = params;

  const apiRes = await fetch(`http://localhost:3000/api/devits/${id}`);
  if (apiRes.ok) {
    const props = await apiRes.json();
    return { props: props };
  }
  if (res) {
    // pregunto xq sólo existe en server side (para evitar errores en client)
    res.writeHead(301, { Location: '/home' }).end();
  }
}

/*
DevitPage.getInitialProps = (context) => {
  const { query, res } = context;
  const { id } = query;

  console.log('getInitialProps', id);
  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiRes) => {
    if (apiRes.ok) return apiRes.json();
    if (res) {
      // pregunto xq sólo existe en server side (para evitar errores en client)
      res.writeHead(301, { Location: '/home' }).end();
    }
  });
};
*/
