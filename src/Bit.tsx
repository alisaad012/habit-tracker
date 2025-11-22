interface BitProps {
  bit: boolean;
  toggleBit: () => void;
}

function Bit({ bit, toggleBit }: BitProps) {
  return (
    <div
      style={{
        fontFamily: 'monospace',
        border: '1px solid black',
        boxSizing: 'border-box',
        aspectRatio: 1,
        padding: '0.5em',
        fontSize: '1.5em',
        textAlign: 'center',
        height: '2.5em',
        cursor: 'pointer',
      }}
      onClick={() => toggleBit()}
    >
      {bit ? 1 : 0}
    </div>
  );
}

export default Bit;
