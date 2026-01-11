import React, { useRef, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { getAllRequestsAPI } from "../../services/allApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";


const Home = () => {
  const aboutRef = useRef(null);
  const missionRef = useRef(null);
  const hopeRef = useRef(null);
  const [requests, setRequests] = useState([]);

  const scrollToAbout = () =>
    aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToMission = () =>
    missionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToHope = () =>
    hopeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    const fetchRequests = async () => {
      const result = await getAllRequestsAPI();
      if (result?.status === 200) {
        setRequests(result.data);
      }
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    if (window.location.hash === "#about") scrollToAbout();
    if (window.location.hash === "#mission") scrollToMission();
    if (window.location.hash === "#hope") scrollToHope();
  }, []);

  const createWhatsAppLink = (item) => {
    const message = `
   BLOOD DONATION ALERT 

Patient Name: ${item.patientName}
Age: ${item.age}
Blood Group: ${item.bloodGroup}
Hospital: ${item.hospital}

Bystander: ${item.bystander}
Contact: ${item.contact}

${item.description ? `Details: ${item.description}` : ""}

Urgent requirement. Please help 🙏
`;

    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };


  return (
    <div className="min-h-screen bg-zinc-200 flex flex-col">

      <section className="relative h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-95"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1635585558405-3d339d7b4105')"
          }}
        ></div>

        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/70"></div>

        <div className="absolute top-0 left-0 w-full z-30">
          <Header
            scrollToAbout={scrollToAbout}
            scrollToMission={scrollToMission}
            scrollToHope={scrollToHope}
          />
        </div>

        <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 backdrop-blur-md bg-white/5 p-6 rounded-2xl shadow-xl border border-white/10">
            <h1 className="text-4xl text-white md:text-5xl font-extrabold mb-6">
              Welcome to <span className="text-red-500 font-serif">VitaDonum</span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-white">
              Blood donation is a powerful act of compassion. One donor can
              save multiple lives and bring hope to families waiting for their
              second chance. Join us in building a future where no life is lost
              due to the lack of timely support.
            </p>
          </div>
        </div>
      </section>
      <section ref={aboutRef} id="about" className="py-20 ">
        <h1 className="text-4xl text-center mb-14 font-semibold text-red-500">
          About
        </h1>

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="https://images.pexels.com/photos/6283925/pexels-photo-6283925.jpeg"
              className="w-full rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          <div className="md:w-1/2 text-black text-lg leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md">
            <p>
              Vitadonum works alongside <span className="text-red-400 font-semibold">HelixBay Medical Institute</span> to simplify donor registration and support patients in need. Our mission is to build awareness, promote transparency, and create a trustworthy system that helps families and healthcare professionals connect faster and safer.
            </p>

            <p className="mt-4">
              By joining our platform, you contribute to a network dedicated to
              turning hope into reality—one donor, one family, one life at a time.
            </p>
          </div>
        </div>
      </section>

      {/* hope desk */}
      <section ref={hopeRef} id="hope" className="py-20">
        <h1 className="text-4xl text-center text-red-500 mb-14 font-semibold">
          Request
        </h1>
        <div className="flex gap-6 px-6 pb-4 overflow-x-auto">
          {requests.map((item, index) => (
            <div
              key={index}
              className="
          min-w-[380px] max-w-[380px] h-[380px]
          border border-black/10 rounded-2xl shadow-lg p-6 bg-white
          flex flex-col justify-between
        "
            >
              {/*Requests*/}
              <div>
                <h2 className="text-xl font-bold mt-2">
                  {item.userName}
                </h2>

                <p className="text-gray-700 text-sm mt-1">
                  Patient Name:
                  <span className="font-semibold ml-1">{item.patientName}</span>
                </p>

                <p className="text-gray-700 text-sm mt-1">
                  Age:
                  <span className="font-semibold ml-1">{item.age}</span>
                </p>

                <p className="text-gray-700 text-sm mt-1">
                  Blood Group:
                  <span className="text-red-500 font-semibold ml-1">
                    {item.bloodGroup}
                  </span>
                </p>

                <p className="text-gray-700 text-sm mt-1">
                  Hospital:
                  <span className="font-semibold ml-1">{item.hospital}</span>
                </p>

                <p className="text-gray-700 text-sm mt-1 line-clamp-3">
                  Description:
                  <span className="font-semibold ml-1">
                    {item.description}
                  </span>
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Bystander:
                  <span className="font-bold ml-1">{item.bystander}</span>
                </p>

                <p className="text-gray-700 mt-1">
                  Contact:
                  <span className="font-bold ml-1">{item.contact}</span>
                </p>
              </div>

              <a
                href={createWhatsAppLink(item)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full bg-green-500 text-white text-lg py-2 rounded-lg font-medium hover:scale-105 transition text-center"
              >
                <FontAwesomeIcon icon={faWhatsapp} />Share
              </a>

            </div>
          ))}
        </div>
      </section>
      {/* mission */}
      <section ref={missionRef} id="mission" className="py-20">
        <h1 className="text-4xl text-center text-red-500 mb-14 font-semibold">Our Mission</h1>
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="text-lg leading-relaxed bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur">
            <h2 className="text-3xl font-bold text-red-400 mb-6">Giving Hope. Saving Lives.</h2>
            <p className="mb-4">Our mission is to bridge the gap between donors and those waiting for a second chance at life.</p>
            <p className="mb-4">VitaDonum works to ensure blood donation becomes a smooth, transparent, and inspiring experience for everyone involved.</p>
            <p>Through innovation, technology, and compassion, we aim to build a future where no life is lost due to delayed donor matching.</p>
          </div>
          <div className="w-full h-[380px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-black/20">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 150,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination]}
              className="w-full h-full">
              <SwiperSlide className="w-72 h-full rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/M5ADyLmmoIc"
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </SwiperSlide>
              <SwiperSlide className="w-72 h-full rounded-xl">
                <img
                  src="https://t4.ftcdn.net/jpg/02/25/04/11/360_F_225041107_OSXfZoR8c5xsAw6wMWb50kKT851UCr5R.jpg"
                  className="w-full h-full object-cover" />
              </SwiperSlide>
              <SwiperSlide className="w-72 h-full rounded-xl">
                <img
                  src="https://img.freepik.com/free-photo/patient-lying-hospital-bed-with-respiratory-problems-connected-monitor-measuring-vitals-private-ward-middle-aged-man-with-illness-low-oxygen-saturation-waiting-clinical-consult_482257-33605.jpg"
                  className="w-full h-full object-cover" />
              </SwiperSlide>
              <SwiperSlide className="w-72 h-full rounded-xl">
                <img
                  src="https://images.pexels.com/photos/19217000/pexels-photo-19217000.jpeg"
                  className="w-full h-full object-cover" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
