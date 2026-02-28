from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if the graph is a Directed Acyclic Graph (DAG)
    # Build an adjacency list
    adj_list = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in adj_list:
            adj_list[source].append(target)
            
    # Use DFS for cycle detection
    visited = set()
    rec_stack = set()
    
    def is_cyclic(node_id):
        visited.add(node_id)
        rec_stack.add(node_id)
        
        for curr_target in adj_list.get(node_id, []):
            if curr_target not in visited:
                if is_cyclic(curr_target):
                    return True
            elif curr_target in rec_stack:
                return True
                
        rec_stack.remove(node_id)
        return False
        
    is_dag = True
    for node in nodes:
        node_id = node['id']
        if node_id not in visited:
            if is_cyclic(node_id):
                is_dag = False
                break
                
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
