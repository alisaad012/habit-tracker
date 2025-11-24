import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleHabit } from '../api';
import type { Habit } from '../types';

export const useToggleHabit = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: toggleHabit,

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['habits'] });
      const previousHabits =
        queryClient.getQueryData<Habit[]>(['habits']) || [];
      queryClient.setQueryData<Habit[]>(['habits'], (oldHabits) => {
        if (!oldHabits) return previousHabits;
        return oldHabits.map((habit) =>
          habit.id === id ? { ...habit, done: !habit.done } : habit
        );
      });
      return { previousHabits };
    },

    onError: (error, id, context) => {
      console.error(`Optimistic toggleHabit failed for ${id}`, error);
      if (context?.previousHabits) {
        queryClient.setQueryData<Habit[]>(['habits'], context.previousHabits);
      }
    },

    onSettled: () => {
      console.log('toggleHabit settled');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
  return { toggleHabit: mutate };
};
