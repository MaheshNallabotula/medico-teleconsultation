const RightColumn = () => {
    return (
      <div className="absolute h-full top-[0px] bottom-[0px] left-[0px] bg-whitesmoke-700 w-60 text-left text-base text-dimgray-200 font-manrope">
        <div className="absolute top-[564px] left-[32px] rounded flex flex-row items-center justify-start py-2 pr-6 pl-4 gap-[0px_12px] z-[1]">
          <img
            className="h-6 w-6 relative min-h-[24px]"
            loading="lazy"
            alt=""
            src="/vuesaxlinearsetting2.svg"
          />
          <div className="relative leading-[24px]">Settings</div>
        </div>
        <div className="absolute top-[628px] left-[32px] rounded flex flex-row items-center justify-start py-2 pr-[34px] pl-4 gap-[0px_12px] z-[1] text-indianred">
          <img
            className="h-6 w-6 relative min-h-[24px]"
            loading="lazy"
            alt=""
            src="/vuesaxlinearlogout.svg"
          />
          <div className="relative leading-[24px]">Logout</div>
        </div>
        <div className="absolute top-[212px] left-[32px] w-[197px] flex flex-col items-start justify-start gap-[24px_0px] z-[1] text-gray-1000">
          <button className="cursor-pointer [border:none] py-2 pr-[33px] pl-4 bg-mediumpurple-200 rounded flex flex-row items-center justify-start gap-[0px_12px] hover:bg-slateblue-100">
            <img
              className="h-6 w-6 relative"
              alt=""
              src="/vuesaxlinearcategory.svg"
            />
            <div className="relative text-base leading-[24px] font-medium font-manrope text-dimgray-200 text-left">
              Dashboard
            </div>
          </button>
          <div className="rounded overflow-auto flex flex-row items-start justify-start py-2 pr-[21px] pl-4 gap-[0px_12px]">
            <img
              className="h-6 w-6 relative min-h-[24px]"
              loading="lazy"
              alt=""
              src="/vuesaxlinearprofile.svg"
            />
            <div className="relative leading-[24px] font-medium">
              Verified Doctors
            </div>
          </div>
          <div className="self-stretch rounded flex flex-row items-center justify-start py-2 pr-6 pl-4 gap-[0px_12px]">
            <img
              className="h-6 w-6 relative min-h-[24px]"
              loading="lazy"
              alt=""
              src="/vuesaxlineargallery.svg"
            />
            <div className="relative leading-[24px] font-medium">Hospital</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RightColumn;
  