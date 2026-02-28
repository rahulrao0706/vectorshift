// textNode.js

import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Extract variables surrounded by {{ }}
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const uniqueVars = [...new Set(matches.map(match => match[1]))];
    setVariables(uniqueVars);

    // Auto-resize logic
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      
      textareaRef.current.style.width = 'auto'; // Reset width
      // Add a bit of padding to the width to avoid jumping
      const newWidth = Math.max(150, textareaRef.current.scrollWidth + 10);
      textareaRef.current.style.width = `${newWidth}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Generate dynamic handles based on variables
  const variableHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${variable}`,
    style: { top: `${(100 / (variables.length + 1)) * (index + 1)}%` },
  }));

  const handles = [
    ...variableHandles,
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} label="Text" handles={handles}>
      <label>
        Text:
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={handleTextChange} 
          className="nodrag"
          style={{
            minHeight: '40px',
            minWidth: '150px',
            resize: 'none',
            overflow: 'hidden',
          }}
        />
      </label>
    </BaseNode>
  );
}
