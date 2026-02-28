// chartNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ChartNode = ({ id, data }) => {
  const [chartType, setChartType] = useState('Bar');

  const handleTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-data` }
  ];

  return (
    <BaseNode id={id} label="Chart" handles={handles}>
      <label>
        Type:
        <select value={chartType} onChange={handleTypeChange} className="nodrag">
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
          <option value="Pie">Pie Chart</option>
        </select>
      </label>
    </BaseNode>
  );
}
