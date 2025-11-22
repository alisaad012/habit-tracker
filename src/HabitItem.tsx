import { memo } from 'react';

import type { Habit } from './types';

interface HabitItemProp {
  habit: Habit;
  toggleDone: (habit: Habit) => void;
  deleteHabit: (habit: Habit) => void;
}

function HabitItem({ habit, toggleDone, deleteHabit }: HabitItemProp) {
  return (
    <>
      <li className={habit.done ? 'habit-done' : undefined}>
        <input
          type="checkbox"
          name="done"
          checked={habit.done}
          onChange={() => toggleDone(habit)}
        />
        {habit.title}

        <button onClick={() => deleteHabit(habit)}>❌</button>
      </li>
    </>
  );
}

export default memo(HabitItem);
