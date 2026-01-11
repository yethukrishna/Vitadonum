import React from "react";
import Footer from "../../components/Footer";

const TermsAndPrivacy = () => {
  return (
    <div className="min-h-screen bg-zinc-200">
      <div className="container mx-auto px-6 py-14">
        <div className="bg-white p-8 rounded border border-black">

          <h1 className="text-2xl font-semibold mb-6 text-center">
            Terms of Use & Privacy Policy
          </h1>

          {/* Terms */}
          <h2 className="text-lg font-semibold mb-2">
            Terms of Use
          </h2>

          <p className="mb-3">
            VitaDonum is a blood donation platform developed as part of an
            academic project. The application is intended only for educational
            and demonstration purposes.
          </p>

          <p className="mb-3">
            Users are responsible for providing accurate information during
            registration. The platform acts only as a medium to connect donors
            and recipients and does not guarantee blood availability.
          </p>

          <p className="mb-6">
            Any misuse of the application or submission of false information
            may result in account restriction.
          </p>

          {/*Privacy*/}
          <h2 className="text-lg font-semibold mb-2">
            Privacy Policy
          </h2>

          <p className="mb-3">
            VitaDonum collects basic user information such as name, email,
            contact number, blood group, and location to support blood donation
            requests.
          </p>

          <p className="mb-3">
            All user data is stored securely and is not shared with any third
            party. The collected information is used only within the
            application.
          </p>

          <p>
            By using this application, you agree to the terms and privacy
            practices described above.
          </p>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndPrivacy;
