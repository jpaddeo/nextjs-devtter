import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';

import useUser from '../../../hooks/useUser';
import { addDevit, uploadImage } from '../../../firebase/client';

import { colors, fonts } from '../../../styles/themes';

const COMPOSE_STATES = {
  ERROR: -1,
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeDevit() {
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const user = useUser();
  const [devit, setDevit] = useState('');
  const router = useRouter();
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (task) {
      let onProgress = () => {};
      let onError = () => {};
      let onComplete = () => {
        console.log('onComplete');
        task.snapshot.ref.getDownloadURL().then(setImageURL);
      };
      task.on('state_changed', onProgress, onError, onComplete);
    }
  }, [task]);
  const handleChangeDevit = (ev) => {
    setDevit(ev.target.value);
  };
  const handleSubmitDevit = (ev) => {
    ev.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addDevit({
      avatar: user.avatar,
      content: devit,
      userId: user.uid,
      userName: user.username,
      image: imageURL,
    })
      .then(() => {
        setDevit('');
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };
  const handleDevitDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };
  const handleDevitDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };
  const handleDevitDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisabled =
    devit.length === 0 || status === COMPOSE_STATES.LOADING;
  return (
    <>
      <section className='form-container'>
        <section className='avatar-container'>
          <Avatar src={user?.avatar} />
        </section>
        <form onSubmit={handleSubmitDevit}>
          <textarea
            placeholder='¿Qué está pasando?'
            value={devit}
            onDragEnter={handleDevitDragEnter}
            onDragLeave={handleDevitDragLeave}
            onDrop={handleDevitDrop}
            onChange={handleChangeDevit}
          ></textarea>
          {imageURL && (
            <section className='remove-img'>
              <button onClick={() => setImageURL(null)}>X</button>
              <Image src={imageURL} alt={user?.username} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? '3px dashed ' + colors.primary
            : '3px solid transparent'};
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
        .remove-img {
          position: relative;
          align-items: center;
        }
        .remove-img > button {
          background: rgba(0, 0, 0, 0.3);
          color: white;
          border: 0;
          border-radius: 999px;
          width: 36px;
          height: 36px;
          top: 15px;
          position: absolute;
          right: 15px;
        }
        .remove-img > img {
          border-radius: 50px;
          width: 100%;
          height: auto;
        }
        .form-container {
          width: 78%;
          top: 0;
          padding: 10px;
          position: absolute;
          display: flex;
          align-items: flex-start;
        }
        .avatar-container {
          padding-top: 20px;
          margin-left: 10px;
        }
      `}</style>
    </>
  );
}
