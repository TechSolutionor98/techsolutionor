"use client";
import React from "react";
import HireUs from "@/app/_components/services/eCommerce-developement/HireUs/HireUs";

const hireUsData = {
  line1: "Ready to scale your digital presence in Dubai and across the UAE?",
  line2: "Hire Tech Solutionor, to take your app from concept to launch."
};

const AppHireUs = () => {
  return <HireUs line1={hireUsData.line1} line2={hireUsData.line2} />;
};

export default AppHireUs;
