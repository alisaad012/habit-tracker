import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteHabit } from '../api';

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      console.log('deleteHabit success');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
  return { deleteHabit: mutate };
};
