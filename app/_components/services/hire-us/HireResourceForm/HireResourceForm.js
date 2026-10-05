"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  UploadCloud, 
  X, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Lock,
  Send,
  Check
} from "lucide-react";
import { COUNTRY_DIAL_CODES } from "@/lib/country-phone";

// --- PRESET DATA ---

const REQUIREMENT_TYPES = [
  "Part-Time Resource",
  "Full-Time Resource",
  "Short-Term Resource",
  "Long-Term Resource",
  "Project-Based Resource",
  "Freelance Resource",
  "Dedicated Resource",
  "Dedicated Team",
  "Multiple Resources",
  "Hire an Agency",
];

const RESOURCE_COUNTS = ["1", "2-5", "6-10", "11-20", "20+", "Not Sure"];

const EXPERIENCE_LEVELS = [
  "Entry Level",
  "1-2 Years",
  "2-3 Years",
  "3-5 Years",
  "5-10 Years",
  "10+ Years",
  "Expert / Senior",
  "No Specific",
];

const SERVICES_LIST = [
  "Digital Marketing Expert",
  "Social Media Expert",
  "Google Ads Expert",
  "Meta Ads Expert",
  "SEO Expert",
  "WordPress Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Mobile App Developer",
  "Graphics Designer",
  "Video Editor",
  "3D Video Editor",
  "Call Center Agent",
  "Customer Support Executive",
  "Data Entry / Data Management",
  "Content Writer",
  "Other",
];

const DOCUMENTATION_TYPES = [
  "Project Brief",
  "Business Requirements",
  "Technical Requirements",
  "Business Plan",
  "Scope of Work",
  "Wireframes",
  "UI/UX Designs",
  "Figma Files",
  "Brand Guidelines",
  "Content",
  "Marketing Plan",
  "SEO Reports",
  "Advertising Account Info",
  "Existing Code / Source Files",
  "API Documentation",
  "Database Information",
  "Reference Websites",
  "Reference Applications",
  "Other",
];

const EXISTING_TEAM_ROLES = [
  "Project Lead",
  "Designer",
  "Marketing Team",
  "SEO Team",
  "Sales Team",
  "Customer Support",
  "Project Manager",
  "Other",
];

const COMMUNICATION_METHODS = [
  "Email",
  "WhatsApp",
  "Microsoft Teams",
  "Google Meet",
  "Zoom",
  "Slack",
  "Other",
];

const SPECIAL_REQUIREMENTS = [
  "NDA / Confidentiality",
  "Dedicated Resource",
  "Dedicated Team",
  "Project Manager",
  "Timesheet / Tracking",
  "Daily Reporting",
  "Weekly Reporting",
  "Performance Reporting",
  "Task Management",
  "Quality Assurance",
  "Ongoing Support",
];

const REFERRAL_SOURCES = [
  "Google Search",
  "Google Ads",
  "Social Media",
  "LinkedIn",
  "Referral",
  "Existing Customer",
  "Upwork / Fiverr",
  "Website",
  "Online Directory",
  "Other",
];

const PROJECT_TYPES = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design & Branding",
  "Digital Marketing & Ads",
  "Search Engine Optimization (SEO)",
  "E-Commerce Solutions",
  "Custom Enterprise Software",
  "Cloud & DevOps Engineering",
  "Other",
];

const PROJECT_STATUSES = [
  "Idea / Conceptual Stage",
  "Planning & Architecture",
  "In Active Development",
  "Existing Project (Needs Upgrade/Refactoring)",
  "Ready for Launch / QA Testing",
  "Ongoing Maintenance & Scaling",
];

const INDUSTRIES = [
  "Technology & Software",
  "E-Commerce & Retail",
  "Healthcare & Lifesciences",
  "Finance & FinTech",
  "Real Estate & Property",
  "Education & EdTech",
  "Marketing & Advertising",
  "Logistics & Supply Chain",
  "Travel & Hospitality",
  "Other",
];

const COMPANY_SIZES = [
  "1-10 Employees",
  "11-50 Employees",
  "51-200 Employees",
  "201-500 Employees",
  "500+ Employees",
  "Solo Entrepreneur / Startup",
];

const WORK_ARRANGEMENTS = ["Remote", "On-site", "Hybrid", "Flexible"];

const TIME_ZONES = [
  "Client's Local Time (Matched)",
  "GST / UAE (UTC+4)",
  "EST (UTC-5)",
  "CST (UTC-6)",
  "PST (UTC-8)",
  "GMT / UTC (UTC+0)",
  "CET (UTC+1)",
  "PKT (UTC+5)",
  "IST (UTC+5:30)",
  "SGT (UTC+8)",
  "AEST (UTC+10)",
];

const WORKING_HOURS_OPTIONS = [
  "Full-Time (8 Hours/Day - 40h/week)",
  "Part-Time (4 Hours/Day - 20h/week)",
  "Hourly / Flexible",
  "Custom Schedule",
];

const WORKING_DAYS_OPTIONS = [
  "Monday - Friday",
  "Monday - Saturday",
  "Sunday - Thursday (Middle East Standard)",
  "Flexible / Project Driven",
];

const ENGAGEMENT_DURATIONS = [
  "Less than 1 month",
  "1 - 3 months",
  "3 - 6 months",
  "6 - 12 months",
  "1+ Year",
  "Ongoing / Open-Ended",
];

const BUDGET_TYPES = [
  "Monthly Retainer",
  "Hourly Rate",
  "Fixed Project Budget",
  "Not Decided / Flexible",
];

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "AED", symbol: "AED" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "CAD", symbol: "$" },
  { code: "AUD", symbol: "$" },
  { code: "INR", symbol: "₹" },
  { code: "SAR", symbol: "SAR" },
];

export default function HireResourceForm() {
  // Form state
  const [formData, setFormData] = useState({
    // 1. What Are You Looking For?
    requirementType: "Dedicated Resource",
    // 2. Resource/Service Required
    services: ["Digital Marketing Expert", "Meta Ads Expert", "Full-Stack Developer", "Graphics Designer"],
    otherService: "",
    // 3. Number of Resources
    resourceCount: "1",
    exactResourceCount: "",
    // 4. Experience Level
    experienceLevel: "3-5 Years",
    // 5. Skills & Project Details
    requiredSkills: "",
    keyResponsibilities: "",
    expectedDeliverables: "",
    preferredTools: "",
    // 6. Project Information
    projectName: "",
    projectType: "",
    projectDescription: "",
    projectStatus: "",
    projectUrl: "",
    // 7. Company Information
    companyName: "",
    industry: "",
    companyWebsite: "",
    companySize: "",
    companyLocation: "",
    // 8. Work Arrangement
    workArrangement: "Remote",
    requiredLocation: "",
    arrangementCountry: "United Arab Emirates",
    city: "",
    timeZone: "GST / UAE (UTC+4)",
    // 9. Working Schedule
    workingHours: "Full-Time (8 Hours/Day - 40h/week)",
    workingDays: "Monday - Friday",
    hoursPerDay: "8",
    hoursPerWeek: "40",
    // 10. Engagement Duration
    duration: "3 - 6 months",
    startDate: "",
    endDate: "",
    // 11. Estimated Budget
    budgetType: "Monthly Retainer",
    minBudget: "",
    maxBudget: "",
    currency: "USD",
    // 12. Documentation
    hasDocumentation: "Yes",
    documentationTypes: ["Project Brief", "UI/UX Designs"],
    referenceLinks: "",
    // 13. Existing Team
    hasInternalTeam: "Partially",
    existingTeamRoles: ["Project Lead"],
    otherTeamRole: "",
    needTechSolutionorTeam: "Yes",
    // 14. Communication & Management
    communicationMethods: ["Email", "WhatsApp", "Google Meet"],
    otherCommunication: "",
    meetingFrequency: "Weekly Review",
    teamManager: "Tech Solutionor Project Manager",
    // 15. Additional Requirements
    specialRequirements: ["NDA / Confidentiality", "Weekly Reporting", "Task Management"],
    additionalComments: "",
    // 16. Contact Information (Required *)
    fullName: "",
    jobTitle: "",
    organization: "",
    email: "",
    phone: "",
    whatsapp: "",
    country: "United Arab Emirates",
    preferredContactMethod: "Email",
    bestTimeToContact: "Morning (9 AM - 12 PM)",
    // 17. How did you find us
    referralSources: ["Google Search"],
    otherReferral: "",
    // 18. Confirmation (Required *)
    confirmAccurate: false,
    confirmContact: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [serviceSearch, setServiceSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const filteredServices = useMemo(() => {
    if (!serviceSearch.trim()) return SERVICES_LIST;
    return SERVICES_LIST.filter((s) =>
      s.toLowerCase().includes(serviceSearch.toLowerCase())
    );
  }, [serviceSearch]);

  const handleCheckboxToggle = (field, item) => {
    setFormData((prev) => {
      const list = prev[field] || [];
      if (list.includes(item)) {
        return { ...prev, [field]: list.filter((i) => i !== item) };
      } else {
        return { ...prev, [field]: [...list, item] };
      }
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com)";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const digits = formData.phone.replace(/[^0-9]/g, "");
      if (digits.length < 7 || digits.length > 16) {
        newErrors.phone = "Please enter a valid phone number (7-15 digits)";
      }
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.confirmAccurate) {
      newErrors.confirmAccurate = "Please confirm that the provided information is accurate";
    }

    if (!formData.confirmContact) {
      newErrors.confirmContact = "Please agree to allow Tech Solutionor to contact you";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus?.();
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const selectedServicesText = formData.services.join(", ") + (formData.otherService ? ` (Other: ${formData.otherService})` : "");
      const budgetSummary = `${formData.budgetType}: ${formData.currency} ${formData.minBudget || "N/A"} - ${formData.maxBudget || "N/A"}`;
      
      const compiledMessage = `
--- HIRE RESOURCES SPECIFICATIONS ---
Requirement Type: ${formData.requirementType}
Selected Services: ${selectedServicesText}
Resources Count: ${formData.resourceCount} (Exact: ${formData.exactResourceCount || "N/A"})
Experience Level: ${formData.experienceLevel}
Skills Required: ${formData.requiredSkills || "None specified"}
Key Responsibilities: ${formData.keyResponsibilities || "None specified"}
Deliverables: ${formData.expectedDeliverables || "None specified"}
Tools/Tech: ${formData.preferredTools || "None specified"}

--- PROJECT & COMPANY INFO ---
Project Name: ${formData.projectName || "N/A"} (${formData.projectType || "General"})
Status: ${formData.projectStatus || "N/A"}
URL: ${formData.projectUrl || "N/A"}
Company: ${formData.companyName || "N/A"} | Industry: ${formData.industry || "N/A"} | Size: ${formData.companySize || "N/A"}
Company Website: ${formData.companyWebsite || "N/A"}

--- ARRANGEMENT & SCHEDULE ---
Arrangement: ${formData.workArrangement} in ${formData.city || ""}, ${formData.arrangementCountry || ""} (TZ: ${formData.timeZone})
Schedule: ${formData.workingHours} | ${formData.workingDays} (${formData.hoursPerDay}h/day, ${formData.hoursPerWeek}h/week)
Duration: ${formData.duration} (Start: ${formData.startDate || "Immediate"}, End: ${formData.endDate || "Flexible"})
Budget: ${budgetSummary}

--- TEAM & DOCUMENTATION ---
Documentation: ${formData.hasDocumentation} (${formData.documentationTypes.join(", ")})
Internal Team: ${formData.hasInternalTeam} (${formData.existingTeamRoles.join(", ")})
Tech Solutionor Team Needed: ${formData.needTechSolutionorTeam}
Management: ${formData.teamManager} (Meeting: ${formData.meetingFrequency})
Preferred Communication: ${formData.communicationMethods.join(", ")}
Special Requirements: ${formData.specialRequirements.join(", ")}
Additional Comments: ${formData.additionalComments || "None"}

--- CONTACT DETAILS ---
Name: ${formData.fullName}
Job Title: ${formData.jobTitle || "N/A"}
Organization: ${formData.organization || "N/A"}
Email: ${formData.email}
Phone: ${formData.phone}
WhatsApp: ${formData.whatsapp || "N/A"}
Country: ${formData.country}
Contact Method: ${formData.preferredContactMethod} | Best Time: ${formData.bestTimeToContact}
Found Us Via: ${formData.referralSources.join(", ")}
Attached Files: ${uploadedFiles.map(f => f.name).join(", ") || "None"}
      `.trim();

      const payload = {
        name: formData.fullName,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        country: formData.country,
        jobTitle: formData.jobTitle,
        organization: formData.organization,
        companyName: formData.companyName || formData.organization,
        requirementType: formData.requirementType,
        services: formData.services,
        otherService: formData.otherService,
        resourceCount: formData.resourceCount,
        exactResourceCount: formData.exactResourceCount,
        experienceLevel: formData.experienceLevel,
        requiredSkills: formData.requiredSkills,
        keyResponsibilities: formData.keyResponsibilities,
        expectedDeliverables: formData.expectedDeliverables,
        preferredTools: formData.preferredTools,
        projectName: formData.projectName,
        projectType: formData.projectType,
        projectDescription: formData.projectDescription,
        projectStatus: formData.projectStatus,
        projectUrl: formData.projectUrl,
        industry: formData.industry,
        companyWebsite: formData.companyWebsite,
        companySize: formData.companySize,
        companyLocation: formData.companyLocation,
        workArrangement: formData.workArrangement,
        requiredLocation: formData.requiredLocation,
        city: formData.city,
        arrangementCountry: formData.arrangementCountry,
        timeZone: formData.timeZone,
        workingHours: formData.workingHours,
        workingDays: formData.workingDays,
        hoursPerDay: formData.hoursPerDay,
        hoursPerWeek: formData.hoursPerWeek,
        duration: formData.duration,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budgetType: formData.budgetType,
        minBudget: formData.minBudget,
        maxBudget: formData.maxBudget,
        currency: formData.currency,
        budget: budgetSummary,
        hasDocumentation: formData.hasDocumentation,
        documentationTypes: formData.documentationTypes,
        referenceLinks: formData.referenceLinks,
        hasInternalTeam: formData.hasInternalTeam,
        existingTeamRoles: formData.existingTeamRoles,
        needTechSolutionorTeam: formData.needTechSolutionorTeam,
        teamManager: formData.teamManager,
        meetingFrequency: formData.meetingFrequency,
        communicationMethods: formData.communicationMethods,
        specialRequirements: formData.specialRequirements,
        additionalComments: formData.additionalComments,
        preferredContactMethod: formData.preferredContactMethod,
        bestTimeToContact: formData.bestTimeToContact,
        referralSources: formData.referralSources,
        attachedFilesList: uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
        message: compiledMessage,
        source: "Hire Us Form",
        details: {
          ...formData,
          attachedFilesList: uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
        },
      };

      const res = await fetch("/api/hire-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      const refId = data.entry?.id || `REQ-${Date.now().toString().slice(-6)}`;
      setSubmissionId(refId);
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      alert(`There was a problem submitting your requirement: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setSubmissionId("");
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen text-[#0D0F12]">
      
      {/* ========================================================================= */}
      {/* 1. CLEAN FORM PAGE HEADER (Simple White Background, Standalone Form UI)   */}
      {/* ========================================================================= */}
      <header className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#41B349]/10 text-[#2C9434] text-xs font-semibold uppercase tracking-wider font-jakarta mb-3 border border-[#41B349]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#41B349]" />
              Resource & Talent Intake
            </div>

            <h1 className="font-display uppercase tracking-tight text-3xl sm:text-4xl lg:text-[40px] leading-tight text-[#0D0F12]">
              Hire IT & Digital Marketing <span className="text-[#41B349] italic">Resources</span>
            </h1>

            <p className="mt-2.5 text-sm sm:text-base text-[#4A5568] font-jakarta leading-relaxed max-w-2xl">
              Looking for a skilled professional, multiple resources, a dedicated team or an agency?
              Tell us about your requirements, project, budget, timeline and preferred working arrangement.
              Our team will review your request and get back to you with the best solution.
            </p>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SUCCESS CONFIRMATION VIEW                                                 */}
      {/* ========================================================================= */}
      {submitSuccess && (
        <section className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-[#41B349]/10 text-[#41B349] rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="font-display uppercase tracking-tight text-2xl sm:text-3xl text-[#0D0F12] mb-2.5">
              Requirement Submitted <span className="text-[#41B349] italic">Successfully</span>
            </h2>

            <p className="text-[#4A5568] font-jakarta text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
              Thank you for sharing your project specifications. Our talent acquisition and solutions team has received your requirement.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-8 text-left max-w-md mx-auto font-jakarta text-xs text-[#4A5568] space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-semibold text-gray-600 uppercase tracking-wider text-[11px]">Reference ID</span>
                <span className="font-mono font-bold text-sm text-[#41B349]">#{submissionId}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Contact Name:</span>
                <span className="font-semibold text-[#0D0F12]">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Email:</span>
                <span className="font-semibold text-[#0D0F12]">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Response:</span>
                <span className="font-semibold text-[#41B349]">Within 24 business hours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#41B349] hover:bg-[#36963d] text-white font-jakarta font-semibold text-sm transition-all shadow-sm cursor-pointer"
              >
                Submit Another Requirement
              </button>
              <Link
                href="/"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-jakarta font-semibold text-sm transition-all text-center"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. COHESIVE, STANDALONE FORM LAYOUT                                      */}
      {/* ========================================================================= */}
      {!submitSuccess && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <form onSubmit={handleSubmit} noValidate>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
              
              {/* =================================================================== */}
              {/* LEFT COLUMN: Steps 1, 3, 4, 5, 6, 7, 8, 9, 10, 11                   */}
              {/* =================================================================== */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* 1. What Are You Looking For? */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      1
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        What Are You Looking For?
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Select your requirement type
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {REQUIREMENT_TYPES.map((type) => {
                      const isSelected = formData.requirementType === type;
                      return (
                        <label
                          key={type}
                          onClick={() => handleInputChange("requirementType", type)}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-jakarta font-medium cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold ring-1 ring-[#41B349]/30"
                              : "border-gray-200 bg-white text-[#4A5568] hover:border-gray-300 hover:bg-gray-50/50"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#41B349] bg-[#41B349]"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{type}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Number of Resources Required */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      3
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Number of Resources Required
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Choose estimated team headcount or enter exact number
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                    {RESOURCE_COUNTS.map((count) => {
                      const isSelected = formData.resourceCount === count;
                      return (
                        <label
                          key={count}
                          onClick={() => handleInputChange("resourceCount", count)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs sm:text-sm font-jakarta font-medium cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold ring-1 ring-[#41B349]/30"
                              : "border-gray-200 bg-white text-[#4A5568] hover:border-gray-300 hover:bg-gray-50/50"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#41B349] bg-[#41B349]"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{count}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                      Exact Number <span className="text-gray-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter number"
                      value={formData.exactResourceCount}
                      onChange={(e) => handleInputChange("exactResourceCount", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                    />
                  </div>
                </div>

                {/* 4. Required Experience Level */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      4
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Required Experience Level
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Select preferred seniority or background
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {EXPERIENCE_LEVELS.map((lvl) => {
                      const isSelected = formData.experienceLevel === lvl;
                      return (
                        <label
                          key={lvl}
                          onClick={() => handleInputChange("experienceLevel", lvl)}
                          className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border text-xs sm:text-sm font-jakarta font-medium cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold ring-1 ring-[#41B349]/30"
                              : "border-gray-200 bg-white text-[#4A5568] hover:border-gray-300 hover:bg-gray-50/50"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#41B349] bg-[#41B349]"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="truncate">{lvl}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Skills & Project Details */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      5
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Skills & Project Details
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Provide specific requirements to help us match the right talent
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Required Skills
                      </label>
                      <textarea
                        rows="3"
                        placeholder="e.g. React, Next.js, Photoshop, Google Ads, Python..."
                        value={formData.requiredSkills}
                        onChange={(e) => handleInputChange("requiredSkills", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 p-3 text-xs sm:text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Key Responsibilities
                      </label>
                      <textarea
                        rows="3"
                        placeholder="e.g. Manage social media campaigns, build REST APIs, lead sprints..."
                        value={formData.keyResponsibilities}
                        onChange={(e) => handleInputChange("keyResponsibilities", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 p-3 text-xs sm:text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Expected Deliverables / Targets
                      </label>
                      <textarea
                        rows="3"
                        placeholder="e.g. Increase monthly traffic by 50%, generate 200 leads, launch MVP..."
                        value={formData.expectedDeliverables}
                        onChange={(e) => handleInputChange("expectedDeliverables", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 p-3 text-xs sm:text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Preferred Tools / Technologies
                      </label>
                      <textarea
                        rows="3"
                        placeholder="e.g. WordPress, Figma, Meta Business Suite, Docker, AWS, HubSpot..."
                        value={formData.preferredTools}
                        onChange={(e) => handleInputChange("preferredTools", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 p-3 text-xs sm:text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white resize-y"
                      />
                    </div>
                  </div>
                </div>

                {/* 6. Project Information */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      6
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Project Information
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Tell us about the project scope, background, and goals
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Project Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter project name"
                          value={formData.projectName}
                          onChange={(e) => handleInputChange("projectName", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => handleInputChange("projectType", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          <option value="">Select project type</option>
                          {PROJECT_TYPES.map((pt) => (
                            <option key={pt} value={pt}>{pt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Project Description
                      </label>
                      <textarea
                        rows="3"
                        placeholder="Tell us about your project, current stage, objectives and target audience..."
                        value={formData.projectDescription}
                        onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 p-3 text-xs sm:text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white resize-y"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Current Project Status
                        </label>
                        <select
                          value={formData.projectStatus}
                          onChange={(e) => handleInputChange("projectStatus", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          <option value="">Select status</option>
                          {PROJECT_STATUSES.map((ps) => (
                            <option key={ps} value={ps}>{ps}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Current Website / Application URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://"
                          value={formData.projectUrl}
                          onChange={(e) => handleInputChange("projectUrl", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7. Company / Business Information */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      7
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Company / Business Information
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Tell us about your organization and industry
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter company name"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Business Industry
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => handleInputChange("industry", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          <option value="">Select industry</option>
                          {INDUSTRIES.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Company Website
                        </label>
                        <input
                          type="url"
                          placeholder="https://"
                          value={formData.companyWebsite}
                          onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Company Size
                        </label>
                        <select
                          value={formData.companySize}
                          onChange={(e) => handleInputChange("companySize", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          <option value="">Select company size</option>
                          {COMPANY_SIZES.map((sz) => (
                            <option key={sz} value={sz}>{sz}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Headquarters / Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dubai, London, New York"
                          value={formData.companyLocation}
                          onChange={(e) => handleInputChange("companyLocation", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 8. Work Arrangement */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      8
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Work Arrangement
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Specify how and where your resources will operate
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Working Arrangement
                        </label>
                        <select
                          value={formData.workArrangement}
                          onChange={(e) => handleInputChange("workArrangement", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          {WORK_ARRANGEMENTS.map((wa) => (
                            <option key={wa} value={wa}>{wa}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Required Location
                        </label>
                        <input
                          type="text"
                          placeholder="Enter location"
                          value={formData.requiredLocation}
                          onChange={(e) => handleInputChange("requiredLocation", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Country
                        </label>
                        <select
                          value={formData.arrangementCountry}
                          onChange={(e) => handleInputChange("arrangementCountry", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          {COUNTRY_DIAL_CODES.map((c) => (
                            <option key={c.iso} value={c.name}>
                              {c.flag} {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Time Zone
                        </label>
                        <select
                          value={formData.timeZone}
                          onChange={(e) => handleInputChange("timeZone", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          {TIME_ZONES.map((tz) => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 9. Working Schedule */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      9
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Working Schedule
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Set working days, hours, and weekly commitment
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Working Hours
                        </label>
                        <select
                          value={formData.workingHours}
                          onChange={(e) => handleInputChange("workingHours", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          {WORKING_HOURS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Working Days
                        </label>
                        <select
                          value={formData.workingDays}
                          onChange={(e) => handleInputChange("workingDays", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          {WORKING_DAYS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Expected Hours Per Day
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 8"
                          value={formData.hoursPerDay}
                          onChange={(e) => handleInputChange("hoursPerDay", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Expected Hours Per Week
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 40"
                          value={formData.hoursPerWeek}
                          onChange={(e) => handleInputChange("hoursPerWeek", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 10. Engagement Duration */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      10
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Engagement Duration
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Planned timeline and onboarding start date
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Duration
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                      >
                        {ENGAGEMENT_DURATIONS.map((dur) => (
                          <option key={dur} value={dur}>{dur}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        End Date <span className="text-gray-400 font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 11. Estimated Budget */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      11
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Estimated Budget
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Share your budget parameters so we can tailor the right proposal
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Budget Type
                      </label>
                      <select
                        value={formData.budgetType}
                        onChange={(e) => handleInputChange("budgetType", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-2.5 py-2 text-xs text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                      >
                        {BUDGET_TYPES.map((bt) => (
                          <option key={bt} value={bt}>{bt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Minimum Budget
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 1000"
                        value={formData.minBudget}
                        onChange={(e) => handleInputChange("minBudget", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Maximum Budget
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 5000"
                        value={formData.maxBudget}
                        onChange={(e) => handleInputChange("maxBudget", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Currency
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) => handleInputChange("currency", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                      >
                        {CURRENCIES.map((cur) => (
                          <option key={cur.code} value={cur.code}>
                            {cur.code} ({cur.symbol})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* =================================================================== */}
              {/* RIGHT COLUMN: Steps 2, 12, 13, 14, 15, 16, 17, 18 + Sidebar          */}
              {/* =================================================================== */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* 2. Resource / Service Required */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      2
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Resource / Service Required
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Select one or more services
                      </p>
                    </div>
                  </div>

                  {/* Search Bar for services */}
                  <div className="relative mb-3.5">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search for a service..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 pl-9 pr-3.5 py-2 text-xs font-jakarta text-[#0D0F12] placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-gray-50/50"
                    />
                  </div>

                  {/* Service Checkboxes in 2 balanced columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                    {filteredServices.map((svc) => {
                      const isChecked = formData.services.includes(svc);
                      return (
                        <label
                          key={svc}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-jakarta cursor-pointer transition-all ${
                            isChecked
                              ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold"
                              : "border-gray-100 hover:bg-gray-50 text-[#4A5568]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxToggle("services", svc)}
                            className="w-3.5 h-3.5 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer"
                          />
                          <span className="select-none">{svc}</span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Other Requirement subfield */}
                  <div className="mt-3.5 pt-3.5 border-t border-gray-100">
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                      Other Requirement
                    </label>
                    <input
                      type="text"
                      placeholder="Please specify..."
                      value={formData.otherService}
                      onChange={(e) => handleInputChange("otherService", e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-jakarta text-[#0D0F12] placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                    />
                  </div>
                </div>

                {/* 12. Available Documentation & Resources */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      12
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Available Documentation & Resources
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Share any existing briefs, wireframes, or reference materials
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Do you have documentation? */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta">
                        Do you have documentation?
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {["Yes", "No", "Some Documents"].map((opt) => {
                          const isSel = formData.hasDocumentation === opt;
                          return (
                            <label
                              key={opt}
                              onClick={() => handleInputChange("hasDocumentation", opt)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-jakarta cursor-pointer transition-all ${
                                isSel
                                  ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold"
                                  : "border-gray-200 bg-white text-[#4A5568] hover:border-gray-300"
                              }`}
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  isSel ? "border-[#41B349] bg-[#41B349]" : "border-gray-300"
                                }`}
                              >
                                {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Documentation Type (checkboxes) */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta">
                        Documentation Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                        {DOCUMENTATION_TYPES.map((dt) => {
                          const isChecked = formData.documentationTypes.includes(dt);
                          return (
                            <label
                              key={dt}
                              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-jakarta cursor-pointer transition-all ${
                                isChecked
                                  ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold"
                                  : "border-transparent hover:bg-gray-50 text-[#4A5568]"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxToggle("documentationTypes", dt)}
                                className="w-3.5 h-3.5 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer"
                              />
                              <span className="select-none truncate">{dt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Upload Files dropzone */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Upload Files
                      </label>
                      <label className="border-2 border-dashed border-gray-200 hover:border-[#41B349] rounded-xl p-4 text-center cursor-pointer bg-gray-50/50 hover:bg-[#41B349]/5 transition-all flex flex-col items-center justify-center">
                        <UploadCloud className="w-6 h-6 text-[#41B349] mb-1.5" />
                        <span className="text-xs sm:text-sm font-semibold font-jakarta text-[#0D0F12]">
                          Drag & drop files here or click to upload
                        </span>
                        <span className="text-[11px] text-gray-500 mt-0.5 font-jakarta">
                          Supports: PDF, DOC, DOCX, PPT, XLS, ZIP, JPG, PNG (Max 10MB)
                        </span>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png"
                          className="hidden"
                        />
                      </label>

                      {/* Uploaded File Previews */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                          {uploadedFiles.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-jakarta"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <FileText className="w-3.5 h-3.5 text-[#41B349] shrink-0" />
                                <span className="font-medium text-[#0D0F12] truncate">{file.name}</span>
                                <span className="text-gray-500 text-[10px]">
                                  ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Additional Reference Links */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Additional Reference Links
                      </label>
                      <input
                        type="text"
                        placeholder="Enter URLs (e.g. Figma links, Google Drive, GitHub)..."
                        value={formData.referenceLinks}
                        onChange={(e) => handleInputChange("referenceLinks", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 13. Existing Resources & Team */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      13
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Existing Resources & Team
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Tell us about your internal capabilities
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta">
                        Do you have an internal team?
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {["Yes", "No", "Partially"].map((opt) => {
                          const isSel = formData.hasInternalTeam === opt;
                          return (
                            <label
                              key={opt}
                              onClick={() => handleInputChange("hasInternalTeam", opt)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-jakarta cursor-pointer transition-all ${
                                isSel
                                  ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold"
                                  : "border-gray-200 bg-white text-[#4A5568] hover:border-gray-300"
                              }`}
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  isSel ? "border-[#41B349] bg-[#41B349]" : "border-gray-300"
                                }`}
                              >
                                {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta">
                        Existing Team / Resources
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {EXISTING_TEAM_ROLES.map((role) => {
                          const isChecked = formData.existingTeamRoles.includes(role);
                          return (
                            <label
                              key={role}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-jakarta cursor-pointer transition-all ${
                                isChecked
                                  ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold"
                                  : "border-gray-100 hover:bg-gray-50 text-[#4A5568]"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxToggle("existingTeamRoles", role)}
                                className="w-3.5 h-3.5 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer"
                              />
                              <span className="select-none">{role}</span>
                            </label>
                          );
                        })}
                      </div>

                      {formData.existingTeamRoles.includes("Other") && (
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Please specify other roles..."
                            value={formData.otherTeamRole}
                            onChange={(e) => handleInputChange("otherTeamRole", e.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-jakarta text-[#0D0F12] placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta">
                        Need Tech Solutionor Team?
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {["Yes", "No", "Maybe"].map((opt) => {
                          const isSel = formData.needTechSolutionorTeam === opt;
                          return (
                            <label
                              key={opt}
                              onClick={() => handleInputChange("needTechSolutionorTeam", opt)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-jakarta cursor-pointer transition-all ${
                                isSel
                                  ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold"
                                  : "border-gray-200 bg-white text-[#4A5568] hover:border-gray-300"
                              }`}
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  isSel ? "border-[#41B349] bg-[#41B349]" : "border-gray-300"
                                }`}
                              >
                                {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 14. Communication & Management */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      14
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Communication & Management
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Preferred collaboration channels and project supervision
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta">
                        Preferred Communication Method
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {COMMUNICATION_METHODS.map((m) => {
                          const isChecked = formData.communicationMethods.includes(m);
                          return (
                            <label
                              key={m}
                              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-jakarta cursor-pointer transition-all ${
                                isChecked
                                  ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold"
                                  : "border-gray-100 hover:bg-gray-50 text-[#4A5568]"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxToggle("communicationMethods", m)}
                                className="w-3.5 h-3.5 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer"
                              />
                              <span className="select-none truncate">{m}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Meeting Frequency
                        </label>
                        <select
                          value={formData.meetingFrequency}
                          onChange={(e) => handleInputChange("meetingFrequency", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          <option value="Daily Standup">Daily Standup</option>
                          <option value="2-3 Times / Week">2-3 Times / Week</option>
                          <option value="Weekly Review">Weekly Review</option>
                          <option value="Bi-Weekly">Bi-Weekly</option>
                          <option value="As Needed">As Needed</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Who will manage the team?
                        </label>
                        <select
                          value={formData.teamManager}
                          onChange={(e) => handleInputChange("teamManager", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          <option value="Client (I will manage)">Client (I will manage)</option>
                          <option value="Tech Solutionor Project Manager">Tech Solutionor Project Manager</option>
                          <option value="Dedicated Scrum Master">Dedicated Scrum Master</option>
                          <option value="Shared Management">Shared Management</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 15. Additional Requirements */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      15
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Additional Requirements
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Governance, security, and project tracking preferences
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta">
                        Special Requirements
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {SPECIAL_REQUIREMENTS.map((req) => {
                          const isChecked = formData.specialRequirements.includes(req);
                          return (
                            <label
                              key={req}
                              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-jakarta cursor-pointer transition-all ${
                                isChecked
                                  ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold"
                                  : "border-gray-100 hover:bg-gray-50 text-[#4A5568]"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxToggle("specialRequirements", req)}
                                className="w-3.5 h-3.5 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer"
                              />
                              <span className="select-none truncate">{req}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Additional Comments
                      </label>
                      <textarea
                        rows="3"
                        placeholder="Any other details, custom tooling requirements, security standards..."
                        value={formData.additionalComments}
                        onChange={(e) => handleInputChange("additionalComments", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 p-3 text-xs sm:text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white resize-y"
                      />
                    </div>
                  </div>
                </div>

                {/* 16. Contact Information (REQUIRED SECTION *) */}
                <div 
                  id="section-contact-info"
                  className={`bg-white rounded-2xl border ${
                    errors.fullName || errors.email || errors.phone || errors.country
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-gray-300 shadow-sm"
                  } p-5 sm:p-6 transition-all relative overflow-hidden`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#41B349] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        16
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                            Contact Information
                          </h2>
                          <span className="text-red-500 font-bold">*</span>
                        </div>
                        <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                          Please provide accurate details so our team can reach out
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#41B349]/10 text-[#2C9434] text-[11px] font-semibold uppercase tracking-wider font-jakarta">
                      Required *
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {/* Row 1: Full Name * & Job Title */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Full Name <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          id="field-fullName"
                          type="text"
                          placeholder="Enter your name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className={`w-full rounded-xl border ${
                            errors.fullName ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                          } px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" /> {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Job Title <span className="text-gray-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter job title"
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>
                    </div>

                    {/* Row 2: Company/Organization & Email Address * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Company / Organization <span className="text-gray-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter company name"
                          value={formData.organization}
                          onChange={(e) => handleInputChange("organization", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Email Address <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          id="field-email"
                          type="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`w-full rounded-xl border ${
                            errors.email ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                          } px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Phone Number * & WhatsApp Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Phone Number <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          id="field-phone"
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={`w-full rounded-xl border ${
                            errors.phone ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                          } px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          WhatsApp Number <span className="text-gray-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={formData.whatsapp}
                          onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                        />
                      </div>
                    </div>

                    {/* Row 4: Country * & Preferred Contact Method & Best Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Country <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          id="field-country"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          className={`w-full rounded-xl border ${
                            errors.country ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                          } px-3 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer`}
                        >
                          <option value="">Select country</option>
                          {COUNTRY_DIAL_CODES.map((c) => (
                            <option key={c.iso} value={c.name}>
                              {c.flag} {c.name} ({c.code})
                            </option>
                          ))}
                        </select>
                        {errors.country && (
                          <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" /> {errors.country}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Preferred Method
                        </label>
                        <select
                          value={formData.preferredContactMethod}
                          onChange={(e) => handleInputChange("preferredContactMethod", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          <option value="Email">Email</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Phone Call">Phone Call</option>
                          <option value="Video Meeting">Video Meeting</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Best Time to Contact
                        </label>
                        <select
                          value={formData.bestTimeToContact}
                          onChange={(e) => handleInputChange("bestTimeToContact", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer"
                        >
                          <option value="Any Time">Any Time</option>
                          <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                          <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
                          <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 17. How Did You Find Tech Solutionor? */}
                <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      17
                    </div>
                    <div>
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        How Did You Find Tech Solutionor?
                      </h2>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Help us understand which channel connected us
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {REFERRAL_SOURCES.map((src) => {
                      const isChecked = formData.referralSources.includes(src);
                      return (
                        <label
                          key={src}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-jakarta cursor-pointer transition-all ${
                            isChecked
                              ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold"
                              : "border-gray-100 hover:bg-gray-50 text-[#4A5568]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxToggle("referralSources", src)}
                            className="w-3.5 h-3.5 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer"
                          />
                          <span className="select-none truncate">{src}</span>
                        </label>
                      );
                    })}
                  </div>

                  {formData.referralSources.includes("Other") && (
                    <div className="mt-2.5">
                      <input
                        type="text"
                        placeholder="Please specify..."
                        value={formData.otherReferral}
                        onChange={(e) => handleInputChange("otherReferral", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-1.5 text-xs font-jakarta text-[#0D0F12] placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                      />
                    </div>
                  )}
                </div>

                {/* 18. Final Confirmation & Submit (REQUIRED SECTION *) */}
                <div 
                  id="section-confirmation"
                  className={`bg-white rounded-2xl border ${
                    errors.confirmAccurate || errors.confirmContact
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-gray-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                  } p-5 sm:p-6 transition-all hover:border-gray-300`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#41B349] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      18
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                          Final Confirmation
                        </h2>
                        <span className="text-red-500 font-bold">*</span>
                      </div>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Please review and confirm before submitting your requirements
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {/* Checkbox 1 */}
                    <label 
                      id="field-confirmAccurate"
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={formData.confirmAccurate}
                        onChange={(e) => handleInputChange("confirmAccurate", e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm text-[#4A5568] font-jakarta select-none leading-relaxed group-hover:text-[#0D0F12]">
                        I confirm that the information provided in this form is accurate and complete. <span className="text-red-500 font-bold">*</span>
                      </span>
                    </label>
                    {errors.confirmAccurate && (
                      <p className="text-xs text-red-500 pl-7 font-jakarta flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.confirmAccurate}
                      </p>
                    )}

                    {/* Checkbox 2 */}
                    <label 
                      id="field-confirmContact"
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={formData.confirmContact}
                        onChange={(e) => handleInputChange("confirmContact", e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm text-[#4A5568] font-jakarta select-none leading-relaxed group-hover:text-[#0D0F12]">
                        I agree that Tech Solutionor may contact me regarding my requirement and discuss suitable services, resources, pricing and project solutions. <span className="text-red-500 font-bold">*</span>
                      </span>
                    </label>
                    {errors.confirmContact && (
                      <p className="text-xs text-red-500 pl-7 font-jakarta flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.confirmContact}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-[#41B349] hover:bg-[#36963d] text-white font-jakarta font-semibold text-base py-3.5 sm:py-4 px-8 rounded-xl shadow-sm hover:shadow-md active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Your Requirement...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Your Requirement</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    {/* Privacy Reassurance */}
                    <p className="text-center text-xs text-gray-500 font-jakarta mt-3 flex items-center justify-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-gray-400" />
                      <span>Your information is safe with us. We respect your privacy.</span>
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </form>
        </main>
      )}

      {/* Global CSS for scrollbars inside the form */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
