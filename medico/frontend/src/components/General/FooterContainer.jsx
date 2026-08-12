const FooterContainer = () => {
  return (
    <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-5 box-border max-w-full mt-[-118px] text-left text-9xl text-darkslategray font-text-single-200-regular">
      <div className="h-[308px] flex-1 bg-neutral-colors-white overflow-hidden flex flex-row items-end justify-end max-w-full z-[2] mq750:h-auto">
        <div className="flex-1 bg-whitesmoke-300 flex flex-col items-center justify-start pt-[141px] pb-[162px] pr-5 pl-[21px] box-border gap-[11px] max-w-full shrink-0 mq450:pt-[138px] mq450:pb-[105px] mq450:box-border">
          <div className="w-[1440px] h-[407px] relative bg-whitesmoke-300 hidden max-w-full" />
          <h3 className="m-0 relative text-inherit leading-[38px] font-bold font-inherit inline-block max-w-full z-[1] mq450:text-3xl mq450:leading-[30px]">
            Subscribe to our newsletter
          </h3>
          <div className="w-[559px] flex flex-row flex-wrap items-start justify-start gap-[0px_24px] max-w-full">
            <input
              className="w-full [border:none] [outline:none] bg-neutral-colors-white h-[54px] flex-1 rounded-31xl flex flex-row items-center justify-start py-3.5 px-6 box-border font-text-single-200-regular text-base text-dimgray min-w-[272px] max-w-full z-[1]"
              placeholder="Enter your email"
              type="text"
            />
            <button className="cursor-pointer [border:none] py-[18px] px-[17px] bg-mediumpurple-200 w-[116px] rounded-11xl flex flex-row items-center justify-center box-border gap-[0px_8px] z-[1]">
              <img
                className="h-[18px] w-[18px] relative overflow-hidden shrink-0 hidden min-h-[18px]"
                alt=""
                src="/line-roundedsearch.svg"
              />
              <b className="relative text-base leading-[18px] font-text-single-200-regular text-neutral-colors-white text-center">
                Suscribe
              </b>
              <img
                className="h-[18px] w-[18px] relative overflow-hidden shrink-0 hidden min-h-[18px]"
                alt=""
                src="/line-roundedarrow-right.svg"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContainer;
