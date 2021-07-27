import Image from 'next/image';

export default function Avatar({ src, alt, text }) {
  return (
    <>
      <Image
        className='avatar'
        loader={() => src}
        src={src}
        alt={alt}
        width={49}
        height={49}
      />
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
