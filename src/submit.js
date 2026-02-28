// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // User-friendly alert with response data
            alert(`Pipeline Analysis:\n\n` +
                  `Nodes: ${data.num_nodes}\n` +
                  `Edges: ${data.num_edges}\n` +
                  `Is Directed Acyclic Graph (DAG): ${data.is_dag ? 'Yes' : 'No'}`);
                  
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to connect to the backend. Is it running on port 8000?');
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0'}}>
            <button type="submit" onClick={handleSubmit}>Submit Pipeline</button>
        </div>
    );
}
