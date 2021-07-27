import { firestore } from '../../../firebase/admin';

const devitShow = (req, res) => {
  const { query } = req;
  const { id } = query;

  firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;
      res.json({
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      });
    })
    .catch(() => {
      res.status(404).end();
    });
};
export default devitShow;
