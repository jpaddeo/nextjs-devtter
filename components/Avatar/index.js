export default function Avatar({ src, alt, text }) {
  return (
    <>
      <img className='avatar' src={src} alt={alt} />
      {text && <strong>{text}</strong>}
      <style jsx>{`
        .avatar {
          border-radius: 9999px;
          height: 49px;
          width: 49px;
        }
      `}</style>
    </>
  );
}
