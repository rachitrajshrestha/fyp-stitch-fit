import React, { useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Contact: React.FC = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("http://localhost:8081/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      });

      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);

      setFeedback({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Feedback submission error:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar theme={"light"} setTheme={() => {}} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Welcome to Stitch & Fit — your one-stop solution for custom
              clothing and tailoring services. We pride ourselves on providing
              exceptional quality and personalized fits.
            </p>
          </div>

          {showNotification && (
            <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50">
              <strong className="font-bold">Thank you!</strong>
              <span className="block sm:inline">
                {" "}
                Your feedback has been submitted.
              </span>
            </div>
          )}

          {/* Location Map + Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="h-72 md:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0619442328395!2d85.32396027466659!3d27.71395397620039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190d2876db9f%3A0xf0e32c4c0c6d3c8b!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1713258760000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6 text-gray-600">
                <div>
                  <strong>📍 Address:</strong>
                  <p>Kathmandu, Nepal</p>
                </div>
                <div>
                  <strong>📞 Phone:</strong>
                  <p>+977-1-1234567</p>
                </div>
                <div>
                  <strong>✉️ Email:</strong>
                  <p>info@stitchnfit.com</p>
                </div>
                <div>
                  <strong>🔗 Follow Us:</strong>
                  <div className="flex space-x-4 mt-2 text-2xl text-grey-600">
                    <a
                      href="#"
                      className="hover:text-blue-800"
                      aria-label="Facebook"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="#"
                      className="hover:text-pink-600"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="#"
                      className="hover:text-sky-500"
                      aria-label="Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="#"
                      className="hover:text-blue-700"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Send Us Your Feedback
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <input
                type="text"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <textarea
                name="message"
                value={feedback.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
