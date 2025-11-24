import type { Habit } from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const habits: Habit[] = [
  { id: 1, title: 'Drink water', done: true },
  { id: 2, title: 'Go to the gym', done: true },
  { id: 3, title: 'Walk 10k steps', done: false },
];

export const fetchHabits = async (): Promise<Habit[]> => {
  await delay(1000);
  if (Math.random() < 0.5) {
    console.error('Timed out');
    throw Error('Timed out');
  }
  return [...habits];
};

export const saveHabit = async (title: string): Promise<Habit> => {
  await delay(1000);
  const newHabit = {
    id: 4,
    title,
    done: false,
  };
  habits.push(newHabit);
  return { ...newHabit };
};

export const toggleHabit = async (id: number): Promise<Habit> => {
  await delay(1000);
  const habit = habits.find((habit) => habit.id === id);
  if (!habit) throw new Error('Habit not found');
  habit.done = !habit.done;
  return { ...habit };
};

export const deleteHabit = async (id: number): Promise<Habit> => {
  await delay(1000);
  const index = habits.findIndex((habit) => habit.id === id);
  if (index === -1) throw new Error('Habit not found');
  const habit = habits.splice(index, 1)[0];
  return { ...habit };
};
