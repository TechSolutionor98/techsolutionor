"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCw, X, User, Mail, Phone, MapPin, Calendar, Wrench, Building, MessageSquare, Download } from "lucide-react";

export default function QuotesClient() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
   const [expandedId, setExpandedId] = useState(null);

  const exportToCsv = () => {
    if (quotes.length === 0) {
      alert("No data available to export.");
      return;
    }

    // Define CSV headers
    const headers = ["Name", "Email", "Phone", "Service", "Location", "Property Type", "Details", "Date & Time"];

    // Map each quote to a CSV row
    const rows = quotes.map(quote => {
      const dateTime = new Date(quote.createdAt).toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });

      // Escape quotes and commas in strings
      const escapeCsv = (val) => {
        if (val === undefined || val === null) return '""';
        const str = String(val);
        return `"${str.replace(/"/g, '""')}"`;
      };

      return [
        escapeCsv(`${quote.firstName} ${quote.lastName}`),
        escapeCsv(quote.email),
        escapeCsv(quote.phone),
        escapeCsv(quote.service),
        escapeCsv(quote.location),
        escapeCsv(quote.propertyType),
        escapeCsv(quote.details),
        escapeCsv(dateTime)
      ].join(",");
    });

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Create a blob and download it
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `quote_requests_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchQuotes = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/quote-submissions");
      if (!res.ok) throw new Error("Failed to fetch quotes");
      const data = await res.json();
      setQuotes(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load quote submissions.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Quote Requests</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all quote requests submitted from the website.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportToCsv}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white hover:bg-[var(--secondary)] rounded-md text-sm font-medium transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          
          <button
            onClick={fetchQuotes}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-6 text-red-500 bg-red-50">{error}</div>
      ) : quotes.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          No quote requests found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 table-fixed min-w-[900px]">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 w-40">Name</th>
                <th className="px-6 py-4 w-52">Email</th>
                <th className="px-6 py-4 w-40">Service</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 w-48">Date & Time</th>
                <th className="px-6 py-4 text-right w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50/50 transition">
                  {/* Name */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium truncate" title={`${quote.firstName} ${quote.lastName}`}>
                    {quote.firstName} {quote.lastName}
                  </td>
                  
                  {/* Email */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate" title={quote.email}>
                    {quote.email}
                  </td>
                  
                  {/* Service */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 max-w-full truncate" title={quote.service}>
                      {quote.service}
                    </span>
                  </td>
                  
                  {/* Location */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate" title={quote.location}>
                    {quote.location}
                  </td>

                  {/* Date & Time */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {new Date(quote.createdAt).toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setExpandedId(expandedId === quote.id ? null : quote.id)}
                      className="text-[var(--primary)] hover:text-[#20507C] font-medium text-sm transition"
                    >
                      {expandedId === quote.id ? "Hide Details" : "View Details"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Expanded Detail Modal */}
          {expandedId && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 flex flex-col">
                {quotes.filter(q => q.id === expandedId).map(q => (
                  <div key={`modal-${q.id}`} className="flex flex-col h-full">
                    
                    {/* Modal Header */}
                    <div className="px-8 py-6 border-b border-slate-150 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                      <div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 mb-1 uppercase tracking-wider">
                          Quote Details
                        </span>
                        <h3 className="text-2xl font-black text-slate-900">
                          Request from {q.firstName} {q.lastName}
                        </h3>
                      </div>
                      <button 
                        onClick={() => setExpandedId(null)} 
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
                        aria-label="Close modal"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    {/* Modal Content */}
                    <div className="p-8 space-y-8">
                      
                      {/* Quick Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Service Card */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                            <Wrench className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Service Needed</p>
                            <p className="font-extrabold text-slate-800 text-base">{q.service}</p>
                          </div>
                        </div>

                        {/* Date Card */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                            <Calendar className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Date Submitted</p>
                            <p className="font-extrabold text-slate-800 text-base">
                              {new Date(q.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>

                        {/* Property Type Card */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                            <Building className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Property Type</p>
                            <p className="font-extrabold text-slate-800 text-base capitalize">{q.propertyType || "N/A"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Left: Contact Info */}
                        <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
                          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-500" />
                            Client Information
                          </h4>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400">Full Name</p>
                              <p className="font-semibold text-slate-800">{q.firstName} {q.lastName}</p>
                            </div>
                            
                            <div className="flex items-center gap-2 pt-1">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <div>
                                <p className="text-xs text-slate-400">Email Address</p>
                                <a href={`mailto:${q.email}`} className="text-[var(--primary)] hover:underline font-medium">{q.email}</a>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 pt-1">
                              <Phone className="w-4 h-4 text-slate-400" />
                              <div>
                                <p className="text-xs text-slate-400">Phone Number</p>
                                <a href={`tel:${q.phone}`} className="text-slate-800 hover:text-[var(--primary)] font-medium">{q.phone}</a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Location & Address */}
                        <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
                          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            Location Details
                          </h4>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400">Address / Location</p>
                              <p className="font-medium text-slate-800 leading-relaxed">{q.location}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400">City / Region</p>
                              <p className="font-semibold text-slate-800">Dubai, UAE</p>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Message / Details Section */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-slate-500" />
                          Message / Additional Details
                        </h4>
                        <div className="bg-white border border-slate-200 rounded-xl p-6">
                          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                            {q.details || "No additional message or custom details provided for this request."}
                          </p>
                        </div>
                      </div>
                      
                    </div>

                    {/* Modal Footer */}
                    <div className="px-8 py-5 border-t border-slate-150 flex justify-end gap-3 bg-slate-50/50 rounded-b-2xl">
                      <button
                        onClick={() => setExpandedId(null)}
                        className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-bold transition"
                      >
                        Close
                      </button>
                      <a
                        href={`mailto:${q.email}?subject=Regarding your OsumFix Quote Request for ${q.service}`}
                        className="px-5 py-2.5 bg-[var(--primary)] hover:bg-[var(--secondary)] text-white rounded-lg text-sm font-bold transition flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Reply via Email
                      </a>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
