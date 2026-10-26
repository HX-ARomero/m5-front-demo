// src/contexts/ProductsProvider.tsx
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { listProducts } from "../../services/products.service";
import { ProductsContext } from "./ProductsContext";
import type { ProductsState } from "./ProductsContext.types";

const PAGE_SIZE = 20;

const initialState: ProductsState = {
  products: [],

  // Estados de la consulta:
  isLoading: false,
  error: null,

  // Paginación:
  cursor: null,
  hasNextPage: true,
  isLoadingMore: false,

  // Filtros:
  searchText: "",
  categoryId: "",
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProductsState>(initialState);

  const debouncedSearch = useDebounce(state.searchText, 400);
  const searchPrefix =
    debouncedSearch.trim().length >= 2
      ? debouncedSearch.trim().toLowerCase()
      : undefined;

  const loadProducts = useCallback(
    async ({ reset = false }: { reset?: boolean } = {}) => {
      if (state.isLoading || state.isLoadingMore) {
        return;
      }
      const isFirstPage = reset || state.cursor === null;

      const cursor = isFirstPage ? null : state.cursor;
      setState((state) => ({
        ...state,
        ...(isFirstPage
          ? {
              products: [],
              isLoading: true,
            }
          : {
              isLoadingMore: true,
            }),
        error: null,
      }));

      try {
        const { items, lastDoc } = await listProducts({
          categoryId: state.categoryId || null,
          searchPrefix,
          pageSize: PAGE_SIZE,
          cursor,
        });
        setState((state) => ({
          ...state,
          products: isFirstPage ? items : [...state.products, ...items],
          cursor: lastDoc,
          hasNextPage: items.length === PAGE_SIZE,
          isLoading: false,
          isLoadingMore: false,
        }));
      } catch (error) {
        setState((state) => ({
          ...state,
          isLoading: false,
          isLoadingMore: false,
          error: error instanceof Error ? error.message : "Error desconocido",
        }));
      }
    },
    [
      debouncedSearch,
      state.categoryId,
      state.cursor,
      state.isLoading,
      state.isLoadingMore,
    ],
  );

  // Carga inicial y cada cambio de filtro.
  useEffect(() => {
    loadProducts({ reset: true });
  }, [debouncedSearch, state.categoryId]);

  const setSearchText = useCallback((value: string) => {
    setState((state) => ({
      ...state,
      searchText: value,
    }));
  }, []);

  const setCategoryId = useCallback((value: string) => {
    setState((state) => ({
      ...state,
      categoryId: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setState((state) => ({
      ...state,
      searchText: "",
      categoryId: "",
    }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      loadProducts,
      resetFilters,
      setSearchText,
      setCategoryId,
    }),
    [state, loadProducts, resetFilters, setSearchText, setCategoryId],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
