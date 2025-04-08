// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const candidates = [
//   { id: 1, name: "John Doe", party: "Democratic Party" },
//   { id: 2, name: "Jane Smith", party: "Republican Party" },
//   { id: 3, name: "Alice Johnson", party: "Green Party" },
//   { id: 4, name: "Bob Brown", party: "Libertarian Party" },
//   { id: 5, name: "Charlie White", party: "Independent Party" },
//   { id: 6, name: "Emma Davis", party: "Socialist Party" },
//   { id: 7, name: "Liam Wilson", party: "Constitution Party" },
//   { id: 8, name: "Olivia Martinez", party: "Progressive Party" }
// ];

// const VotingPage: React.FC = () => {
//   const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
//   const [hasVoted, setHasVoted] = useState<boolean>(
//     localStorage.getItem("hasVoted") === "true"
//   );

//   const handleVote = () => {
//     if (selectedCandidate === null || hasVoted) {
//       return;
//     }
//     setHasVoted(true);
//     localStorage.setItem("hasVoted", "true");
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 w-screen">
//       <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center w-full">Vote for Your Candidate</h1>
//       <div className="w-screen bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
//         <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
//           {candidates.map((candidate) => (
//             <li 
//               key={candidate.id} 
//               className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 shadow-sm w-full 
//                 ${selectedCandidate === candidate.id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}
//                 ${hasVoted ? 'cursor-not-allowed opacity-50' : ''}`} 
//               onClick={() => !hasVoted && setSelectedCandidate(candidate.id)}
//             >
//               <p className="text-lg font-semibold">{candidate.name}</p>
//               <p className="text-gray-600">{candidate.party}</p>
//             </li>
//           ))}
//         </ul>
//         <div className="w-full flex justify-center mt-6">
//           <button 
//             className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//             onClick={handleVote}
//             disabled={hasVoted}
//           >
//             Submit Vote
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VotingPage;
import React, { useState } from "react";

const candidates = [
  { id: 1, name: "John Doe", party: "Democratic Party" },
  { id: 2, name: "Jane Smith", party: "Republican Party" },
  { id: 3, name: "Alice Johnson", party: "Green Party" },
  { id: 4, name: "Bob Brown", party: "Libertarian Party" },
  { id: 5, name: "Charlie White", party: "Independent Party" },
  { id: 6, name: "Emma Davis", party: "Socialist Party" },
  { id: 7, name: "Liam Wilson", party: "Constitution Party" },
  { id: 8, name: "Olivia Martinez", party: "Progressive Party" }
];

const VotingPage: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const handleVote = () => {
    if (selectedCandidate === null) {
      alert("Please select a candidate before voting.");
      return;
    }
    
    setHasVoted(true);
    alert(`Your vote for ${candidates.find(c => c.id === selectedCandidate)?.name} has been recorded.`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 w-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center w-full">Vote for Your Candidate</h1>
      <div className="w-screen bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {candidates.map((candidate) => (
            <li 
              key={candidate.id} 
              className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 shadow-sm w-full 
                ${selectedCandidate === candidate.id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}
                ${hasVoted ? 'cursor-not-allowed opacity-50' : ''}`} 
              onClick={() => !hasVoted && setSelectedCandidate(candidate.id)}
            >
              <p className="text-lg font-semibold">{candidate.name}</p>
              <p className="text-gray-600">{candidate.party}</p>
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-center mt-6">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleVote}
            disabled={hasVoted}
          >
            Submit Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
