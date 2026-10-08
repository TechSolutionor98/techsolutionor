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
  Check,
  ChevronDown,
  Plus
} from "lucide-react";
import {
  COUNTRY_DIAL_CODES,
  findCountry,
  sanitizePhoneDigits,
  validatePhoneNumber,
} from "@/lib/country-phone";
import { SectionBadge, HighlightWord } from "@/components/Typography";

// --- PRESET DATA ---

const REQUIREMENT_TYPES = [
  "Dedicated Resource (Single Specialist)",
  "Dedicated Team (Multiple Specialists)",
  "Team Augmentation / Extension",
  "Project-Based Dedicated Team",
  "Consultation & Advisory Specialist",
  "Freelance / Contract Specialist",
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

const COLUMN_1_SERVICES = [
  "Social Media Expert",
  "Meta Ads Expert",
  "Google Ads Expert",
  "Digital Marketing Expert",
  "SEO Expert",
  "Content Writer",
];

const COLUMN_2_SERVICES = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile App Developer",
  "WordPress Developer",
];

const COLUMN_3_SERVICES = [
  "Graphics Designer",
  "Video Editor",
  "3D Video Editor",
  "Customer Support Executive",
  "Call Center Agent",
  "Data Entry / Data Management",
  "Other",
];

const SERVICES_LIST = [
  ...COLUMN_1_SERVICES,
  ...COLUMN_2_SERVICES,
  ...COLUMN_3_SERVICES,
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
  // Form state - exactly matching the 12 active sections
  const [formData, setFormData] = useState({
    // 1. Resource / Service Required
    services: [],
    otherService: "",
    // 2. Resource Type
    requirementType: "Dedicated Resource (Single Specialist)",
    resourceCount: "1",
    exactResourceCount: "",
    experienceLevel: "3-5 Years",
    // 3. Work Arrangement
    workArrangement: "Remote",
    requiredLocation: "",
    arrangementCountry: "United Arab Emirates",
    city: "",
    timeZone: "GST / UAE (UTC+4)",
    // 4. Working Schedule
    workingHours: "Full-Time (8 Hours/Day - 40h/week)",
    workingDays: "Monday - Friday",
    hoursPerDay: "8",
    hoursPerWeek: "40",
    // 5. Engagement Duration
    duration: "3 - 6 months",
    startDate: "",
    endDate: "",
    // 6. Estimated Budget
    budgetType: "Monthly Retainer",
    minBudget: "",
    maxBudget: "",
    currency: "USD",
    // 7. Existing Resources & Team
    hasInternalTeam: "Partially",
    existingTeamRoles: ["Project Lead"],
    otherTeamRole: "",
    // 8. Communication & Management
    communicationMethods: ["Email", "WhatsApp", "Google Meet"],
    meetingFrequency: "Weekly Review",
    teamManager: "Tech Solutionor Project Manager",
    // 9. Available Documentation & Resources
    hasDocumentation: "No",
    documentationTypes: [],
    referenceLinks: "",
    // 10. Contact Information (Required *)
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    whatsapp: "",
    country: "",
    preferredContactMethod: "Email",
    bestTimeToContact: "Morning (9 AM - 12 PM)",
    // 11. How Did You Find Tech Solutionor?
    referralSources: ["Google Search"],
    otherReferral: "",
    // 12. Final Confirmation (Required *)
    confirmAccurate: false,
    confirmContact: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [docAttachments, setDocAttachments] = useState({});
  const [serviceSearch, setServiceSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");

  const selectedCountryObj = useMemo(() => findCountry(formData.country), [formData.country]);

  const col1Services = useMemo(() => {
    const q = serviceSearch.trim().toLowerCase();
    return q ? COLUMN_1_SERVICES.filter((s) => s.toLowerCase().includes(q)) : COLUMN_1_SERVICES;
  }, [serviceSearch]);

  const col2Services = useMemo(() => {
    const q = serviceSearch.trim().toLowerCase();
    return q ? COLUMN_2_SERVICES.filter((s) => s.toLowerCase().includes(q)) : COLUMN_2_SERVICES;
  }, [serviceSearch]);

  const col3Services = useMemo(() => {
    const q = serviceSearch.trim().toLowerCase();
    return q ? COLUMN_3_SERVICES.filter((s) => s.toLowerCase().includes(q)) : COLUMN_3_SERVICES;
  }, [serviceSearch]);

  const handleCheckboxToggle = (field, item) => {
    setFormData((prev) => {
      const list = prev[field] || [];
      const updated = list.includes(item)
        ? list.filter((i) => i !== item)
        : [...list, item];
      return { ...prev, [field]: updated };
    });
    if (field === "services" && errors.services) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.services;
        return next;
      });
    }
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
    if (field === "otherService" && errors.services && value.trim()) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.services;
        return next;
      });
    }
  };

  // Handle Country selection & adjust phone digits length if necessary (matching GetInTouch)
  const handleCountryChange = (selectedCountry, countryObj) => {
    const countryName =
      typeof selectedCountry === "object" && selectedCountry?.target
        ? selectedCountry.target.value
        : selectedCountry;
    const countryObjResolved = countryObj || findCountry(countryName);

    setFormData((prev) => ({
      ...prev,
      country: countryName,
    }));

    if (countryObjResolved && phoneDigits) {
      setPhoneDigits(sanitizePhoneDigits(phoneDigits, countryObjResolved));
    }

    if (errors.country) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.country;
        return next;
      });
    }
  };

  // Handle Phone input changes with normalization (matching GetInTouch)
  const handlePhoneChange = (e) => {
    const val = e.target.value;
    const sanitized = sanitizePhoneDigits(val, selectedCountryObj);
    setPhoneDigits(sanitized);
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleDocFileChange = (docType, e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const taggedFiles = files.map((f) => {
      f.docType = docType;
      return f;
    });

    setDocAttachments((prev) => ({
      ...prev,
      [docType]: [...(prev[docType] || []), ...taggedFiles],
    }));

    setFormData((prev) => {
      const list = prev.documentationTypes || [];
      if (!list.includes(docType)) {
        return { ...prev, documentationTypes: [...list, docType] };
      }
      return prev;
    });

    setUploadedFiles((prev) => [...prev, ...taggedFiles]);

    e.target.value = "";
  };

  const removeDocFile = (docType, fileIndex) => {
    setDocAttachments((prev) => {
      const currentList = prev[docType] || [];
      const fileToRemove = currentList[fileIndex];
      const updatedList = currentList.filter((_, i) => i !== fileIndex);

      if (fileToRemove) {
        setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== fileToRemove));
      }

      const next = { ...prev };
      if (updatedList.length > 0) {
        next[docType] = updatedList;
      } else {
        delete next[docType];
      }
      return next;
    });
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

    // 1. Resource / Service Required (Essential: admin needs to know what talent/role is needed)
    if (formData.services.length === 0 && !formData.otherService.trim()) {
      newErrors.services = "Please select at least one resource / service or specify your requirement";
    }

    // 2. Resource Specifications (Headcount & seniority)
    if (!formData.requirementType) {
      newErrors.requirementType = "Please select a requirement type";
    }
    if (!formData.resourceCount) {
      newErrors.resourceCount = "Please select number of resources required";
    }
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Please select required experience level";
    }

    // 3. Work Arrangement & 5. Engagement Duration
    if (!formData.workArrangement) {
      newErrors.workArrangement = "Please select a working arrangement";
    }
    if (!formData.duration) {
      newErrors.duration = "Please select an engagement duration";
    }

    // 10. Contact Information (Required *)
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Please select your Country";
    }

    const phoneValidation = validatePhoneNumber(phoneDigits, formData.country);
    if (!phoneValidation.valid) {
      newErrors.phone = phoneValidation.error;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com)";
    }

    // 12. Confirmation (Required *)
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
      const phoneValidation = validatePhoneNumber(phoneDigits, formData.country);
      const fullPhoneNumber = phoneValidation.valid && phoneValidation.formattedPhone
        ? phoneValidation.formattedPhone
        : (selectedCountryObj?.code ? `${selectedCountryObj.code} ${phoneDigits}`.trim() : phoneDigits);

      const selectedServicesText = formData.services.join(", ") + (formData.otherService ? ` (Other: ${formData.otherService})` : "");
      const budgetSummary = `${formData.budgetType}: ${formData.currency} ${formData.minBudget || "N/A"} - ${formData.maxBudget || "N/A"}`;

      const compiledMessage = `
--- HIRE RESOURCES SPECIFICATIONS ---
Requirement Type: ${formData.requirementType}
Selected Services: ${selectedServicesText}
Resources Count: ${formData.resourceCount} (Exact: ${formData.exactResourceCount || "N/A"})
Experience Level: ${formData.experienceLevel}

--- ARRANGEMENT & SCHEDULE ---
Arrangement: ${formData.workArrangement} ${formData.requiredLocation ? `(${formData.requiredLocation})` : ""} (TZ: ${formData.timeZone})
Schedule: ${formData.workingHours} | ${formData.workingDays} (${formData.hoursPerDay}h/day, ${formData.hoursPerWeek}h/week)
Duration: ${formData.duration} (Start: ${formData.startDate || "Immediate"}, End: ${formData.endDate || "Flexible"})
Budget: ${budgetSummary}

--- TEAM & DOCUMENTATION ---
Internal Team: ${formData.hasInternalTeam} (${formData.existingTeamRoles.join(", ")}${formData.otherTeamRole ? ` - Other: ${formData.otherTeamRole}` : ""})
Management: ${formData.teamManager} (Meeting: ${formData.meetingFrequency})
Preferred Communication: ${formData.communicationMethods.join(", ")}
Documentation: ${formData.hasDocumentation} (${formData.documentationTypes.join(", ")})
Reference Links: ${formData.referenceLinks || "None"}

--- CONTACT DETAILS ---
Name: ${formData.fullName}
Job Title: ${formData.jobTitle || "N/A"}
Email: ${formData.email}
Phone: ${fullPhoneNumber}
WhatsApp: ${formData.whatsapp || "N/A"}
Country: ${formData.country}
Contact Method: ${formData.preferredContactMethod} | Best Time: ${formData.bestTimeToContact}
Found Us Via: ${formData.referralSources.join(", ")}${formData.otherReferral ? ` (Other: ${formData.otherReferral})` : ""}
Attached Files: ${uploadedFiles.map(f => f.docType ? `${f.name} [${f.docType}]` : f.name).join(", ") || "None"}
      `.trim();

      const payload = {
        name: formData.fullName,
        fullName: formData.fullName,
        email: formData.email,
        phone: fullPhoneNumber,
        whatsapp: formData.whatsapp,
        country: formData.country,
        jobTitle: formData.jobTitle,
        requirementType: formData.requirementType,
        services: formData.services,
        otherService: formData.otherService,
        resourceCount: formData.resourceCount,
        exactResourceCount: formData.exactResourceCount,
        experienceLevel: formData.experienceLevel,
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
        otherTeamRole: formData.otherTeamRole,
        teamManager: formData.teamManager,
        meetingFrequency: formData.meetingFrequency,
        communicationMethods: formData.communicationMethods,
        preferredContactMethod: formData.preferredContactMethod,
        bestTimeToContact: formData.bestTimeToContact,
        referralSources: formData.referralSources,
        otherReferral: formData.otherReferral,
        confirmAccurate: formData.confirmAccurate,
        confirmContact: formData.confirmContact,
        attachedFilesList: uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type, docType: f.docType || "General" })),
        message: compiledMessage,
        source: "Hire Us Form",
        details: {
          ...formData,
          phone: fullPhoneNumber,
          attachedFilesList: uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type, docType: f.docType || "General" })),
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
    setDocAttachments({});
    setUploadedFiles([]);
    setPhoneDigits("");
    setFormData((prev) => ({
      ...prev,
      phone: "",
      country: "",
    }));
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen text-[#0D0F12]">

      {/* ========================================================================= */}
      {/* 1. CLEAN FORM PAGE HEADER (Home Hero Style & Typography, Centered)        */}
      {/* ========================================================================= */}
      <header className="w-full bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <div className="mb-3.5 sm:mb-4">
              <SectionBadge variant="light">
                Resource & Talent Intake
              </SectionBadge>
            </div>

            <h1 className="font-display uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] leading-[1.08] sm:leading-[1.02] text-[#0D0F12] text-center">
              Hire IT & Digital Marketing <HighlightWord>Resources</HighlightWord>
            </h1>

            <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-[17px] text-[#4A5568] font-jakarta leading-relaxed max-w-2xl mx-auto text-center font-normal sm:font-medium tracking-[-0.01em]">
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
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <form onSubmit={handleSubmit} noValidate>

            {/* Unified Single Bordered Container for Entire Form */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 sm:p-10 lg:p-12 divide-y divide-gray-100">

              {/* =================================================================== */}
              {/* 1. RESOURCE / SERVICE REQUIRED                                      */}
              {/* =================================================================== */}
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      1
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                          Resource / Service Required
                        </h2>
                        <span className="text-red-500 font-bold">*</span>
                      </div>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Select one or more services
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#41B349]/10 text-[#2C9434] text-[11px] font-semibold uppercase tracking-wider font-jakarta">
                    Required *
                  </span>
                </div>

                <div id="field-services" className="space-y-3.5">
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

                  {/* Service Checkboxes in 3 columns without any extra titles or boxes */}
                  <div className={`grid grid-cols-1 md:grid-cols-3 gap-2.5 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar p-1 rounded-xl transition-all ${errors.services ? "border border-red-300 bg-red-50/10" : ""
                    }`}>
                    {/* Column 1: Social Media-related options */}
                    <div className="flex flex-col gap-2">
                      {col1Services.map((svc) => {
                        const isChecked = formData.services.includes(svc);
                        return (
                          <label
                            key={svc}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-jakarta cursor-pointer transition-all ${isChecked
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

                    {/* Column 2: Development-related options */}
                    <div className="flex flex-col gap-2">
                      {col2Services.map((svc) => {
                        const isChecked = formData.services.includes(svc);
                        return (
                          <label
                            key={svc}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-jakarta cursor-pointer transition-all ${isChecked
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

                    {/* Column 3: Remaining related options */}
                    <div className="flex flex-col gap-2">
                      {col3Services.map((svc) => {
                        const isChecked = formData.services.includes(svc);
                        return (
                          <label
                            key={svc}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-jakarta cursor-pointer transition-all ${isChecked
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
                  </div>
                  {errors.services && (
                    <p className="text-xs text-red-500 mt-2 font-jakarta flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.services}
                    </p>
                  )}

                  {/* Other Requirement subfield */}
                  <div className="mt-3.5 pt-3.5 border-t border-gray-100">
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                      Other Requirement <span className="text-gray-400 font-normal lowercase">(if not listed above)</span>
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
              </div>

              {/* =================================================================== */}
              {/* 2. RESOURCE TYPE                                                    */}
              {/* =================================================================== */}
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                      2
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                          Resource Type
                        </h2>
                        <span className="text-red-500 font-bold">*</span>
                      </div>
                      <p className="font-jakarta text-xs text-[#4A5568] mt-0.5">
                        Specify your requirement type, number of resources, and required experience level
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#41B349]/10 text-[#2C9434] text-[11px] font-semibold uppercase tracking-wider font-jakarta">
                    Required *
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Resource Type */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta min-h-[32px] flex items-end">
                      Resource Type <span className="text-red-500 font-bold ml-1">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="field-requirementType"
                        value={formData.requirementType}
                        onChange={(e) => handleInputChange("requirementType", e.target.value)}
                        className={`w-full rounded-xl border ${errors.requirementType ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                          } pl-3.5 pr-8 py-2.5 text-xs sm:text-sm text-[#0D0F12] font-jakarta focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer appearance-none shadow-sm hover:border-gray-300`}
                      >
                        <option value="">Select requirement type</option>
                        {REQUIREMENT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.requirementType && (
                      <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.requirementType}
                      </p>
                    )}
                  </div>

                  {/* Number of Resources Required */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta min-h-[32px] flex items-end">
                      Number of Resources Required <span className="text-red-500 font-bold ml-1">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="field-resourceCount"
                        value={formData.resourceCount}
                        onChange={(e) => handleInputChange("resourceCount", e.target.value)}
                        className={`w-full rounded-xl border ${errors.resourceCount ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                          } pl-3.5 pr-8 py-2.5 text-xs sm:text-sm text-[#0D0F12] font-jakarta focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer appearance-none shadow-sm hover:border-gray-300`}
                      >
                        <option value="">Select resource count</option>
                        {RESOURCE_COUNTS.map((count) => (
                          <option key={count} value={count}>
                            {count === "1" ? "1 Resource" : count === "Not Sure" ? "Not Sure" : `${count} Resources`}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.resourceCount && (
                      <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.resourceCount}
                      </p>
                    )}
                  </div>

                  {/* Required Experience Level */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta min-h-[32px] flex items-end">
                      Required Experience Level <span className="text-red-500 font-bold ml-1">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="field-experienceLevel"
                        value={formData.experienceLevel}
                        onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                        className={`w-full rounded-xl border ${errors.experienceLevel ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                          } pl-3.5 pr-8 py-2.5 text-xs sm:text-sm text-[#0D0F12] font-jakarta focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer appearance-none shadow-sm hover:border-gray-300`}
                      >
                        <option value="">Select experience level</option>
                        {EXPERIENCE_LEVELS.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.experienceLevel && (
                      <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.experienceLevel}
                      </p>
                    )}
                  </div>
                </div>

                {formData.resourceCount === "20+" && (
                  <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center gap-3">
                    <label className="text-xs font-semibold text-gray-700 font-jakarta shrink-0">
                      Exact Headcount <span className="text-gray-400 font-normal lowercase">(optional)</span>:
                    </label>
                    <input
                      type="number"
                      min="20"
                      placeholder="e.g. 25"
                      value={formData.exactResourceCount}
                      onChange={(e) => handleInputChange("exactResourceCount", e.target.value)}
                      className="w-32 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                    />
                  </div>
                )}
              </div>

              {/* =================================================================== */}
              {/* 3. WORK ARRANGEMENT                                                 */}
              {/* =================================================================== */}
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                    3
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                      Working Arrangement <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="field-workArrangement"
                        value={formData.workArrangement}
                        onChange={(e) => handleInputChange("workArrangement", e.target.value)}
                        className={`w-full rounded-xl border ${errors.workArrangement ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                          } pl-3.5 pr-8 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer appearance-none shadow-sm hover:border-gray-300`}
                      >
                        <option value="">Select arrangement</option>
                        {WORK_ARRANGEMENTS.map((wa) => (
                          <option key={wa} value={wa}>{wa}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.workArrangement && (
                      <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.workArrangement}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                      Preferred Time Zone
                    </label>
                    <div className="relative">
                      <select
                        value={formData.timeZone}
                        onChange={(e) => handleInputChange("timeZone", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 pl-3.5 pr-8 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer appearance-none shadow-sm hover:border-gray-300"
                      >
                        {TIME_ZONES.map((tz) => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                      On-Site Location / City <span className="text-gray-400 font-normal lowercase">(if on-site/hybrid)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dubai Office or City"
                      value={formData.requiredLocation}
                      onChange={(e) => {
                        handleInputChange("requiredLocation", e.target.value);
                        handleInputChange("city", e.target.value);
                      }}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* =================================================================== */}
              {/* 4. WORKING SCHEDULE                                                 */}
              {/* =================================================================== */}
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                    4
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

              {/* =================================================================== */}
              {/* 5. ENGAGEMENT DURATION                                              */}
              {/* =================================================================== */}
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                    5
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
                      Duration <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="field-duration"
                        value={formData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        className={`w-full rounded-xl border ${errors.duration ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                          } pl-3.5 pr-8 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer appearance-none shadow-sm hover:border-gray-300`}
                      >
                        <option value="">Select duration</option>
                        {ENGAGEMENT_DURATIONS.map((dur) => (
                          <option key={dur} value={dur}>{dur}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.duration && (
                      <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors.duration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                      Start Date <span className="text-gray-400 font-normal lowercase">(optional)</span>
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

              {/* =================================================================== */}
              {/* 6. ESTIMATED BUDGET                                                 */}
              {/* =================================================================== */}
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                    6
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

              {/* =================================================================== */}
              {/* 7. EXISTING RESOURCES & TEAM                                        */}
              {/* =================================================================== */}
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                    7
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
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-jakarta cursor-pointer transition-all ${isSel
                                ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold"
                                : "border-gray-200 bg-white text-[#4A5568] hover:border-gray-300"
                              }`}
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSel ? "border-[#41B349] bg-[#41B349]" : "border-gray-300"
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {EXISTING_TEAM_ROLES.map((role) => {
                        const isChecked = formData.existingTeamRoles.includes(role);
                        return (
                          <label
                            key={role}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-jakarta cursor-pointer transition-all ${isChecked
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
                </div>
              </div>

              {/* =================================================================== */}
              {/* 8. COMMUNICATION & MANAGEMENT                                       */}
              {/* =================================================================== */}
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                    8
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                      {COMMUNICATION_METHODS.map((m) => {
                        const isChecked = formData.communicationMethods.includes(m);
                        return (
                          <label
                            key={m}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-jakarta cursor-pointer transition-all ${isChecked
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

              {/* =================================================================== */}
              {/* 9. AVAILABLE DOCUMENTATION & RESOURCES                              */}
              {/* =================================================================== */}
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                    9
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
                  {/* Do you have documentation? (Yes / No only) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-jakarta">
                      Do you have documentation?
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {["Yes", "No"].map((opt) => {
                        const isSel = formData.hasDocumentation === opt;
                        return (
                          <label
                            key={opt}
                            onClick={() => handleInputChange("hasDocumentation", opt)}
                            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-jakarta cursor-pointer transition-all ${isSel
                                ? "border-[#41B349] bg-[#41B349]/5 text-[#0D0F12] font-semibold ring-1 ring-[#41B349]/30"
                                : "border-gray-200 bg-white text-[#4A5568] hover:border-gray-300 hover:bg-gray-50/50"
                              }`}
                          >
                            <div
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSel ? "border-[#41B349] bg-[#41B349]" : "border-gray-300"
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

                  {/* Documentation Type Attachment Interface */}
                  {formData.hasDocumentation === "Yes" ? (
                    <div className="space-y-4 pt-1">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-semibold text-gray-700 font-jakarta">
                            Documentation Types & Specific Attachments
                          </label>
                          <span className="text-[11px] text-[#4A5568] font-jakarta">
                            Click <strong className="text-[#41B349] font-bold">+</strong> to attach files
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1.5 custom-scrollbar">
                          {DOCUMENTATION_TYPES.map((dt) => {
                            const docFiles = docAttachments[dt] || [];
                            const hasFiles = docFiles.length > 0;
                            const isChecked = formData.documentationTypes.includes(dt);

                            return (
                              <div
                                key={dt}
                                className={`p-2.5 rounded-xl border transition-all ${hasFiles || isChecked
                                    ? "border-[#41B349]/40 bg-[#41B349]/[0.02]"
                                    : "border-gray-200/90 bg-white hover:border-gray-300"
                                  }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <label className="flex items-center gap-2.5 cursor-pointer min-w-0 flex-1 select-none">
                                    <input
                                      type="checkbox"
                                      checked={isChecked || hasFiles}
                                      onChange={() => handleCheckboxToggle("documentationTypes", dt)}
                                      className="w-4 h-4 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer shrink-0"
                                    />
                                    <span
                                      className={`text-xs font-jakarta truncate ${hasFiles || isChecked
                                          ? "font-semibold text-[#0D0F12]"
                                          : "text-[#4A5568]"
                                        }`}
                                    >
                                      {dt}
                                    </span>
                                  </label>

                                  {/* "+" Button to attach document for this specific type */}
                                  <label
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-jakarta font-medium bg-gray-50 hover:bg-[#41B349] text-[#4A5568] hover:text-white border border-gray-200 hover:border-[#41B349] transition-all cursor-pointer shrink-0 group shadow-2xs"
                                    title={`Attach document for ${dt}`}
                                  >
                                    <Plus className="w-3.5 h-3.5 text-[#41B349] group-hover:text-white transition-colors" />
                                    <span className="text-[11px] font-semibold">Attach</span>
                                    <input
                                      type="file"
                                      multiple
                                      className="hidden"
                                      onChange={(e) => handleDocFileChange(dt, e)}
                                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png,.fig"
                                    />
                                  </label>
                                </div>

                                {/* Uploaded Document(s) associated with this specific item */}
                                {hasFiles && (
                                  <div className="mt-2 pt-2 border-t border-gray-100 space-y-1.5">
                                    {docFiles.map((file, fIdx) => (
                                      <div
                                        key={fIdx}
                                        className="flex items-center justify-between px-2.5 py-1.5 bg-gray-50/80 border border-gray-200/90 rounded-lg text-xs font-jakarta"
                                      >
                                        <div className="flex items-center gap-2 truncate min-w-0">
                                          <FileText className="w-3.5 h-3.5 text-[#41B349] shrink-0" />
                                          <span className="font-medium text-[#0D0F12] truncate text-xs">
                                            {file.name}
                                          </span>
                                          <span className="text-gray-400 text-[10px] shrink-0">
                                            ({(file.size / 1024).toFixed(1)} KB)
                                          </span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => removeDocFile(dt, fIdx)}
                                          className="text-gray-400 hover:text-red-500 p-0.5 ml-2 cursor-pointer transition-colors shrink-0"
                                          title="Remove attachment"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Additional Reference Links */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                          Additional Reference Links <span className="text-gray-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter URLs (e.g. Figma links, Google Drive, GitHub)..."
                          value={formData.referenceLinks}
                          onChange={(e) => handleInputChange("referenceLinks", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white hover:border-gray-300"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-xs font-jakarta text-[#4A5568]">
                      No documentation available. You can provide your requirements during our initial discovery call, or our team will help prepare technical specifications with you.
                    </div>
                  )}
                </div>
              </div>

              {/* =================================================================== */}
              {/* 10. CONTACT INFORMATION (REQUIRED SECTION *)                       */}
              {/* =================================================================== */}
              <div
                id="section-contact-info"
                className="py-8 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#41B349] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      10
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
                        className={`w-full rounded-xl border ${errors.fullName ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
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

                  {/* Row 2: Country * & Phone Number * (Country first -> Phone Number second) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Country <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="field-country"
                          name="country"
                          value={formData.country}
                          onChange={handleCountryChange}
                          className={`w-full h-10 rounded-xl border ${
                            errors.country ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                          } px-3.5 pr-8 text-xs sm:text-sm text-[#0D0F12] font-jakarta focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer appearance-none shadow-xs hover:border-gray-300`}
                        >
                          <option value="">Select your Country</option>
                          {COUNTRY_DIAL_CODES.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {errors.country && (
                        <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.country}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Phone Number <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div
                        className={`relative flex items-center rounded-xl border transition-all ${
                          errors.phone
                            ? "border-red-500 bg-red-50/20"
                            : !formData.country
                            ? "border-gray-200 bg-gray-50/70"
                            : "border-gray-200 bg-white focus-within:border-[#41B349] focus-within:ring-1 focus-within:ring-[#41B349]"
                        }`}
                      >
                        {/* Uneditable Country Dial Code Badge */}
                        {selectedCountryObj?.code && (
                          <div className="font-jakarta bg-gray-100 border-r border-gray-200 text-gray-900 font-bold text-xs sm:text-sm px-3.5 h-10 flex items-center justify-center rounded-l-[11px] shrink-0 select-none">
                            {selectedCountryObj.code}
                          </div>
                        )}
                        <input
                          id="field-phone"
                          type="tel"
                          name="phoneDigits"
                          value={phoneDigits}
                          onChange={handlePhoneChange}
                          disabled={!formData.country}
                          maxLength={selectedCountryObj?.maxDigits || 15}
                          placeholder={
                            !formData.country
                              ? "Select country first *"
                              : selectedCountryObj?.sample
                              ? `e.g. ${selectedCountryObj.sample}`
                              : `Enter ${
                                  selectedCountryObj?.minDigits === selectedCountryObj?.maxDigits
                                    ? `${selectedCountryObj?.maxDigits} digits`
                                    : "phone number"
                                }`
                          }
                          className={`w-full h-10 text-xs sm:text-sm font-jakarta bg-transparent px-3.5 focus:outline-none ${
                            selectedCountryObj?.code ? "rounded-r-[11px]" : "rounded-xl"
                          } ${
                            !formData.country
                              ? "text-gray-400 cursor-not-allowed placeholder:text-gray-400"
                              : "text-[#0D0F12] placeholder:text-gray-400"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Email Address * & WhatsApp Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                        className={`w-full h-10 rounded-xl border ${
                          errors.email ? "border-red-500 bg-red-50/20" : "border-gray-200 bg-white"
                        } px-3.5 text-xs sm:text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1 font-jakarta flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
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
                        className="w-full h-10 rounded-xl border border-gray-200 px-3.5 text-xs sm:text-sm text-[#0D0F12] font-jakarta placeholder:text-gray-400 focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Row 4: Preferred Contact Method & Best Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Preferred Contact Method
                      </label>
                      <div className="relative">
                        <select
                          value={formData.preferredContactMethod}
                          onChange={(e) => handleInputChange("preferredContactMethod", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 pl-3.5 pr-8 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer appearance-none shadow-sm hover:border-gray-300"
                        >
                          <option value="Email">Email</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Phone Call">Phone Call</option>
                          <option value="Video Meeting">Video Meeting</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 font-jakarta">
                        Best Time to Contact
                      </label>
                      <div className="relative">
                        <select
                          value={formData.bestTimeToContact}
                          onChange={(e) => handleInputChange("bestTimeToContact", e.target.value)}
                          className="w-full rounded-xl border border-gray-200 pl-3.5 pr-8 py-2 text-xs sm:text-sm text-[#0D0F12] font-jakarta bg-white focus:outline-none focus:border-[#41B349] focus:ring-1 focus:ring-[#41B349] transition-all cursor-pointer appearance-none shadow-sm hover:border-gray-300"
                        >
                          <option value="Any Time">Any Time</option>
                          <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                          <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
                          <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================================== */}
              {/* 11. HOW DID YOU FIND TECH SOLUTIONOR?                               */}
              {/* =================================================================== */}
              <div className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#41B349]/10 text-[#41B349] flex items-center justify-center font-bold text-xs shrink-0 border border-[#41B349]/20">
                    11
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

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {REFERRAL_SOURCES.map((src) => {
                    const isChecked = formData.referralSources.includes(src);
                    return (
                      <label
                        key={src}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-jakarta cursor-pointer transition-all ${isChecked
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

              {/* =================================================================== */}
              {/* 12. FINAL CONFIRMATION & SUBMIT                                     */}
              {/* =================================================================== */}
              <div
                id="section-confirmation"
                className="pt-8 pb-2 first:pt-0"
              >
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-[#41B349] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    12
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-display uppercase tracking-tight text-[#0D0F12] text-base sm:text-lg leading-snug">
                        Final Confirmation
                      </h2>
                      <span className="text-red-500 font-bold">*</span>
                    </div>
                    <p className="font-jakarta text-xs sm:text-sm text-[#4A5568] mt-0.5">
                      Please review and confirm before submitting your requirements
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 mb-7 bg-gray-50/70 rounded-xl p-4 sm:p-5 border border-gray-100">
                  {/* Checkbox 1 */}
                  <label
                    id="field-confirmAccurate"
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.confirmAccurate}
                      onChange={(e) => handleInputChange("confirmAccurate", e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer shrink-0"
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
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-[#41B349] text-[#41B349] focus:ring-[#41B349] cursor-pointer shrink-0"
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

                {/* Submit Button & Privacy */}
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[280px] sm:min-w-[340px] inline-flex items-center justify-center gap-2.5 bg-[#41B349] hover:bg-[#36963d] text-white font-jakarta font-semibold text-base py-3.5 sm:py-4 px-8 rounded-xl shadow-sm hover:shadow-md active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
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
                  <p className="text-center text-xs text-gray-500 font-jakarta mt-3.5 flex items-center justify-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Your information is safe with us. We respect your privacy.</span>
                  </p>
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
