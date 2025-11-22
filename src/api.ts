import type { Habit } from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchHabits = async (): Promise<Habit[]> => {
  await delay(1000);
  if (Math.random() < 0.5) {
    throw Error('Timed out');
  }
  return [
    { id: 1, title: 'Drink water', done: true },
    { id: 2, title: 'Go to the gym', done: true },
    { id: 3, title: 'Walk 10k steps', done: false },
  ];
};
