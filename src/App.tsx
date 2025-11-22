import { useCallback, useEffect, useState } from 'react';

import { fetchHabits } from './api';
import './App.css';
import HabitItem from './HabitItem';
import Header from './Header';
import type { Habit } from './types';

function App() {
  const [appName, setAppName] = useState('Habit Tracker');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');

  const addHabit = useCallback((title: string) => {
    setHabits((prevHabits) => {
      const id =
        prevHabits.length === 0 ? 1 : prevHabits[prevHabits.length - 1].id + 1;
      return [
        ...prevHabits,
        {
          id,
          title,
          done: false,
        },
      ];
    });
  }, []);
  const deleteHabit = useCallback((habit: Habit) => {
    setHabits((prevHabits) => prevHabits.filter((h) => habit.id !== h.id));
  }, []);
  const toggleDone = useCallback((habit: Habit) => {
    setHabits((prevHabits) =>
      prevHabits.map((h) => {
        if (h.id !== habit.id) return h;
        return {
          ...h,
          done: !h.done,
        };
      })
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHabit(newTitle);
    setNewTitle('');
  };

  useEffect(() => console.log('App component loaded and mounted'), []);
  useEffect(() => console.log(`App name changed to ${appName}`), [appName]);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        setHabits(await fetchHabits());
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header title={appName} />
      <button onClick={() => setAppName((prevName) => `${prevName} 💪`)}>
        Update App Name
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{`Error: ${error}`}</div>
      ) : (
        <ol>
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              toggleDone={toggleDone}
              deleteHabit={deleteHabit}
            ></HabitItem>
          ))}
        </ol>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Habit Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        ></input>
        <button type="submit">Add Habit</button>
      </form>
    </>
  );
}

export default App;
