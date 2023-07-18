import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const getCategories = async () => {
  return axios
    .get(`${API_URL}/categories`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getArticles = async (id) => {
  return axios
    .get(`${API_URL}/category/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const searchArticles = async (title) => {
  return axios
    .get(`${API_URL}/search/${title}`)
    .then((res) => {
      console.log("data", res.data);
      return res;
    })
    .catch((err) => {
      return err;
    });
};
