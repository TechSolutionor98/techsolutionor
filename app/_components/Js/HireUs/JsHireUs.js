"use client";
import React from "react";
import HireUs from "@/app/_components/services/eCommerce-developement/HireUs/HireUs";

const hireUsData = {
  line1: "Ready to scale your digital presence?",
  line2: "Hire the TechSolutionor team to handle your project."
};

const JsHireUs = () => {
  return <HireUs line1={hireUsData.line1} line2={hireUsData.line2} />;
};

export default JsHireUs;
