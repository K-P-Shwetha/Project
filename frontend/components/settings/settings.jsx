import axios from "axios";

const DownloadPDF = () => {
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/settings", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Important!
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to download PDF");
    }
  };
  return (
<button onClick={handleDownload} className="download-btn">
  Download Transactions PDF
</button>
  );
};

export default DownloadPDF;
