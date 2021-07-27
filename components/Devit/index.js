import Link from 'next/link';

import Avatar from '../Avatar';
import useTimeAgo from '../../hooks/useTimeAgo';

export default function Devit({
  id,
  avatar,
  userId,
  userName,
  content,
  createdAt,
  image,
}) {
  const timeago = useTimeAgo(createdAt);
  return (
    <>
      <article key={id}>
        <Avatar src={avatar} alt={userName} />
        <div>
          <header>
            <strong>{userName}</strong>
            <span>-</span>
            <Link href={`/status/${id}`}>
              <a>
                <time>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {image && <img src={image} />}
        </div>
      </article>
      <style jsx>{`
        div {
          margin-left: 8px;
        }
        div > p {
          margin-top: 5px;
        }
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 1px solid #eee;
        }
        header > span {
          margin-right: 5px;
          margin-left: 5px;
          font-weight: bold;
        }
        header > time {
          font-size: 14px;
          color: #555;
        }
        img {
          border-radius: 50px;
          height: auto;
          width: 100%;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}
