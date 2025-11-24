import type { Habit } from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let counter = 1;

const habits: Habit[] = [
  { id: counter++, title: 'Drink water', done: true },
  { id: counter++, title: 'Go to the gym', done: true },
  { id: counter++, title: 'Walk 10k steps', done: false },
];

export const fetchHabits = async (): Promise<Habit[]> => {
  await delay(1000);
  if (Math.random() < 0.5) {
    console.error('fetchHabits timed out');
    throw new Error('Timed out');
  }
  return [...habits];
};

export const saveHabit = async (title: string): Promise<Habit> => {
  await delay(1000);
  const newHabit = {
    id: counter++,
    title,
    done: false,
  };
  habits.push(newHabit);
  return { ...newHabit };
};

export const toggleHabit = async (id: number): Promise<Habit> => {
  await delay(1000);
  if (Math.random() < 0.5) {
    console.log('toggleHabit timed out');
    throw new Error('Timed out');
  }
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
