import { useCallback, useState } from 'react';

import Bit from './Bit';

function Byte() {
  const [byte, setByte] = useState<boolean[]>([]);
  const toggleBit = (id: number) => {
    setByte((prevByte) =>
      prevByte.map((bit, idx) => (idx !== id ? bit : !bit))
    );
  };
  const addBit = (bit: boolean) => {
    setByte((prevByte) => [...prevByte, bit]);
  };
  const value = useCallback(() => {
    return byte.reverse().reduce((sum, bit, idx) => {
      sum += (1 << idx) * (bit ? 1 : 0);
      return sum;
    }, 0);
  }, [byte]);

  return (
    <>
      <div style={{ margin: '1em' }}>{value()}</div>
      <div style={{ margin: '1em', display: 'flex' }}>
        {byte.map((bit, idx) => (
          <Bit key={idx} bit={bit} toggleBit={() => toggleBit(idx)} />
        ))}
      </div>
      <button onClick={() => addBit(false)}>Add Bit</button>
    </>
  );
}

export default Byte;
