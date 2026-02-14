import { BASE_URL } from "./configs.js";

export const initialParams = {
  q: "harry",
  limit: 10,
};

//initial global state
export const initialState = {
  loading: false,
  error: null,
  data: null,
};

export const fetchBooks = async (params = {}) => {
  const state = { ...initialState, loading: true };

  const parameters = new URLSearchParams({ ...initialParams, ...params });
  const url = `${BASE_URL}/search.json?${parameters.toString()}`;
  console.log(url); //check

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(res.status, res.statusMessage); //
      throw new Error(
        `Fetch is not successful, HTTP Status: ${res.status}, Message: ${res.statusMessage}`
      );
    }
    state.data = await res.json();
    return state;
  } catch (error) {
    if (error instanceof Error) {
      state.error = { name: `${error.name}`, message: `${error.message}` };
      console.log("Error: ", error); //
    } else {
      state.error = { name: "Unknown", message: "Unknown error" };
      console.log("Error: ", error); //
    }
    return state;
  } finally {
    state.loading = false;
  }
};
