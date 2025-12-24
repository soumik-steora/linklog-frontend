// "use client";
// import { useState, useEffect, FormEvent } from 'react';
// import { Link } from '@/types'; // Import the interface we created

// // Determine API Base URL
// // const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';
// const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';


// export default function Home() {
//   // Strongly type the state variables
//   const [links, setLinks] = useState<Link[]>([]);
//   const [url, setUrl] = useState<string>('');
//   const [remarks, setRemarks] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [fetching, setFetching] = useState<boolean>(true);

//   // 1. Fetch Links on Component Mount
//   useEffect(() => {
//     fetchLinks();
//   }, []);

//   const fetchLinks = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/api/links`);
//       if (!res.ok) throw new Error('Failed to fetch');
//       const data: Link[] = await res.json();
//       setLinks(data);
//     } catch (error) {
//       console.error("Error fetching links:", error);
//     } finally {
//       setFetching(false);
//     }
//   };

//   // 2. Handle Form Submission
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!url) return;

//     setLoading(true);

//     try {
//       const res = await fetch(`${API_BASE}/api/links`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ url, remarks }),
//       });

//       if (res.ok) {
//         const newLink: Link = await res.json();
//         // Optimistic UI Update
//         setLinks([newLink, ...links]);
//         setUrl('');
//         setRemarks('');
//       } else {
//         alert("Failed to save. Check console for details.");
//       }
//     } catch (error) {
//       console.error("Error saving link:", error);
//       alert("Error connecting to backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-4">
//       {/* Header */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-extrabold text-blue-900 mb-2">LinkLog</h1>
//         <p className="text-gray-600">Auto-detect & Store your daily browsing history</p>
//       </div>

//       {/* Input Section */}
//       <div className="bg-white shadow-lg rounded-xl p-6 mb-10 border border-gray-100">
//         <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
//           <div className="flex-grow">
//             <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
//             <input 
//               type="url" 
//               placeholder="https://example.com" 
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               required
//             />
//           </div>
//           <div className="flex-grow md:w-1/3">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
//             <input 
//               type="text" 
//               placeholder="Useful for..." 
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               value={remarks}
//               onChange={(e) => setRemarks(e.target.value)}
//             />
//           </div>
//           <div className="flex items-end">
//             <button 
//               type="submit" 
//               disabled={loading}
//               className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-colors
//                 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
//             >
//               {loading ? 'Processing...' : 'Add Link'}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Data Table Section */}
//       <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold tracking-wider">
//               <tr>
//                 <th className="p-4 border-b">Time</th>
//                 <th className="p-4 border-b">Site Name (Auto)</th>
//                 <th className="p-4 border-b">Remarks</th>
//                 <th className="p-4 border-b text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 text-sm">
//               {fetching ? (
//                 <tr>
//                   <td colSpan={4} className="p-8 text-center text-gray-500">Loading your logs...</td>
//                 </tr>
//               ) : links.length === 0 ? (
//                 <tr>
//                   <td colSpan={4} className="p-8 text-center text-gray-400">No logs yet. Add your first link above!</td>
//                 </tr>
//               ) : (
//                 links.map((link) => (
//                   <tr key={link.id} className="hover:bg-blue-50 transition-colors">
//                     <td className="p-4 text-gray-500 whitespace-nowrap">
//                       {new Date(link.created_at).toLocaleString('en-US', {
//                         month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
//                       })}
//                     </td>
//                     <td className="p-4 font-medium text-gray-900">
//                       {link.site_name || "Unknown Site"}
//                     </td>
//                     <td className="p-4 text-gray-600">
//                       {link.remarks || "-"}
//                     </td>
//                     <td className="p-4 text-center">
//                       <a 
//                         href={link.original_url} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
//                       >
//                         Visit ↗
//                       </a>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

//version 2,0 auto detect link name

// "use client";
// import { useState, useEffect, FormEvent } from 'react';
// import { Link } from '@/types'; 

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// export default function Home() {
//   const [links, setLinks] = useState<Link[]>([]);
  
//   // Form States
//   const [url, setUrl] = useState<string>('');
//   const [siteName, setSiteName] = useState<string>(''); 
//   const [remarks, setRemarks] = useState<string>('');
  
//   // UI States
//   const [loading, setLoading] = useState<boolean>(false); // Saving state
//   const [detecting, setDetecting] = useState<boolean>(false); // Scraping state

//   // Initial Load
//   useEffect(() => {
//     fetchLinks();
//   }, []);

//   const fetchLinks = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/api/links`);
//       const data = await res.json();
//       setLinks(data);
//     } catch (error) { console.error(error); }
//   };

//   // ---------------------------------------------------------
//   // ⚡ AUTO-DETECT LOGIC (Debounced)
//   // ---------------------------------------------------------
//   useEffect(() => {
//     // 1. Don't run if URL is empty
//     if (!url) {
//         setSiteName('');
//         return;
//     }

//     // 2. Set a timer to wait 1000ms (1 second) after typing stops
//     const timer = setTimeout(async () => {
//         // Basic check to see if it looks like a URL
//         if (url.includes('.')) {
//             setDetecting(true);
//             setSiteName("Detecting..."); // UI Feedback

//             try {
//                 const res = await fetch(`${API_BASE}/api/scrape`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ url }),
//                 });
//                 const data = await res.json();
                
//                 // If title found, use it. If not, use "Unknown"
//                 if (data.title && data.title !== "Unknown Site") {
//                     setSiteName(data.title);
//                 } else {
//                     setSiteName("Unknown Site");
//                 }
//             } catch (err) {
//                 setSiteName("Unknown Site");
//             } finally {
//                 setDetecting(false);
//             }
//         }
//     }, 1000);

//     // 3. Cleanup: If user types again before 1s, cancel the previous timer
//     return () => clearTimeout(timer);

//   }, [url]); 
//   // ^ This dependency array means "Run this every time 'url' changes"

//   // ---------------------------------------------------------

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!url) return;
//     setLoading(true);

//     try {
//       const res = await fetch(`${API_BASE}/api/links`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ url, remarks, site_name: siteName }), 
//       });

//       if (res.ok) {
//         const newLink = await res.json();
//         setLinks([newLink, ...links]);
//         // Reset Form
//         setUrl('');
//         setSiteName('');
//         setRemarks('');
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to save.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">LinkLog</h1>

//       <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
//           {/* URL Input */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">URL</label>
//             <input 
//               type="url" 
//               placeholder="Paste link here (e.g. https://github.com)"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//               value={url}
//               onChange={e => setUrl(e.target.value)}
//               required
//             />
//           </div>

//           {/* Site Name (Auto-Filled) */}
//           <div>
//             <div className="flex justify-between mb-1">
//                 <label className="block text-sm font-semibold text-gray-700">Site Name</label>
//                 {/* Visual Indicator for the user */}
//                 {detecting && <span className="text-xs text-blue-500 font-medium animate-pulse">Auto-detecting...</span>}
//             </div>
//             <input 
//               type="text" 
//               placeholder="Will be auto-filled..."
//               className={`w-full border p-3 rounded-lg outline-none transition
//                 ${detecting ? 'bg-gray-50 text-gray-400' : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
//               value={siteName}
//               onChange={e => setSiteName(e.target.value)} // User can still edit it!
//               required
//             />
//           </div>

//           {/* Remarks */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">Remarks</label>
//             <input 
//               type="text" 
//               placeholder="Why are you saving this?"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//               value={remarks}
//               onChange={e => setRemarks(e.target.value)}
//             />
//           </div>

//           <button 
//             type="submit" 
//             disabled={loading || detecting}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition shadow-md"
//           >
//             {loading ? "Saving..." : "Save Link"}
//           </button>
//         </form>
//       </div>

//       {/* List Display */}
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
//          <table className="w-full text-left">
//            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//              <tr>
//                <th className="p-4 font-bold">Site Name</th>
//                <th className="p-4 font-bold">URL</th>
//                <th className="p-4 font-bold">Remarks</th>
//              </tr>
//            </thead>
//            <tbody className="divide-y divide-gray-100">
//              {links.map(link => (
//                <tr key={link.id} className="hover:bg-blue-50 transition">
//                  <td className="p-4 font-medium text-gray-900">{link.site_name}</td>
//                  <td className="p-4 text-blue-600 truncate max-w-xs">
//                     <a href={link.original_url} target="_blank" className="hover:underline">{link.original_url}</a>
//                  </td>
//                  <td className="p-4 text-gray-600">{link.remarks}</td>
//                </tr>
//              ))}
//            </tbody>
//          </table>
//       </div>
//     </div>
//   );
// }


//version 3.0 

// "use client";
// import { useState, useEffect, FormEvent } from 'react';
// import { Link } from '@/types'; 

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// export default function Home() {
//   const [links, setLinks] = useState<Link[]>([]);
  
//   // Form States
//   const [url, setUrl] = useState<string>('');
//   const [siteName, setSiteName] = useState<string>(''); 
//   const [remarks, setRemarks] = useState<string>('');
  
//   // UI States
//   const [loading, setLoading] = useState<boolean>(false);
//   const [detecting, setDetecting] = useState<boolean>(false);

//   // Initial Load
//   useEffect(() => {
//     fetchLinks();
//   }, []);

//   const fetchLinks = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/api/links`);
//       const data = await res.json();
//       setLinks(data);
//     } catch (error) { console.error(error); }
//   };

//   // ---------------------------------------------------------
//   // ⚡ AUTO-DETECT LOGIC (Debounced)
//   // ---------------------------------------------------------
//   useEffect(() => {
//     if (!url) {
//         setSiteName('');
//         return;
//     }

//     const timer = setTimeout(async () => {
//         if (url.includes('.')) {
//             setDetecting(true);
//             setSiteName("Detecting..."); 

//             try {
//                 const res = await fetch(`${API_BASE}/api/scrape`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ url }),
//                 });
//                 const data = await res.json();
                
//                 if (data.title && data.title !== "Unknown Site") {
//                     setSiteName(data.title);
//                 } else {
//                     setSiteName("Unknown Site");
//                 }
//             } catch (err) {
//                 setSiteName("Unknown Site");
//             } finally {
//                 setDetecting(false);
//             }
//         }
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [url]); 

//   // ---------------------------------------------------------

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!url) return;
//     setLoading(true);

//     try {
//       const res = await fetch(`${API_BASE}/api/links`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ url, remarks, site_name: siteName }), 
//       });

//       if (res.ok) {
//         const newLink = await res.json();
//         setLinks([newLink, ...links]);
//         // Reset Form
//         setUrl('');
//         setSiteName('');
//         setRemarks('');
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to save.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">LinkLog</h1>

//       <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
//           {/* URL Input */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">URL</label>
//             <input 
//               type="url" 
//               placeholder="Paste link here..."
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//               value={url}
//               onChange={e => setUrl(e.target.value)}
//               required
//             />
//           </div>

//           {/* Site Name (Auto-Filled) */}
//           <div>
//             <div className="flex justify-between mb-1">
//                 <label className="block text-sm font-semibold text-gray-700">Site Name</label>
//                 {detecting && <span className="text-xs text-blue-500 font-medium animate-pulse">Auto-detecting...</span>}
//             </div>
//             <input 
//               type="text" 
//               placeholder="Will be auto-filled..."
//               className={`w-full border p-3 rounded-lg outline-none transition
//                 ${detecting ? 'bg-gray-50 text-gray-400' : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
//               value={siteName}
//               onChange={e => setSiteName(e.target.value)}
//               required
//             />
//           </div>

//           {/* Remarks */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">Remarks</label>
//             <input 
//               type="text" 
//               placeholder="Why are you saving this?"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//               value={remarks}
//               onChange={e => setRemarks(e.target.value)}
//             />
//           </div>

//           <button 
//             type="submit" 
//             disabled={loading || detecting}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition shadow-md"
//           >
//             {loading ? "Saving..." : "Save Link"}
//           </button>
//         </form>
//       </div>

//       {/* ---------------- UPDATED TABLE SECTION ---------------- */}
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
//          <table className="w-full text-left border-collapse">
//            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//              <tr>
//                <th className="p-4 font-bold border-b">Site Name</th>
//                <th className="p-4 font-bold border-b">Remarks</th>
//                <th className="p-4 font-bold border-b text-center">Action</th>
//              </tr>
//            </thead>
//            <tbody className="divide-y divide-gray-100">
//              {links.map(link => (
//                <tr key={link.id} className="hover:bg-blue-50 transition">
//                  {/* Site Name */}
//                  <td className="p-4 font-medium text-gray-900">{link.site_name}</td>
                 
//                  {/* Remarks */}
//                  <td className="p-4 text-gray-600">{link.remarks || "-"}</td>

//                  {/* Action Button (The new Open Link) */}
//                  <td className="p-4 text-center">
//                     <a 
//                         href={link.original_url} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-sm font-medium transition shadow-sm"
//                     >
//                         Open ↗
//                     </a>
//                  </td>
//                </tr>
//              ))}
//            </tbody>
//          </table>
//       </div>
//     </div>
//   );
// }


//version 4 : 

"use client";
import { useState, useEffect, FormEvent } from 'react';
import { Link } from '@/types'; 

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  
  // Form States
  const [url, setUrl] = useState<string>('');
  const [siteName, setSiteName] = useState<string>(''); 
  const [remarks, setRemarks] = useState<string>('');
  
  // UI States
  const [loading, setLoading] = useState<boolean>(false);
  const [detecting, setDetecting] = useState<boolean>(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/links`);
      const data = await res.json();
      setLinks(data);
    } catch (error) { console.error(error); }
  };

  // ⚡ AUTO-DETECT LOGIC (Debounced)
  useEffect(() => {
    if (!url) {
        setSiteName('');
        return;
    }

    const timer = setTimeout(async () => {
        if (url.includes('.')) {
            setDetecting(true);
            setSiteName("Detecting..."); 

            try {
                const res = await fetch(`${API_BASE}/api/scrape`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url }),
                });
                const data = await res.json();
                
                if (data.title && data.title !== "Unknown Site") {
                    setSiteName(data.title);
                } else {
                    setSiteName("Unknown Site");
                }
            } catch (err) {
                setSiteName("Unknown Site");
            } finally {
                setDetecting(false);
            }
        }
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]); 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, remarks, site_name: siteName }), 
      });

      if (res.ok) {
        const newLink = await res.json();
        setLinks([newLink, ...links]);
        // Reset Form
        setUrl('');
        setSiteName('');
        setRemarks('');
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Soumik's LinkLog</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* URL Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">URL</label>
            <input 
              type="url" 
              placeholder="Paste link here..."
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
            />
          </div>

          {/* Site Name */}
          <div>
            <div className="flex justify-between mb-1">
                <label className="block text-sm font-semibold text-gray-700">Site Name</label>
                {detecting && <span className="text-xs text-blue-500 font-medium animate-pulse">Auto-detecting...</span>}
            </div>
            <input 
              type="text" 
              placeholder="Will be auto-filled..."
              className={`w-full border p-3 rounded-lg outline-none transition
                ${detecting ? 'bg-gray-50 text-gray-400' : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
              value={siteName}
              onChange={e => setSiteName(e.target.value)}
              required
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Remarks</label>
            <input 
              type="text" 
              placeholder="Why are you saving this?"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || detecting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition shadow-md"
          >
            {loading ? "Saving..." : "Save Link"}
          </button>
        </form>
      </div>

      {/* ---------------- UPDATED TABLE (With Date & Time) ---------------- */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
         <table className="w-full text-left border-collapse">
           <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
             <tr>
               <th className="p-4 font-bold border-b">Time</th>
               <th className="p-4 font-bold border-b">Site Name</th>
               <th className="p-4 font-bold border-b">Remarks</th>
               <th className="p-4 font-bold border-b text-center">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
             {links.map(link => (
               <tr key={link.id} className="hover:bg-blue-50 transition">
                 
                 {/* 1. Date & Time Column */}
                 <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                   {new Date(link.created_at).toLocaleString('en-US', {
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit'
                   })}
                 </td>

                 {/* 2. Site Name */}
                 <td className="p-4 font-medium text-gray-900">{link.site_name}</td>
                 
                 {/* 3. Remarks */}
                 <td className="p-4 text-gray-600">{link.remarks || "-"}</td>

                 {/* 4. Action Button */}
                 <td className="p-4 text-center">
                    <a 
                        href={link.original_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-sm font-medium transition shadow-sm"
                    >
                        Open ↗
                    </a>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
      </div>
    </div>
  );
}