import AppLayout from '../components/AppLayout';
import { fonts, colors } from '../styles/themes';

function Devtter({ Component, pageProps }) {
  return (
    <>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: ${fonts.base};
          background-image: radial-gradient(
              ${colors.primary} 1px,
              transparent 1px
            ),
            radial-gradient(${colors.primary} 1px, transparent 1px);
          background-position: 0 0, 25px 25px;
          background-size: 50px 50px;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 80%;
          background-color: white;
        }
        textarea,
        input {
          font-family: ${fonts.base};
        }
      `}</style>
    </>
  );
}

export default Devtter;
