import Image from "next/image";
import React from "react";
import Eclipse from '../../../../components/Images/eclipse.png';
import Grab from '../../../../components/Images/grab.png';
import Protein from '../../../../components/Images/protein.png';
import Clickpos from '../../../../components/Images/clickpos.png';
import Almatoh from '../../../../components/Images/almatoh.png';
import Traders from '../../../../components/Images/traders.png';
import Super from '../../../../components/Images/super.png';
import Craters from '../../../../components/Images/crafters.png';
import Amer from '../../../../components/Images/amer.png';
import Saloon from '../../../../components/Images/saloon.png';
import Exports from '../../../../components/Images/exports.png';
import Albasit from '../../../../components/Images/albasit.png';
import Crown from '../../../../components/Images/crownexcel.png';
import Clickslice from '../../../../components/Images/clickslice.png';
import Muzammil from '../../../../components/Images/muzammil.png';
import Appliances from '../../../../components/Images/appliances.png';
import Smart from '../../../../components/Images/smart.png';
import Mubayya from '../../../../components/Images/mubayya.png';
import Aljannah from '../../../../components/Images/aljannah.png';

import { getCmsVal } from "@/lib/api-helper";

export const defaultProjects = {
  title: "Projects & Results",
  description:
    "At TechSolutionor, we focus on delivering real, measurable outcomes for businesses worldwide. We recently enhanced a client's data analysis capabilities, achieving a 30% increase in operational efficiency. In another project, we implemented an AI-powered customer support system, which reduced response times by 40% and significantly improved customer satisfaction. Our project-driven approach ensures that every solution we deliver not only meets client expectations but also provides long-term scalability, efficiency, and value, making us a trusted technology partner for businesses across the UAE and global markets.",
};

const icons = [
  { Image: Grab, width: 223, height: 223 },
  { Image: Protein, width: 223, height: 223 },
  { Image: Clickpos, width: 223, height: 223 },
  { Image: Almatoh, width: 133, height: 114 },
  { Image: Traders, width: 194, height: 194 },
  { Image: Super, width: 115, height: 131 },
  { Image: Craters, width: 223, height: 84 },
  { Image: Amer, width: 172, height: 90 },
  { Image: Saloon, width: 201, height: 136 },
  { Image: Exports, width: 115, height: 129 },
  { Image: Albasit, width: 190, height: 190 },
  { Image: Crown, width: 172, height: 72 },
  { Image: Clickslice, width: 198, height: 41 },
  { Image: Muzammil, width: 190, height: 64 },
  { Image: Appliances, width: 227, height: 64 },
  { Image: Smart, width: 230, height: 44 },
  { Image: Mubayya, width: 212, height: 60 },
  { Image: Aljannah, width: 313, height: 167 },
];

const Projects = ({ cmsContent }) => {
  const title = getCmsVal(cmsContent, defaultProjects.title, "projects");
  const description = getCmsVal(cmsContent, defaultProjects.description, "projects");

  const logos = icons.map((icon) => {
    const dynamicImage = getCmsVal(cmsContent, icon.Image, "projects");
    return {
      ...icon,
      imageUrl: dynamicImage,
    };
  });

  return (
    <div className="relative">
      <Image alt="Projects" src={Eclipse} width={160} height={300} className="absolute -left-10 w-[100px] -top-20 md:w-[160px] md:h-[300px]" />
      <div className="projects-top flex flex-col items-center justify-center mt-10">
        <div className="text-area md:w-[950px]">
          <h1 className="text-center text-[45px] font-[700] text-[#262323]" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {title}
          </h1>
          <p className="text-[17px] font-[500] mt-5" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {description}
          </p>
          <div className="companies grid grid-cols-3 sm:grid-cols-3 mt-10 gap-8">
            {logos.map((icon, idx) => {
              const isImgDynamic = typeof icon.imageUrl === 'string' && (icon.imageUrl.startsWith('http') || icon.imageUrl.startsWith('/'));
              return (
                <div key={idx} className="flex items-center justify-center h-[130px] md:h-[170px] py-4">
                  {isImgDynamic ? (
                    <img
                      src={icon.imageUrl}
                      alt={`Project ${idx + 1}`}
                      width={icon.width}
                      height={icon.height}
                      className="object-contain w-auto h-auto max-w-[90%] max-h-[90%]"
                      style={{
                        maxWidth: icon.width,
                        maxHeight: icon.height,
                      }}
                    />
                  ) : (
                    <Image
                      src={icon.Image}
                      alt={`Project ${idx + 1}`}
                      width={icon.width}
                      height={icon.height}
                      className="object-contain w-auto h-auto max-w-[90%] max-h-[90%]"
                      style={{
                        maxWidth: icon.width,
                        maxHeight: icon.height,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
