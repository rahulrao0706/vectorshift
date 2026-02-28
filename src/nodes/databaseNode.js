// databaseNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState('PostgreSQL');

  const handleDbTypeChange = (e) => setDbType(e.target.value);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-query` },
    { type: 'source', position: Position.Right, id: `${id}-result` }
  ];

  return (
    <BaseNode id={id} label="Database" handles={handles}>
      <label>
        Type:
        <select value={dbType} onChange={handleDbTypeChange} className="nodrag" style={{marginBottom: '5px'}}>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MySQL">MySQL</option>
          <option value="MongoDB">MongoDB</option>
          <option value="Redis">Redis</option>
        </select>
      </label>
      <label>
        Config:
        <button className="secondary-button nodrag">Configure Connection</button>
      </label>
    </BaseNode>
  );
}
