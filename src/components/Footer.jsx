import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0B0B0C] text-gray-400 pt-14 pb-10 border-t border-gray-800">
      
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        <div>
          <h2 className="text-red-500 text-3xl font-semibold tracking-wide">Vitadonum</h2>
          <p className="text-sm mt-3 text-gray-500 leading-relaxed">
            A modern platform spreading awareness and empowering lives through organ donation.
          </p>
        </div>

        <div>
          <h3 className="text-red-500 text-lg font-medium mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/" className="hover:text-white duration-200">Home</a>
            </li>
            <li>
              <a href="/auth" className="hover:text-white duration-200">Login</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white duration-200">Contact</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-red-500 text-lg font-medium mb-4">Follow Us</h3>
          <div className="flex space-x-5 text-xl">
            <a href="#" className="hover:text-blue-500 transition">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-red-500 text-lg font-medium mb-4">Hospital</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            <span className="text-red-500 font-medium">HelixBay Medical Institute</span><br />
            42B Coral Ridge Avenue,<br />
            North Shore Medical Park,<br />
            Palarivattom, Kochi - 682024<br /><br />

            <span className="text-red-500 font-medium">Phone:</span> +91 98470 01234<br />
            <span className="text-red-500 font-medium">E-mail:</span> helixbay@gmail.com
          </p>
        </div>

      </div>

      <div className="w-full border-t border-gray-800 mt-12"></div>

      <div className="text-center text-gray-600 text-sm mt-6">
        © {new Date().getFullYear()} Vitadonum. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
