import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Wallet} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OwnerWallet = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [transactions, setTransactions] = useState([]);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ownerId = queryParams.get('ownerId');

  useEffect(() => {
  const fetchBalance = async () => {
    if (!ownerId) return;

    try {
      const res = await fetch(`https://offerwhisky.onrender.com/api/owner/${ownerId}`);
      const data = await res.json();
      setWalletBalance(data.walletBalance || 0);
      setTransactions(data.walletTransactions || []);
    } catch (err) {
      console.error('Failed to fetch wallet balance:', err);
    }
  };

  fetchBalance();
}, [ownerId]);


  const handleAddBalance = async () => {
    if (!amountToAdd || isNaN(amountToAdd) || amountToAdd <= 0) {
      return setMessage('Please enter a valid amount');
    }

    setLoading(true);
    try {
      const res = await fetch(`https://offerwhisky.onrender.com/api/wallet/add-balance/${ownerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amountToAdd) }),
      });

      const data = await res.json();

      if (res.ok) {
        setWalletBalance(data.walletBalance);
        setMessage('Balance added successfully!');
        setAmountToAdd('');
      } else {
        setMessage(data.message || 'Failed to add balance');
      }
    } catch (err) {
      setMessage('Server error. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b">
        <button  onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Wallet</h1>
      </div>

      {/* Balance Card */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-80">Available Balance</p>
            <Wallet size={20} />
          </div>
          <h2 className="text-3xl font-bold mb-6">₹{walletBalance}</h2>
          <div className="mb-4">
        <label className="block text-sm font-medium ">Add Amount (₹)</label>
        <input
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mt-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter amount"
        />
      </div>
          <div className="flex ">
            <button onClick={handleAddBalance}
              disabled={loading} className="flex-1 bg-white bg-opacity-20 py-2.5 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition">
              <Plus size={16} className="mr-2" />
              {loading ? 'Adding...' : 'Add Balance'}
            </button>
          </div>
        </div>
      </div>
      
      {message && (
        <div className="mt-4 text-center text-sm text-green-600">{message}</div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
        {transactions.length === 0 ? (
          <p className="text-gray-600">No transactions yet.</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {transactions
              .slice() // shallow copy
              .reverse() // latest first
              .map((txn, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-100 rounded-md shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{txn.reason || txn.type}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(txn.date).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={
                      txn.type === 'credit' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
                    }
                  >
                    ₹{txn.amount}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default OwnerWallet;
