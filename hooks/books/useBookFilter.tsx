import { FilterType, SortType } from '@/types';
import { useState } from 'react';



export const useBookFilters = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("title");
  const [params, setParams] = useState<Record<string, string>>({});

  const handleFilterChange = ({
    filter: newFilter,
    sort: newSort,
  }: {
    filter: FilterType;
    sort: SortType;
  }) => {
    setFilter(newFilter);
    setSort(newSort);

    const newParams: Record<string, any> = { sort: newSort };
    if (newFilter === "read") newParams.read = true;
    else if (newFilter === "unread") newParams.read = false;
    else if (newFilter === "favorite") newParams.favorite = true;

    setParams(newParams);
  };

  return {
    filter,
    sort,
    params,
    handleFilterChange,
  };
};
