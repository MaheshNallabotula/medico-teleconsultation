const MemberCard = ({ imagePlaceholder, memberName, memberTitle }) => {
  return (
    <div className="w-[388px] rounded-3xl bg-neutral-colors-white box-border shrink-0 flex flex-col items-center justify-start pt-10 px-[31px] pb-14 gap-[32px] text-center text-9xl text-mediumpurple-200 font-text-single-200-regular border-[1px] border-solid border-lavender mq750:pt-[138px] mq750:pb-9 mq750:box-border">
      <div className="w-[388px] h-[535px] relative rounded-3xl bg-neutral-colors-white box-border hidden max-w-full border-[1px] border-solid border-lavender" />
      <div className="flex flex-row items-start justify-start pt-0 px-0 pb-2">
        <img
          className="h-40 w-40 relative z-[1]"
          alt=""
          src={imagePlaceholder}
        />
      </div>
      <div className="self-stretch flex flex-col items-center justify-start gap-[15px_0px]">
        <div className="flex flex-col items-center justify-start gap-[8px_0px]">
          <h3 className="m-0 relative text-inherit leading-[38px] font-bold font-inherit z-[1] mq450:text-3xl mq450:leading-[30px]">
            {memberName}
          </h3>
          <b className="relative text-lg tracking-[0.1em] leading-[20px] uppercase text-darkslategray whitespace-nowrap z-[1]">
            {memberTitle}
          </b>
        </div>
        <div className="self-stretch relative text-lg leading-[30px] text-dimgray z-[1]">{`Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi. `}</div>
      </div>
      <div className="flex flex-row items-start justify-start gap-[0px_16px]">
        <div className="h-9 w-9 relative rounded-lg bg-teal z-[1]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-lg bg-teal hidden" />
          <img
            className="absolute h-3/6 w-[27.22%] top-[25%] right-[36.39%] bottom-[25%] left-[36.39%] max-w-full overflow-hidden max-h-full z-[1]"
            alt=""
            src="/facebook.svg"
          />
        </div>
        <div className="h-9 w-9 relative rounded-lg bg-teal z-[1]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-lg bg-teal hidden" />
          <img
            className="absolute h-[40.56%] w-6/12 top-[29.72%] right-[25%] bottom-[29.72%] left-[25%] max-w-full overflow-hidden max-h-full z-[1]"
            alt=""
            src="/twitter.svg"
          />
        </div>
        <img
          className="h-9 w-9 relative object-cover min-h-[36px] z-[1]"
          alt=""
          src="/social-media-icon-squareinstagram@2x.png"
        />
        <div className="h-9 w-9 relative rounded-lg bg-teal z-[1]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-lg bg-teal hidden" />
          <img
            className="absolute h-[47.5%] w-6/12 top-[26.11%] right-[25%] bottom-[26.39%] left-[25%] max-w-full overflow-hidden max-h-full z-[1]"
            alt=""
            src="/linkedin.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
