const GroupComponent = () => {
  return (
    <section className="w-[1240px] rounded-2xl bg-gray-200 flex flex-col items-center justify-start pt-4 px-4 pb-[38px] box-border gap-[26px] max-w-full z-[1] text-center text-17xl text-black font-text-single-200-regular mq1275:w-[calc(100%_-_40px)]">
      <div className="w-[1240px] h-48 relative rounded-2xl bg-gray-200 hidden max-w-full" />
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-6">
        <h1 className="m-0 relative text-inherit leading-[46px] capitalize font-bold font-inherit z-[1] mq750:text-10xl mq750:leading-[37px] mq450:text-3xl mq450:leading-[28px]">
          find a doctor
        </h1>
      </div>
      <div className="self-stretch flex flex-row flex-wrap items-center justify-center py-0 px-[22px] box-border gap-[0px_24px] max-w-full text-left text-xl">
        <div className="w-[296px] rounded-lg bg-neutral-colors-white box-border flex flex-row items-center justify-start py-2.5 px-5 z-[1] border-[1px] border-solid border-mediumpurple-200">
          <div className="h-[66px] w-[296px] relative rounded-lg bg-neutral-colors-white box-border hidden border-[1px] border-solid border-mediumpurple-200" />
          <input
            className="w-[54px] [border:none] [outline:none] font-text-single-200-regular text-xl bg-[transparent] h-[46px] relative leading-[46px] capitalize text-dimgray text-left inline-block z-[1] mq450:text-base mq450:leading-[37px]"
            placeholder="name"
            type="text"
          />
        </div>
        <div className="flex-1 flex flex-col items-start justify-start min-w-[228px] max-w-full">
          <div className="w-[296px] rounded-lg bg-neutral-colors-white box-border flex flex-row items-center justify-start py-2.5 px-5 z-[1] border-[1px] border-solid border-mediumpurple-200">
            <div className="h-[66px] w-[296px] relative rounded-lg bg-neutral-colors-white box-border hidden border-[1px] border-solid border-mediumpurple-200" />
            <input
              className="w-[91px] [border:none] [outline:none] font-text-single-200-regular text-xl bg-[transparent] h-[46px] relative leading-[46px] capitalize text-dimgray text-left inline-block z-[1] mq450:text-base mq450:leading-[37px]"
              placeholder="speciality"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-start py-0 pr-[75px] pl-0 gap-[0px_24px]">
          <div className="relative leading-[46px] capitalize z-[1] mq450:text-base mq450:leading-[37px]">
            available
          </div>
          <div className="h-8 w-[63px] relative rounded-4xl bg-neutral-colors-white box-border z-[1] border-[1px] border-solid border-mediumpurple-200">
            <div className="absolute top-[0px] left-[0px] rounded-4xl bg-neutral-colors-white box-border w-full h-full hidden border-[1px] border-solid border-mediumpurple-200" />
            <div className="absolute top-[3px] left-[33px] rounded-[50%] bg-mediumpurple-200 w-[26px] h-[26px] z-[1]" />
          </div>
        </div>
        <button className="cursor-pointer [border:none] p-2.5 bg-mediumpurple-200 w-[201px] rounded-lg flex flex-row items-center justify-center box-border z-[1] hover:bg-slateblue">
          <div className="h-[66px] w-[201px] relative rounded-lg bg-mediumpurple-200 hidden" />
          <div className="relative text-5xl leading-[46px] capitalize font-medium font-text-single-200-regular text-neutral-colors-white text-left z-[1] mq450:text-lgi mq450:leading-[37px]">
            search
          </div>
        </button>
      </div>
    </section>
  );
};

export default GroupComponent;
