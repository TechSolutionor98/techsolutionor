"use client";
import React from "react";
import HireUs from "@/app/_components/services/eCommerce-developement/HireUs/HireUs";
import { getCmsVal } from "@/lib/api-helper";

const defaultHireUsData = {
  line1: "Ready to scale your digital presence?",
  line2: "Hire the TechSolutionor team to handle your project."
};

const ReactHireUs = ({ cmsContent }) => {
  const line1 = getCmsVal(cmsContent, defaultHireUsData.line1, "reacthireus");
  const line2 = getCmsVal(cmsContent, defaultHireUsData.line2, "reacthireus");

  return <HireUs line1={line1} line2={line2} />;
};

export default ReactHireUs;
