import React from 'react';
import MobileImage from '../../../../../components/Images/mobile1.png';
import MobileImg from '../../../../../components/Images/image2.png';
import WhiteImage from '../../../../../components/Images/whiteline.png';
import BgImage from '../../../../../components/Images/Rectangle-3.png';
import GoogleStoreBtn from '../../../../../components/Images/googleappleappgallery.svg';
import Image from 'next/image';

const AppImages = () => {
  return (
    <div className="w-full bg-white py-6">
      {/* GREEN DIAGONAL BACKGROUND BANNER */}
      <div
        style={{ backgroundImage: `url(${BgImage.src})` }}
        className="w-full bg-cover bg-center py-12 md:py-16"
      >
        {/* CONTENT CONTAINER */}
        <div className="max-w-[1140px] mx-auto px-5">
          {/* ROW */}
          <div className="relative flex flex-col md:flex-row items-center justify-between">
            {/* LEFT IMAGE */}
            <div className="w-full md:w-[380px] flex justify-center md:justify-start mb-6 md:mb-0">
              <Image
                src={MobileImage}
                alt="Service Left"
                width={1000}
                height={1000}
                className="w-full max-w-[500px] object-contain"
              />
            </div>

            {/* CENTER LINE (HIDDEN ON MOBILE) */}
            <div className="hidden md:flex w-[60px] justify-center">
              <Image
                src={WhiteImage}
                alt="Service Center"
                width={10}
                height={300}
                className="h-[100px] object-contain"
              />
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full md:w-[380px] flex justify-center md:justify-end mt-6 md:mt-0">
              <Image
                src={MobileImg}
                alt="Service Right"
                width={1000}
                height={1000}
                className="w-full max-w-[500px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* STORE BUTTONS */}
      <div className="w-full bg-white flex justify-center px-5 py-8">
        <Image
          src={GoogleStoreBtn}
          alt="App Store Buttons"
          width={600}
          height={120}
          className="object-contain max-w-[500px]"
        />
      </div>
    </div>
  );
};

export default AppImages;
