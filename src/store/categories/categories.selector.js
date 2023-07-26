import { createSelector } from "reselect";

// usando a função `createSelector()` do reselect,
// criamos um fluxo de "seletores de entrada" e "seletores de saída"
// com vários estágios de memoização.
// Os seletores de entrada extraem valores dos argumentos, e os de saída
// recebem esse valor e retornam um valor derivado. Se o seletor gerado
// for chamado diversas vezes, a saída só será recalculada
// se os valores extraídos mudarem.
const selectCategoryReducer = state => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  categoriesSlice => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  categories => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
