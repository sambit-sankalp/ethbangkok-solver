import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Use Next.js router
import TableComponent from '../components/Table';
import { Web3Auth } from '@web3auth/modal';
import Navbar from '../components/Navbar';

function SolverPage() {
  const clientId = 'VYDh3cKkTV6gUfFHQAuzV87ZKHo6Vd6t'; // Replace with your Web3Auth Client ID
  const [provider, setProvider] = useState(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]); // State for orders
  const router = useRouter(); // Next.js router

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/orders'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = async () => {
    if (web3auth) {
      try {
        await web3auth.logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    // Clear state
    setProvider(null);
    router.push('/'); // Navigate to the login page
  };

  return (
    <div className="min-h-screen bg-[#16151a] text-main">
      {/* Header */}
      <Navbar />

      {/* Orders Table Section */}
      <div className="w-full flex flex-col min-h-screen bg-background text-headline p-6">
        <TableComponent orders={orders} />
      </div>
    </div>
  );
}

export default SolverPage;
