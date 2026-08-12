import React, { useEffect } from 'react';

const DocDet = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://unpkg.com/popper.js@1/dist/umd/popper.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://unpkg.com/tippy.js@4";
    script2.async = true;
    document.body.appendChild(script2);
  }, []);

  const handleToggleTheme = () => {
    const body = document.querySelector('body');
    const profile = document.getElementById('profile');
    const toggle = document.querySelector('.js-change-theme');

    if (body.classList.contains('text-gray-900')) {
      toggle.innerHTML = "☀️";
      body.classList.remove('text-gray-900');
      body.classList.add('text-gray-100');
      profile.classList.remove('bg-white');
      profile.classList.add('bg-gray-900');
    } else {
      toggle.innerHTML = "🌙";
      body.classList.remove('text-gray-100');
      body.classList.add('text-gray-900');
      profile.classList.remove('bg-gray-900');
      profile.classList.add('bg-white');
    }
  };

  return (
    <>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <meta name="description" content="" />
          <meta name="keywords" content="" />
          <meta name="author" content="" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />
        </head>
        <div className="font-roboto pt-[130px] h-screen antialiased text-gray-900 leading-normal tracking-wider bg-cover bg-gradient-to-r from-sky-500 to-indigo-500">
          <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
            <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
              <div className="p-4 md:p-12 text-center lg:text-left">
                <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>
                <h1 className="text-3xl font-bold pt-8 lg:pt-0">Your Name</h1>
                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                  <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                  </svg> What you do
                </p>
                <p className="text-sm text-gray-600 lg:text-left text-center">Here you can add more details about yourself and what you do.</p>
                {/* New Content */}
                <div className="pt-4 text-left">
                  <h2 className="text-xl font-bold mb-2">Specialization</h2>
                  <p className="text-sm text-gray-600">Include a brief description of your medical specialization and areas of expertise.</p>
                  <h2 className="text-xl font-bold mt-4 mb-2">Experience</h2>
                  <p className="text-sm text-gray-600">Highlight your years of experience and any notable achievements or awards.</p>
                  <h2 className="text-xl font-bold mt-4 mb-2">Services Offered</h2>
                  <p className="text-sm text-gray-600">List the medical services or treatments you offer to patients.</p>
                  <h2 className="text-xl font-bold mt-4 mb-2">Education</h2>
                  <p className="text-sm text-gray-600">Share details about your education background, medical school attended, and additional training.</p>
                  <h2 className="text-xl font-bold mt-4 mb-2">Patient Testimonials</h2>
                  <p className="text-sm text-gray-600">Feature testimonials from previous patients to build trust and credibility.</p>
                  {/* End of New Content */}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/5">
              <img src="https://source.unsplash.com/MP0IUfwrn0A" className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" alt="Profile" />
            </div>
            <div className="absolute top-0 right-0 h-12 w-18 p-4">
              <button className="js-change-theme focus:outline-none" onClick={handleToggleTheme}>🌙</button>
            </div>
          </div>
        </div>
      </html>
    </>
  );
}

export default DocDet;
