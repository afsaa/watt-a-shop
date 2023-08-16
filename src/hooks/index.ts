import { useMemo, useState } from 'react';
import { Product } from '../store/store.types';

export function useSearchItems(items: Product[]) {
  const [query, setQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<Product[]>(items);

  useMemo(() => {
    const result = items.filter((item) => {
      return `${item.title}`.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredItems(result);
  }, [items, query]);

  return { query, setQuery, filteredItems };
}
