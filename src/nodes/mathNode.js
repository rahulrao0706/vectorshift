// mathNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState('Add');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input1`, style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: `${id}-input2`, style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} label="Math" handles={handles}>
      <label>
        Operation:
        <select value={operation} onChange={handleOperationChange} className="nodrag">
          <option value="Add">Add</option>
          <option value="Subtract">Subtract</option>
          <option value="Multiply">Multiply</option>
          <option value="Divide">Divide</option>
        </select>
      </label>
    </BaseNode>
  );
}
