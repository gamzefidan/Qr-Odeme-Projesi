import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import "../styles/Business.css";

export function BusinessPanel() {
  const [amount, setAmount] = useState("");
  const [qrData, setQrData] = useState(null);
  function createPayment() {
    if (!amount) {
      alert("Lütfen bir tutar girin.");
      return;
    }

    const payLoad = {
      id: Date.now(),
      amount: Number(amount),
      merchant: "Çiçek Bahçesi",
    };

    const qrString = JSON.stringify(payLoad);
    setQrData(qrString);

    console.log("QR Kodu Oluşturuldu:", qrString);
  }

  return (
    <div className="business-container">
      <h2 className="business-title">QR ÖDEME</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="TUTAR GİRİNİZ"
        className="business-input"
      />

      <button onClick={createPayment} className="business-button">
        QR OLUŞTUR
      </button>

      {qrData && (
        <div className="qr-card">
          <QRCodeSVG value={qrData} size={150} />
        </div>
      )}
    </div>
  );
}

export default BusinessPanel;
