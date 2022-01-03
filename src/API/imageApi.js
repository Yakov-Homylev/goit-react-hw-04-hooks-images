const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "23823759-5b09d99573409f4e8325c89e8";

function fetchImage(querry, page) {
  return fetch(
    `${BASE_URL}?q=${querry}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Что-то пошло не так");
  });
}

export default fetchImage;
