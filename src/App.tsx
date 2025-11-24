import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { deleteHabit, fetchHabits, saveHabit, toggleHabit } from './api';

import './App.css';
import HabitItem from './HabitItem';
import Header from './Header';

function App() {
  const [appName, setAppName] = useState('Habit Tracker');
  const [newTitle, setNewTitle] = useState<string>('');

  const {
    data: habits,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['habits'],
    queryFn: fetchHabits,
  });

  const queryClient = useQueryClient();

  const createHabitMutation = useMutation({
    mutationFn: saveHabit,
    onSuccess: () => {
      console.log('saveHabit sucess');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const toggleHabitMutation = useMutation({
    mutationFn: toggleHabit,
    onSuccess: () => {
      console.log('toggleHabit success');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const deleteHabitMutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      console.log('deleteHabit success');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createHabitMutation.mutate(newTitle);
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
              toggleDone={() => toggleHabitMutation.mutate(habit.id)}
              deleteHabit={() => deleteHabitMutation.mutate(habit.id)}
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
        <button type="submit" disabled={createHabitMutation.isPending}>
          Add Habit
        </button>
      </form>
    </>
  );
}

export default App;
