import { BASE_URL } from "./configs.js";

const initialParams = {
  q: "robert",
  limit: 15,
};

//initial global state
export const initialState = {
  loading: false,
  error: null,
  data: null,
};

// нужно ли сюда передавать initialState и мутировать его
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
    if (state.error instanceof Error) {
      state.error = { name: `${error.name}`, message: `${error.message}` };
      console.log("Error: ", error); //
    }
    state.error = { name: "Unknown", message: "Unknown error" };
    console.log("Error: ", error); //
    return state;
  } finally {
    state.loading = false;
  }
};
