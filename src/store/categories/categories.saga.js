import { all, call, put, takeLatest } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";

// o call() é um helper do redux-saga que chama a função passada como argumento
// e retorna um objeto que pode ser usado para controlar o fluxo da aplicação
// (por exemplo, para fazer tratamento de erros)
// o put() é um helper do redux-saga que dispara uma ação
// (é o equivalente ao dispatch do redux-thunk)
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// o takeLatest() é um helper do redux-saga que escuta a última ação disparada
// e executa a saga correspondente
export function* onFetchCategories() {
  yield takeLatest(
    [CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START],
    fetchCategoriesAsync
  );
}

// o all() é um helper do redux-saga que executa todas as sagas passadas como argumento
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
