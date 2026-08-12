import MemberCard from "./MemberCard";

const FrameComponent = () => {
  return (
    <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[47px] box-border max-w-full mt-[-118px] text-center text-17xl text-mediumpurple-200 font-text-single-200-regular mq1275:pb-[31px] mq1275:box-border mq1100:pb-5 mq1100:box-border">
      <div className="flex-1 bg-neutral-colors-white overflow-hidden flex flex-row items-center justify-center max-w-full z-[1]">
        <div className="flex-1 bg-whitesmoke-300 flex flex-col items-center justify-start pt-28 px-5 pb-[172px] box-border gap-[60px] max-w-full mq750:gap-[60px] mq1275:pt-[138px] mq1275:pb-28 mq1275:box-border mq450:pb-[47px] mq450:box-border mq1100:pb-[73px] mq1100:box-border">
          <div className="w-[1440px] h-[1592px] relative bg-whitesmoke-300 hidden max-w-full" />
          <div className="w-[614px] flex flex-col items-center justify-start gap-[16px_0px] max-w-full">
            <h1 className="m-0 relative text-inherit leading-[46px] font-bold font-inherit inline-block max-w-full z-[1] mq750:text-10xl mq750:leading-[37px] mq450:text-3xl mq450:leading-[28px]">
              Meet our team members
            </h1>
            <div className="self-stretch relative text-lg leading-[30px] text-dimgray z-[1]">
              Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat
              gravida malesuada quam commodo id integer nam.
            </div>
          </div>
          <div className="w-[1220px] overflow-x-auto flex flex-row flex-wrap items-start justify-start gap-[56px_23px] min-h-[1126px] max-w-full z-[1] text-lg">
            <div className="w-[388px] rounded-3xl bg-neutral-colors-white box-border shrink-0 flex flex-col items-center justify-start pt-10 px-[31px] pb-14 gap-[32px] border-[1px] border-solid border-lavender mq750:pt-[138px] mq750:pb-9 mq750:box-border">
              <div className="w-[388px] h-[535px] relative rounded-3xl bg-neutral-colors-white box-border hidden max-w-full border-[1px] border-solid border-lavender" />
              <div className="flex flex-row items-start justify-start pt-0 px-0 pb-2">
                <img
                  className="h-40 w-40 relative z-[1] rounded-full"
                  loading="eager"
                  alt=""
                  src=""
                />
              </div>
              <div className="self-stretch flex flex-col items-center justify-start gap-[8px_0px]">
                <h3 className="m-0 relative text-9xl leading-[38px] font-bold font-inherit z-[1] mq450:text-3xl mq450:leading-[30px]">
                  Lavish Sainik
                </h3>
                <div className="flex flex-row items-start justify-start pt-0 px-0 pb-[7px] text-darkslategray">
                  <b className="relative tracking-[0.1em] leading-[20px] uppercase z-[1]">{`CEO & Co-Founder`}</b>
                </div>
                <div className="self-stretch relative leading-[30px] text-dimgray z-[1]">{`Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi. `}</div>
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
                  loading="eager"
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
            <MemberCard
             className="rounded-full"
              imagePlaceholder="/"
              memberName="Sumit Singh"
              memberTitle=""
            />
            <MemberCard
             className="rounded-full"
              imagePlaceholder="/"
              memberName="Nabneet dutta"
              memberTitle="CTO"
            />
            <MemberCard
             className="rounded-full"
              imagePlaceholder="/"
              memberName="Tejaswa awasthi"
              memberTitle=""
            />
            <MemberCard
             className="rounded-full"
              imagePlaceholder="/"
              memberName="Ashutosh Dubey"
              memberTitle=""
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
