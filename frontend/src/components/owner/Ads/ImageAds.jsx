import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Image as ImageIcon, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateImageAds = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [budget, setBudget] = useState(500);
    const [manualReach, setManualReach] = useState(500*17);
    const [reachManuallyEdited, setReachManuallyEdited] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const ownerId = sessionStorage.getItem('ownerId');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !budget || !agreeTerms || !title || !description) {
            setMessage('Please fill all fields and agree to the terms');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('budget', budget);
        formData.append('ownerId', ownerId);
        formData.append('title', title);
        formData.append('description', description);

        try {
            setLoading(true);
            setMessage('');
            await axios.post('https://offerwhisky.onrender.com/api/ad/create', formData);
            setMessage('Ad created successfully!');
            setImage(null);
            setPreview('');
            setBudget(500);
            setManualReach('');
            setReachManuallyEdited(false);
            setTitle('');
            setDescription('');
            setAgreeTerms(false);
            navigate(`/shop-owner/active-sponsored-Ads?ownerId=${ownerId}`)
        } catch (err) {
            setMessage('Failed to create ad');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white pb-36">
            <div className="flex items-center p-4 border-b">
                <button onClick={() => navigate(-1)} className="mr-4">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Create Image Ad</h1>
            </div>

            <div className="p-4">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                        <ImageIcon size={20} className="text-green-600" />
                    </div>
                    <div>
                        <h2 className="font-semibold">Image Ad</h2>
                        <p className="text-sm text-gray-600">Static image with text</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2 m-4">
                <label className="block text-sm font-medium text-gray-700">Ad Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter image title"
                />
            </div>

            <div className="space-y-2 m-4">
                <label className="block text-sm font-medium text-gray-700">Ad Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your image ad"
                />
            </div>

            <div className="space-y-2 m-4">
                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {!preview ? (
                        <div>
                            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-2">
                                <ImageIcon size={32} className="text-green-400" />
                            </div>
                            <p className="text-sm text-gray-600 mb-2">JPG, PNG or GIF up to 5MB</p>
                            <label className="cursor-pointer">
                                <span className="px-4 py-2 bg-purple-600 text-white rounded-lg">Select Image</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                    ) : (
                        <div className="relative">
                            <img src={preview} alt="Preview" className="rounded-lg max-h-64 mx-auto" />
                            <button
                                onClick={() => {
                                    setImage(null);
                                    setPreview('');
                                }}
                                className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 rounded-full text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="m-4 space-y-2">
                <h2 className="text-lg font-medium">Set Your Budget</h2>
                <input
                    type="range"
                    min={0}
                    max={5000}
                    value={budget}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        setBudget(value);
                        setManualReach(value*17);
                        setReachManuallyEdited(false);
                    }}
                    className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                    <span>₹0</span>
                    <span>₹5000</span>
                </div>

                <div className="flex space-x-3 pb-6">
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Or manually enter budget</p>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setBudget(value);
                                setManualReach(value*17);
                                setReachManuallyEdited(false);
                            }}
                            placeholder="e.g. 500"
                            className="w-full p-4 bg-gray-100 rounded-lg border"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Or manually enter reach</p>
                        <input
                            type="number"
                            value={manualReach}
                            
                            onChange={(e) => {
                                const val = e.target.value;
                                setManualReach(val);
                                setReachManuallyEdited(true);
                                const num = Number(val);
                                if (!isNaN(num) && num > 0) {
                                    setBudget(Math.round(num / 17));
                                }
                            }}
                            placeholder="e.g. 5000"
                            className="w-full p-4 bg-gray-100 rounded-lg border"
                        />
                    </div>
                </div>

                <div className="p-6 bg-[#f5f0ff] rounded-xl border">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Est. Reach</h3>
                            <p className="text-sm text-gray-500 mt-1">Potential customers</p>
                        </div>
                        <div className="text-right flex items-baseline">
                            <p className="text-[2rem] font-bold text-[#5931fd]">
                                {manualReach.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500 ml-1">users</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-[#f5f0ff] rounded-xl border">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Budget</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[2rem] font-bold text-[#5931fd]">₹{budget}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 p-4 bg-[#fffbea] border border-[#ffeeba] rounded-xl m-4">
                <div className="flex items-start" onClick={() => setAgreeTerms(!agreeTerms)}>
                    <div className={`flex-shrink-0 w-6 h-6 rounded mr-3 cursor-pointer mt-0.5 ${agreeTerms ? 'bg-[#5931fd]' : 'border-2 border-gray-300'}`}>
                        {agreeTerms && <Check size={16} className="text-white mx-auto mt-0.5" />}
                    </div>
                    <div className="flex-1">
                        <label htmlFor="terms" className="text-gray-700 text-sm leading-relaxed cursor-pointer block">
                            I agree to the <span className="text-[#5931fd] font-medium">Sponsored Ads Terms</span> and understand that charges will apply to my account.
                        </label>
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreeTerms}
                            onChange={() => setAgreeTerms(!agreeTerms)}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-20">
                <div className="border-b border-gray-100 py-3 px-4 bg-gray-50">
                    <div className="flex justify-between items-center max-w-lg mx-auto">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            <div className="text-base font-medium text-gray-800">Campaign Ready</div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-3">{manualReach.toLocaleString()} users</span>
                            <div className="text-[#5931fd] font-bold text-xl">₹{budget}</div>
                        </div>
                    </div>
                </div>
                <div className="p-4 max-w-lg mx-auto">
                    <div className="flex gap-3">
                        <button className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium border shadow-sm flex-1">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !agreeTerms}
                            className={`flex-1 py-3.5 px-6 rounded-xl text-white font-medium flex items-center justify-center ${agreeTerms ? 'bg-purple-700 hover:bg-purple-800' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            {loading ? 'Uploading...' : 'Start Promotion'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateImageAds;
