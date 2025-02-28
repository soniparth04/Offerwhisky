import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/owner/view-users", { withCredentials: true }) ;
                if (Array.isArray(res.data)) {  // Change response.data to res.data
                    setUsers(res.data);
                }
                else {
                    throw new Error("Invalid data format received");
                }
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto mt-10 ">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <table className="w-full border-collapse border border-gray-300 ml-4 mr-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">S.No</th>
                        <th className="border p-2">Offer details</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user._id} >
                                <td className="border p-2 text-center">{index + 1}</td>
                                <td className="border p-2">
                                    <strong>Name:-</strong> {user.name} <br />
                                    <strong> Phone:-</strong> {user.phone} <br />
                                    <a href={`/owner/view-redeemed/${user._id}`} className="text-blue-500 underline">
                                        View Offer
                                    </a>

                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-gray-500">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewUser;
