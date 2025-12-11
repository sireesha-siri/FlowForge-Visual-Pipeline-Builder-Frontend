// submit.js

import { useStore } from './store';
import { useState } from 'react';

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  // DAG validation algorithm (Kahn's Algorithm)
  const checkIsDAG = (nodes, edges) => {
    const adjList = {};
    const inDegree = {};

    // Initialize
    nodes.forEach(node => {
      adjList[node.id] = [];
      inDegree[node.id] = 0;
    });

    // Build graph
    edges.forEach(edge => {
      adjList[edge.source].push(edge.target);
      inDegree[edge.target]++;
    });

    // Find all nodes with no incoming edges
    const queue = [];
    nodes.forEach(node => {
      if (inDegree[node.id] === 0) queue.push(node.id);
    });

    // Process nodes
    let count = 0;
    while (queue.length > 0) {
      const node = queue.shift();
      count++;
      adjList[node].forEach(neighbor => {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) queue.push(neighbor);
      });
    }

    // If we processed all nodes, it's a DAG
    return count === nodes.length;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('https://flowforge-visual-pipeline-builder-backend.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges })
      });

      if (!response.ok) {
        throw new Error('Backend request failed');
      }

      const data = await response.json();
      const isDAG = checkIsDAG(nodes, edges);

      // User-friendly alert
      alert(
        `✅ Pipeline Analysis Complete!\n\n` +
        `📊 Total Nodes: ${data.num_nodes}\n` +
        `🔗 Total Edges: ${data.num_edges}\n` +
        `${isDAG ? '✅' : '❌'} Is Valid DAG: ${isDAG ? 'Yes' : 'No'}\n\n` +
        `${!isDAG ? '⚠️ Warning: Your pipeline contains cycles!' : '✨ Your pipeline is valid!'}`
      );
    } catch (error) {
      alert(
        `❌ Error: Could not connect to backend\n\n` +
        `Please ensure:\n` +
        `1. Backend server is running (uvicorn main:app --reload)\n` +
        `2. Server is accessible at http://localhost:8000\n\n` +
        `Error details: ${error.message}`
      );
      console.error('Submit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border-t border-violet-500/20 p-4 flex justify-center gap-4">
      <button
        onClick={handleSubmit}
        disabled={isLoading || nodes.length === 0}
        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span>
            <span>Analyzing Pipeline...</span>
          </>
        ) : (
          <>
            <span>🚀</span>
            <span>Submit Pipeline</span>
          </>
        )}
      </button>
      
      <div className="text-sm text-violet-300 self-center">
        {nodes.length} node{nodes.length !== 1 ? 's' : ''}, {edges.length} edge{edges.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

// export const SubmitButton = () => {

//     return (
//         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//             <button type="submit">Submit</button>
//         </div>
//     );
// }
