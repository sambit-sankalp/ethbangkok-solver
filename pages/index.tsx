import { signIn, signOut, useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignInPage() {
  const { data: session, status } = useSession(); // Get the session data
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const loading = status === 'loading';
  const router = useRouter();

  console.log(status, 'status');
  console.log('data', session);

  // Function to handle stacking (dummy implementation)
  const handleStacking = (): void => {
    console.log('Stacking coins...');
    alert('Coins stacked successfully!');
    router.push('/intents')
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white font-montserrat">
      {/* Navbar */}
      <Navbar />

      <section className="relative flex flex-col items-center justify-center text-center py-20 bg-[#16161a] text-white">
        <h1 className="text-5xl font-bold max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
          Solver Sign-In
        </h1>
        <p className="text-lg max-w-xl mt-4 text-gray-300">
          Sign in to access exclusive solver tools, start solving intents, and
          earn rewards. Join the revolution of intent solving today!
        </p>

        {/* Sign-In Options */}
        <div className="mt-10">
          {!session && (
            <>
              <p className="mb-4 text-sm text-gray-400">
                You are not signed in
              </p>
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn('worldcoin'); // when worldcoin is the only provider
                  // signIn() // when there are multiple providers
                }}
              >
                <button
                  onClick={() => signIn('worldcoin')} // Update provider as needed
                  className="px-8 py-4 bg-white text-black rounded-xl text-lg font-semibold transform transition hover:scale-105 hover:brightness-110 shadow-lg"
                >
                  Sign in with Worldcoin
                </button>
              </a>
            </>
          )}

          {session?.user && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
              <div className="bg-[#1e1e20] rounded-lg shadow-lg p-8 max-w-md w-full text-center relative">
                {/* Close Button */}
                <button
                  onClick={() => router.push('/intents')}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 text-lg"
                >
                  ✖
                </button>

                {/* Popup Content */}
                <div className="flex flex-col items-center space-y-6 mt-8">
                  <h2 className="text-3xl font-sans font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
                    Stack Your Coins
                  </h2>
                  <p className="text-gray-400">
                    Stack your coins to earn rewards and maximize your potential
                    with PhoenixFi.
                  </p>

                  {/* Staking Amount */}
                  <p className="text-white text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    0.0001 ETH
                  </p>

                  {/* Stack Now Button */}
                  <button
                    onClick={handleStacking}
                    className="w-full px-6 py-3 bg-white text-black rounded-md text-lg font-semibold transition-transform transform hover:scale-105"
                  >
                    Stack Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading && <p className="mt-4 text-sm text-gray-400">Loading...</p>}
        </div>

        {/* Why Sign-In Section */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="p-6 bg-[#242629] rounded-xl shadow-lg max-w-lg w-full sm:w-[45%] h-full">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">
              Why Sign In?
            </h3>
            <ul className="text-gray-300 text-left list-disc list-inside space-y-2">
              <li>Access exclusive solver functionalities.</li>
              <li>Securely manage your transactions and rewards.</li>
              <li>Be part of the PhoenixFi solver ecosystem.</li>
            </ul>
          </div>
          <div className="p-6 bg-[#242629] rounded-xl shadow-lg max-w-lg w-full sm:w-[45%] h-full">
            <h3 className="text-2xl font-semibold text-pink-400 mb-4">
              How It Works?
            </h3>
            <ul className="text-gray-300 text-left list-disc list-inside space-y-2">
              <li>Connect your account using Worldcoin or other providers.</li>
              <li>Sign in to view and solve intents.</li>
              <li>Start earning rewards for solving intents.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
