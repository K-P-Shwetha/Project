import DownloadPDF from '@/components/settings/settings'; // adjust path as needed
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import '../styles/settings.css';
import Logout from '@/components/logout/logout';
export default function Settings() {
  return (
    <div>
       <Navbar />
            <div className="flex">
              <Sidebar />
      <h2>Settings</h2>
      <div className='f'>
      <DownloadPDF />
     <Logout/>
     </div>
      </div>
    </div>
  );
}
