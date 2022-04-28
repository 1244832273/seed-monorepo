import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location]);
  return query;
}

export default useQuery;
