import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import arrow from "../../assets/spinner/arrow.png";
import playbutton from "../../assets/spinner/playbutton.png";
import Navbar from "./Navbar";

Chart.register(ArcElement, ChartDataLabels);

const Spinner = () => {
    const { ownerId , shopName } = useParams(); 
    const [segments, setSegments] = useState([]);
    const [currentOffer, setCurrentOffer] = useState("Spin the wheel!");
    const [showCoupon, setShowCoupon] = useState(false);
    const [wonOffer, setWonOffer] = useState("");
    const wheelRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://offerwhisky.onrender.com/api/user/test-session", { withCredentials: true })
            .then(response => {
                if (!response.data.user) {
                    navigate(`/login/${ownerId}`, { state: { flashMessage: "Please log in first!" } });
                } else {
                    axios.get(`https://offerwhisky.onrender.com/api/user/spinner/${shopName}/${ownerId}`, { withCredentials: true })
                        .then(response => setSegments(response.data))
                        .catch(error => console.error("Error fetching spinner data", error));
                }
            })
            .catch(error => {
                console.error("Error checking session:", error);
                navigate(`/login/${shopName}/${ownerId}`, { state: { flashMessage: "Session check failed. Please log in." } });
            });
    }, [ownerId]);

    const segmentLabels = segments.map(segment => segment.label);
    const segmentColors = ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#8E44AD", "#FF33A1"];

    const data = {
        labels: segmentLabels,
        datasets: [{
            backgroundColor: segmentColors.slice(0, segmentLabels.length),
            data: Array(segmentLabels.length).fill(1),
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: false,
            legend: { display: false },
            datalabels: {
                color: "#000",
                font: { size: 10 }, // 🔹 Decreased font size
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return label.length > 14 ? label.substring(0, 15) + "..." : label; // Truncate long labels
                },
                anchor: "center",
                align: "center",
            }
        }
    };
    
    const handleSpin = () => {
        if (segments.length === 0) return alert("No offers available!");
    
        const totalSegments = segmentLabels.length;
        const segmentAngle = 360 / totalSegments;
        const randomSegmentIndex = Math.floor(Math.random() * totalSegments);
        
        // 🔹 Introduce a random offset (0 to segmentAngle) to land anywhere
        const randomOffset = Math.random() * segmentAngle; 
        const winningAngle = (randomSegmentIndex * segmentAngle) + randomOffset + 1800; 
        
        let startAngle = 0;
        const duration = Math.floor(Math.random() * (8000 - 4000 + 1)) + 4000; 
        console.log(`Spin duration: ${duration}ms`);     
        const startTime = Date.now();
    
        const animateSpin = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easing = (1 - Math.pow(1 - progress, 3)); // Smooth animation
            const currentAngle = startAngle + easing * (winningAngle - startAngle);
    
            if (wheelRef.current) {
                wheelRef.current.style.transform = `rotate(${currentAngle}deg)`;
            }
    
            if (progress < 1) {
                requestAnimationFrame(animateSpin);
            } else {
                setWonOffer(segmentLabels[randomSegmentIndex]);
                setShowCoupon(true);
            }
        };
    
        requestAnimationFrame(animateSpin);
    };

    const handleClaimOffer = async () => {
        try {
            if (!ownerId) {
                console.error("Owner ID is missing!");
                alert("Owner ID is missing. Please use the correct link.");
                return;
            }

            console.log("Sending claim request with:", { ownerId, offerLabel: wonOffer });

            const response = await axios.post(
                `https://offerwhisky.onrender.com/api/user/claim-offer/${ownerId}`, // Use ownerId from useParams
                { offerLabel: wonOffer },
                { withCredentials: true }
            );

            console.log("Offer claimed successfully:", response.data);
            alert(response.data.message);
            setShowCoupon(false);
        } catch (error) {
            console.error("Error claiming offer:", error);
            alert("Failed to claim the offer. Please try again.");
        }
    };



    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-indigo-800 relative">
                <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 text-lg font-bold text-gray-900">
                    {currentOffer}
                </div>
                <div className="relative w-72 h-72 flex items-center justify-center">
                    <img src={arrow} className="rotate-180 h-16 absolute top-[-30px] z-10" />
                    <div ref={wheelRef} className="relative w-full h-full">
                        <Pie data={data} options={options} />
                    </div>
                    <button
                        onClick={handleSpin}
                        className="absolute w-16 h-16  font-bold uppercase rounded-full shadow-lg  transition"
                    >
                        <img src={playbutton}  />
                    </button>
                </div>
                {showCoupon && (
                    <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-bold">Congratulations!</h3>
                        <p className="text-gray-700">You won: {wonOffer}!</p>
                        <button
                            onClick={handleClaimOffer}
                            className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Claim Offer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Spinner;
