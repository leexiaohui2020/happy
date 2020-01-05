import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7001',
});

export async function getIndex() {
  const res = await instance.get('/');
  return res.data;
}

export async function getList({ link, page }) {
  const res = await instance.post('/list', { link, page });
  return res.data;
}

export async function getImage({ link, title }) {
  const res = await instance.post('/image', { link, title });
  return res.data;
}
