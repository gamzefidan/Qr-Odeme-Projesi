import { useState } from "react";
import QRScanner from "../components/QRScanner";
import "../styles/Customer.css";

function CustomerPanel() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  function handlePayment() {
    localStorage.setItem("lastPayment", JSON.stringify(paymentData));
    setPaymentSuccess(true);
    setScannerOpen(false);
  }

  return (
    <div className="customer-container">
      <h1 className="customer-title"> Ödeme Yap</h1>

      {paymentSuccess && (
        <div className="payment-success">
          <h2>Ödeme Başarılı</h2>
          <p>{paymentData.amount} TL ödeme alındı.</p>
        </div>
      )}

      {scannerOpen && (
        <div classname="scanner-box">
          <QRScanner
            onDecode={(result) => {
              setScanResult(result);
              setPaymentData(
                typeof result === "string" ? JSON.parse(result) : result
              );
              setScannerOpen(false);
            }}
            onError={(error) => console.error(error)}
          />
        </div>
      )}

      {!paymentSuccess && paymentData && (
        <div className="payment-info">
          <h2>Ödeme Bilgisi</h2>
          <p>
            <strong>İşletme:</strong> {paymentData.merchant}
          </p>
          <p>
            <strong>Tutar:</strong> {paymentData.amount} TL
          </p>
          <p>
            <strong>İşlem ID:</strong> {paymentData.id}
          </p>
          <button className="approve-btn" onClick={handlePayment}>
            Ödemeyi Onayla
          </button>
        </div>
      )}

      {!scannerOpen && !paymentData && !paymentSuccess && (
        <button
          className="open-scanner-btn"
          onClick={() => setScannerOpen(true)}
        >
          QR Tarayıcıyı Aç
        </button>
      )}
    </div>
  );
}

export default CustomerPanel;
