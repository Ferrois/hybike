import { useState } from "react";
import QrScanner from "react-qr-scanner";

export function Scanner({handleScan}) {
  const filterScan = (data) => {
    console.log(data)
    if (data) {
      handleScan(data.text)
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="w-100 rounded-md overflow-hidden">
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={(e) => filterScan(e)}
      />
    </div>
  );
}
