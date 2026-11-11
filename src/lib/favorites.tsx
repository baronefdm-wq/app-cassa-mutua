import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { readJson, writeJson } from './storage';

const KEY = 'favorites:convenzioni';

type FavoritesCtx = {
  favorites: string[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
};

const Ctx = createContext<FavoritesCtx>({ favorites: [], isFavorite: () => false, toggleFavorite: () => {} });

/** Convenzioni preferite, salvate sul telefono. */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    void readJson<string[]>(KEY).then((saved) => {
      if (saved) setFavorites(saved);
    });
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      void writeJson(KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ favorites, isFavorite: (slug: string) => favorites.includes(slug), toggleFavorite }),
    [favorites, toggleFavorite],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useFavorites = () => useContext(Ctx);
