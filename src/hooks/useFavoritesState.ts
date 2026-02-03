import { useFavorites } from '../context/FavoritesContext';

export function useFavoritesState() {
  const { favorites, isLoading, isFavorite, toggleFavorite } = useFavorites();

  return { favorites, isLoading, isFavorite, toggleFavorite };
}
