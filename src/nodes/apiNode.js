// apiNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [endpoint, setEndpoint] = useState('https://api.example.com');
  const [method, setMethod] = useState('GET');

  const handleEndpointChange = (e) => setEndpoint(e.target.value);
  const handleMethodChange = (e) => setMethod(e.target.value);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-trigger` },
    { type: 'source', position: Position.Right, id: `${id}-response` },
    { type: 'source', position: Position.Right, id: `${id}-error`, style: { top: '75%' } }
  ];

  return (
    <BaseNode id={id} label="API Request" handles={handles}>
      <label>
        Method:
        <select value={method} onChange={handleMethodChange} className="nodrag" style={{marginBottom: '5px'}}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      <label>
        Endpoint:
        <input 
          type="text" 
          value={endpoint} 
          onChange={handleEndpointChange} 
          className="nodrag"
        />
      </label>
    </BaseNode>
  );
}
