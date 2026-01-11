import React from "react";
import AdminHeader from '../../admin/components/AdminHeader'
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <>
      <AdminHeader />
      <section className="flex flex-col justify-center items-center md:px-40 px-6 py-20 bg-white">
        <h2 className="text-4xl text-red-500 font-bold ">
          Contact Us
        </h2>
        <p className="text-center mt-4 max-w-3xl leading-relaxed">
          We're here to support you in your journey with VitaDonum.  
          Whether you have questions, need guidance, or want to collaborate,
          our team responds with care, clarity, and compassion.
        </p>
        <div className="md:flex justify-center items-center gap-20 mt-14">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-4 rounded-full text-red-500">
              <FontAwesomeIcon icon={faLocationDot} size="2x" />
            </div>
            <p className="text-black">123 Main Street, Apt 4B</p>
            <p className="text-black text-sm">Ernakulam, Kerala</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 mt-10 md:mt-0">
            <div className="p-4 text-red-500 rounded-full">
              <FontAwesomeIcon icon={faPhone} size="2x" />
            </div>
            <p className="text-black">+91 98745 61230</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 mt-10 md:mt-0">
            <div className="p-4 text-red-500 rounded-full">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </div>
            <p className="text-black">vitadonum.help@gmail.com</p>
          </div>
        </div>
        <div className="md:grid grid-cols-2 w-full mt-20 gap-12">
          <div className="border border-gray-700 rounded-2xl p-7  ">
            <h3 className="text-center text-xl font-semibold">
              Send a Message
            </h3>
            <form className="mt-6 flex flex-col gap-4">
              <input type="text" placeholder="Your Name"
                className="p-3 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 "/>

              <input type="email" placeholder="Email Address"
                className="p-3 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 "/>

              <textarea rows="4" placeholder="Message"
                className="p-3 border border-gray-700 rounded-lgtext-gray-200 placeholder-gray-500 "></textarea>

              <button className="px-4 py-3 rounded-lg font-semibold border border-grey-500 flex justify-center items-center gap-2 ">
                Send <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
          <div className="mt-10 md:mt-0">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.123941152861!2d76.35709027505102!3d9.982384073100884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080eaa8eca4617%3A0xca880d4d78cf7a7b!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1709197379004!5m2!1sen!2sin"
              className="w-full h-full rounded-xl border border-gray-700 "
              allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
