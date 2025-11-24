import { useQuery } from '@tanstack/react-query';

import { fetchHabits } from '../api';

export const useHabits = () => {
  const {
    data: habits,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['habits'],
    queryFn: fetchHabits,
  });
  return { habits, isLoading, error };
};
