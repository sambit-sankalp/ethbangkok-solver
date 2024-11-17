import React, { useState } from 'react';

const TableComponent = ({ orders }: { orders: any[] }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null); // State for toast

  const columns = [
    { display: 'ID', field: 'id' },
    { display: 'Source Address', field: 'source_address' },
    { display: 'Destination Address', field: 'destination_address' },
    { display: 'From Network', field: 'from_network' },
    { display: 'To Network', field: 'to_network' },
    { display: 'From Asset', field: 'from_asset' },
    { display: 'To Asset', field: 'to_asset' },
    { display: 'Amount', field: 'amount' },
    { display: 'Slippage Tolerance', field: 'slippage_tolerance' },
    { display: 'Deadline', field: 'deadline' },
    { display: 'Max Gas Fee', field: 'max_gas_fee' },
    { display: 'Status', field: 'status' },
  ];

  // Helper function to trim addresses
  const trimAddress = (address: string) => {
    if (!address || address.length < 7) return address;
    return `${address.slice(0, 6)}...${address.slice(-3)}`;
  };

  // Helper function to copy text to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage('Copied to clipboard!'); // Set toast message
    setTimeout(() => setToastMessage(null), 3000); // Hide toast after 3 seconds
  };  

  return (
    <div className="p-6 bg-[#16161a] rounded-lg shadow-lg min-h-screen relative">
      <h2 className="text-2xl font-bold text-white mb-4">Transaction Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-700 bg-gray-800 rounded-lg overflow-hidden">
          {/* Table Header */}
          <thead>
            <tr className="bg-background">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient text-left border-b border-gray-700"
                >
                  {column.display}
                </th>
              ))}
              <th className="px-4 py-3 text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient text-left border-b border-gray-700">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, orderIndex) => (
                <tr
                  key={orderIndex}
                  className={`transition-all ${
                    orderIndex % 2 === 0 ? 'bg-background' : 'bg-background'
                  }`}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-4 py-3 text-sm text-gray-300 border-b border-gray-700 ${
                        column.field === 'id'
                          ? 'cursor-pointer hover:text-white'
                          : ''
                      }`}
                      onClick={
                        column.field === 'id'
                          ? () => handleCopy(order[column.field])
                          : undefined
                      } // Attach copy functionality to ID column
                    >
                      {/* Display trimmed address for address fields */}
                      {column.field === 'source_address' ||
                      column.field === 'destination_address'
                        ? trimAddress(order[column.field])
                        : order[column.field] || 'N/A'}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm text-gray-300 border-b border-gray-700">
                    <button className="px-3 py-1 bg-white text-black font-semibold rounded-lg transition-all">
                      Solve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-3 text-md text-gray-400 text-center border-b border-gray-700 bg-background"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-[#7f5af0] text-white px-6 py-2 rounded-lg shadow-lg transition-all">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default TableComponent;
