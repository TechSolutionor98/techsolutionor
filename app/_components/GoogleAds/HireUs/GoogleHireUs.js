"use client";
import React from "react";
import HireUs from "@/app/_components/services/eCommerce-developement/HireUs/HireUs";
import { getCmsVal } from "@/lib/api-helper";

const GoogleHireUs = ({ cmsContent }) => {
  const defaultLine1 = "Ready to scale your digital presence?";
  const defaultLine2 = "Hire the TechSolutionor team to handle your project.";
  const defaultButton = "Hire Us";

  const line1 = getCmsVal(cmsContent, defaultLine1, "googlehireus");
  const line2 = getCmsVal(cmsContent, defaultLine2, "googlehireus");

  return (
    <section>
      <div className="hidden">
        <h2>Ready to scale your digital presence?</h2>
        <p>Hire the TechSolutionor team to handle your project.</p>
        <button>Hire Us</button>
      </div>
      <HireUs line1={line1} line2={line2} />
    </section>
  );
};

export default GoogleHireUs;
