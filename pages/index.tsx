import { signIn, signOut, useSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SignInPage() {
  const { data: session, status } = useSession(); // Get the session data
  const loading = status === 'loading';

  console.log(status, 'status');
  console.log('data', session);

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
              <button
                onClick={() => signIn('worldcoin')} // Update provider as needed
                className="px-8 py-4 bg-white text-black rounded-xl text-lg font-semibold transform transition hover:scale-105 hover:brightness-110 shadow-lg"
              >
                Sign in with Worldcoin
              </button>
            </>
          )}

          {session?.user && (
            <div className="mt-6">
              <div className="flex items-center justify-center gap-4">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="image"
                    className="h-12 w-12 rounded-full shadow-lg"
                  />
                )}
                <div>
                  <p className="text-lg font-semibold">Welcome,</p>
                  <p className="text-md font-medium text-gray-300">
                    {session.user.email ?? session.user.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="mt-4 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white rounded-xl text-lg font-semibold transform transition hover:scale-105 hover:brightness-110"
              >
                Sign Out
              </button>
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
