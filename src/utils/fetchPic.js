import axios from 'axios';

export default function fetchPic(querry, page, perPage) {
  const Q_KEY = '35657603-43cfc8be52addbea10916dda5';
  const BASE_URL = `https://pixabay.com/api/?q=${querry}&page=${page}&key=${Q_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
  return axios
    .get(BASE_URL)
    .then(({ data }) => {
      // console.log(data.hits);
      // console.log(data.total);
      return data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
