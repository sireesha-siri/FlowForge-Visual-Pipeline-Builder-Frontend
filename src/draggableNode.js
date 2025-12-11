// draggableNode.js

export const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      className="cursor-grab active:cursor-grabbing bg-gradient-to-br from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white rounded-lg px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 min-w-[100px] flex items-center justify-center gap-2"
    >
      {Icon && <Icon size={20} strokeWidth={2} />}
      <span className="font-semibold">{label}</span>
    </div>
  );
};

// export const DraggableNode = ({ type, label }) => {
//     const onDragStart = (event, nodeType) => {
//       const appData = { nodeType }
//       event.target.style.cursor = 'grabbing';
//       event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
//       event.dataTransfer.effectAllowed = 'move';
//     };
  
//     return (
//       <div
//         className={type}
//         onDragStart={(event) => onDragStart(event, type)}
//         onDragEnd={(event) => (event.target.style.cursor = 'grab')}
//         style={{ 
//           cursor: 'grab', 
//           minWidth: '80px', 
//           height: '60px',
//           display: 'flex', 
//           alignItems: 'center', 
//           borderRadius: '8px',
//           backgroundColor: '#1C2536',
//           justifyContent: 'center', 
//           flexDirection: 'column'
//         }} 
//         draggable
//       >
//           <span style={{ color: '#fff' }}>{label}</span>
//       </div>
//     );
//   };
  