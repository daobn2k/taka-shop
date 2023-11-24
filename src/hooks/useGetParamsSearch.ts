import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { formatParamsSearch } from '@/utils/common';

export const useGetParamsSearch = () => {
  const [searchParams] = useSearchParams();
  const dataParams = useMemo(() => {
    return formatParamsSearch(searchParams);
  }, [searchParams]);

  return dataParams;
};
