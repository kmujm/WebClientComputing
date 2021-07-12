import axios from 'axios';

const ID_KEY = 'MPF85hV_M_MgoJFe46Ms';
const SECRET_KEY = 'uSvgQms2A1';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'X-Naver-Client-Id': ID_KEY,
    'X-Naver-Client-Secret': SECRET_KEY,
  }
});

export const naverMoviesApi = {
  search: word => api.get('/v1/search/movie.json', {
    params: {
      query: word,
      display: 10
    }
  })
};
