import { useEffect, useRef } from "react";
import jsQR from "jsqr";

function QRScanner({ onDecode, onError }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function requestPermission() {
      try {
        const permission = await navigator.permissions.query({
          name: "camera",
        });

        if (permission.state === "denied") {
          alert(
            "Kamera izni reddedilmiş. Lütfen tarayıcı ayarlarından kameraya izin verin."
          );
          return;
        }

        startScanner();
      } catch (e) {
        console.warn("Permissions API desteklemiyor, direkt deniyorum.");
        startScanner();
      }
    }

    async function startScanner() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        await videoRef.current.play();

        scanFrame();
      } catch (err) {
        console.error("Kamera açılamadı:", err);
        onError(err);
      }
    }

    function scanFrame() {
      if (!videoRef.current) return;

      const canvas = canvasRef.current.getContext("2d");
      canvasRef.current.height = videoRef.current.videoHeight;
      canvasRef.current.width = videoRef.current.videoWidth;
      canvas.drawImage(videoRef.current, 0, 0);

      const imageData = canvas.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        onDecode(code.data);
      } else {
        requestAnimationFrame(scanFrame);
      }
    }

    requestPermission();
  }, [onDecode, onError]);

  return (
    <div className="scanner-container">
      <video ref={videoRef} className="scanner-video" />
      <canvas ref={canvasRef} className="scanner-canvas" />
      <div className="scanner-overlay">
        <div className="scanner-frame"></div>
        <p className="scanner-text">QR kodu ortalayın</p>
      </div>
    </div>
  );
}

export default QRScanner;
