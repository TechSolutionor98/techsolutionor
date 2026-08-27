"use client";
import React from "react";
import HireUs from "@/app/_components/services/eCommerce-developement/HireUs/HireUs";
import { getCmsVal } from "@/lib/api-helper";

const PythonHireUs = ({ cmsContent }) => {
  const line1 = getCmsVal(cmsContent, "Ready to scale your digital presence?", "pythonhireus");
  const line2 = getCmsVal(cmsContent, "Hire the TechSolutionor team to handle your project.", "pythonhireus");
  const buttonText = getCmsVal(cmsContent, "Hire Us", "pythonhireus");

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

export default PythonHireUs;
