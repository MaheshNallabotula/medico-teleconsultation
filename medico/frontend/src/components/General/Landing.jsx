import React from 'react'
import { Link } from 'react-router-dom';
import Instagram from './Instagram';
import MemberCard from './MemberCard';
import GroupComponent from './GroupComponent';
import ContentCardsV from './ContentCardsV';
import FrameComponent from './FrameComponent'
import FooterContainer from './FooterContainer'
import FootersV from './FootersV'
import AuthContext from '../../../Context/AuthContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const Landing = () => {
  const {getSpecialization} = useContext(AuthContext)
 
  return (
    <>
     <div className="w-full relative bg-whitesmoke-300 overflow-hidden flex flex-col items-end justify-start pt-[26px] px-0 pb-0 box-border gap-[120px_0px] tracking-[normal] mq750:gap-[120px_0px] mq450:gap-[120px_0px]">
      <header className="w-[1006px]  flex  flex-row items-start justify-start pt-0 pb-[75px] pr-0 pl-5 box-border max-w-full text-center text-xl text-black ">
        <div className="flex flex-row items-center justify-start py-0 pr-5 pl-0 box-border gap-[0px_62px] max-w-full mq450:gap-[0px_62px] mq1100:gap-[0px_62px]">
          <div className="flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border max-w-full">
            <div className="flex flex-row items-start justify-start gap-[0px_26px] mq1100:hidden">
              <div className="flex flex-col items-center justify-center pt-0 px-0 pb-[5px] relative text-mediumpurple-200">
                <div className="relative tracking-normal capitalize">
                  home
                </div>
                <div className="w-[58px] h-[3px] absolute my-0 mx-[!important] bottom-[0px] left-[5px] rounded-[7px] bg-mediumpurple-200" />
              </div>
              <div className="relative tracking-normal capitalize">
                service
              </div>
              <div className="relative tracking-normal capitalize whitespace-nowrap">
                contact us
              </div>
              <div className="relative tracking-normal capitalize">help</div>
              <div className="relative tracking-normal capitalize">
                blogs
              </div>
            </div>
          </div>
          <div className="w-[292px] flex flex-row items-center justify-start gap-[0px_28px] text-mediumpurple-200">
            <Link to="/register_patient" className="no-underline text-black relative tracking-normal capitalize font-medium whitespace-nowrap">
              Register
            </Link>
            <Link to="/login" className="no-underline cursor-pointer [border:none] p-[13px] bg-mediumpurple-200 flex-1 rounded-lg flex flex-row items-center justify-center whitespace-nowrap hover:bg-slateblue">
              <b className="relative text-xl tracking-normal capitalize  text-neutral-colors-white text-center">
                log in
              </b>
            </Link>
          </div>
        </div>
      </header>
      <Instagram />
      <main className="self-stretch flex flex-col items-center justify-start pt-0 px-0 pb-0 box-border max-w-full shrink-0">
        <GroupComponent />
        <section className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border max-w-full">
          <ContentCardsV />
          <FrameComponent />
          <FooterContainer />
          <FootersV />
        </section>
      </main>
    </div>

    </>
  )
}

export default Landing