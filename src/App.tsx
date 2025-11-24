import { useEffect, useState } from 'react';

import './App.css';
import HabitItem from './HabitItem';
import Header from './Header';
import { useCreateHabit } from './hooks/useCreateHabit';
import { useDeleteHabit } from './hooks/useDeleteHabit';
import { useHabits } from './hooks/useHabits';
import { useToggleHabit } from './hooks/useToggleHabit';

function App() {
  const [appName, setAppName] = useState('Habit Tracker');
  const [newTitle, setNewTitle] = useState<string>('');

  const { habits, isLoading, error } = useHabits();
  const { saveHabit, isSaving } = useCreateHabit();
  const { toggleHabit } = useToggleHabit();
  const { deleteHabit } = useDeleteHabit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveHabit(newTitle);
    setNewTitle('');
  };

  useEffect(() => console.log('App component loaded and mounted'), []);
  useEffect(() => console.log(`App name changed to ${appName}`), [appName]);

  return (
    <>
      <Header title={appName} />
      <button onClick={() => setAppName((prevName) => `${prevName} 💪`)}>
        Update App Name
      </button>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{`Error: ${error.message}`}</div>
      ) : !habits || habits.length === 0 ? (
        <div>No Habits yet!</div>
      ) : (
        <ol>
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              toggleHabit={() => toggleHabit(habit.id)}
              deleteHabit={() => deleteHabit(habit.id)}
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
        <button type="submit" disabled={isSaving}>
          Add Habit
        </button>
      </form>
    </>
  );
}

export default App;
