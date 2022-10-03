import axios from "axios";
export const SET_LOADING = "auth/SET_LOADING";
export const SET_TOKEN = "auth/SET_TOKEN";
export const SET_ERROR = "auth/SET_ERROR";

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});
export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});
export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const setLocalStorage = (key, value) => localStorage.setItem(key, value);
export const getLocalStorage = (key) => localStorage.getItem(key);

export const fetchRegister = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      `https://test-deploy123122.herokuapp.com/v1/auth/register`,
      payload
    );
    const { status, data } = response;
    dispatch(setLoading(false));
    if (status === 201) {
      window.open("http://localhost:3000/dashboard/", "_self");
      dispatch(setToken(data.tokens.access.token));
      setLocalStorage("userLogin", JSON.stringify(data.tokens.access.token));
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.error("ERR ", error);
  }
};

export const fetchLogin = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(
      `https://test-deploy123122.herokuapp.com/v1/auth/login`,
      payload
    );
    const { status, data } = response;
    dispatch(setLoading(false));
    if (status !== 200) {
    } else {
      window.open("http://localhost:3000/dashboard/", "_self");
      dispatch(setToken(data.tokens.access.token));
      setLocalStorage("userLogin", JSON.stringify(data.tokens.access.token));
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.error("ERR ", error);
  }
};
export const fetchLogout = (payload) => async (dispatch) => {
  try {
    window.open("http://localhost:3000/", "_self");
    localStorage.removeItem("userLogin");
  } catch (error) {
    dispatch(setLoading(false));
    console.error("ERR ", error);
  }
};
export const fetchScore = (payload) => async (dispatch) => {
  try {
    const token = getLocalStorage("userLogin");
    dispatch(setLoading(true));

    const response = await axios({
      method: "get",
      url: "https://test-deploy123122.herokuapp.com/v1/scores",
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    const { status, data } = response;
    dispatch(setLoading(false));
    if (status === 200) {
      console.warn(data);
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.error("ERR ", error);
  }
};
