// timerNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(1);
  const [unit, setUnit] = useState('Seconds');

  const handleDelayChange = (e) => setDelay(e.target.value);
  const handleUnitChange = (e) => setUnit(e.target.value);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-start` },
    { type: 'source', position: Position.Right, id: `${id}-trigger` }
  ];

  return (
    <BaseNode id={id} label="Timer" handles={handles}>
      <div style={{ display: 'flex', gap: '5px' }}>
        <input 
          type="number" 
          value={delay} 
          onChange={handleDelayChange} 
          className="nodrag"
          style={{ width: '50px' }}
        />
        <select value={unit} onChange={handleUnitChange} className="nodrag">
          <option value="Seconds">Secs</option>
          <option value="Minutes">Mins</option>
          <option value="Hours">Hrs</option>
        </select>
      </div>
    </BaseNode>
  );
}
