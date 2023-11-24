import { createSearchParams, useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();
  const onNavSearch = ({ pathname = '', data = '' }: { pathname: string; data?: any }) => {
    const search = data ? createSearchParams(data).toString() : undefined;
    navigate({
      pathname,
      search,
    });
  };
  return { navigate, onNavSearch };
};
