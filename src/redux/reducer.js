import { cosmeticsAPI } from "../api/api";

const SET_COSMETICS_DATA = "SET_COSMETICS_DATA";

const initialState = {
  cosmetics: [],
  pageSize: 30,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COSMETICS_DATA:
      return { ...state, cosmetics: action.cosmetics };
    default:
      return state;
  }
};

export const setCosmeticsData = (cosmetics) => ({
  type: SET_COSMETICS_DATA,
  cosmetics
});

// хорошо бы вынести в отдельный файл запрос
export const getCosmetics = () => (dispatch) => {
  return cosmeticsAPI.getCosmetics().then((response) => {
    if (response.status === 200) {
      dispatch(setCosmeticsData(response.data));
    } else {
      return console.log("Поиск не удался");
    }
  });
};
export default reducer;
