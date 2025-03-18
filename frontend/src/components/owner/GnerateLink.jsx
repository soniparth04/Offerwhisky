import React from "react";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Correct import
import BackButtonNav from "./BackButton"

const GenerateLink = () => {
    const location = useLocation();
    const ownerId = location.state?.ownerId || "";
    const shopName = location.state?.shopName || "defaultShop"; // Ensure shopName is defined

    const loginLink = `${window.location.origin}/login/${shopName}/${ownerId}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(loginLink);
        alert("Login link copied!");
    };

    const handleDownloadQR = () => {
        const canvas = document.getElementById("qrCode");
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QR_${shopName}_${ownerId}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="container mx-auto ">
            <BackButtonNav />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Generated Login Link</h1>
                <input type="text" value={loginLink} readOnly className="border p-2 mt-4 w-80 text-center" />
                <button onClick={handleCopyLink} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Copy Link
                </button>

                {/* QR Code Section */}
                {ownerId && shopName && (
                    <div className="mt-6 flex flex-col items-center">
                        <QRCodeCanvas id="qrCode" value={loginLink} size={200} />
                        <button
                            onClick={handleDownloadQR}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Download QR Code
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateLink;
