import { useMutation, useQueryClient } from '@tanstack/react-query';

import { saveHabit } from '../api';

export const useCreateHabit = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: saveHabit,
    onSuccess: () => {
      console.log('saveHabit sucess');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
  return { saveHabit: mutate, isSaving: isPending };
};
