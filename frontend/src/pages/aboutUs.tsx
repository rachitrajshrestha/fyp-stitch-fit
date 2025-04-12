import React, { useState } from "react";

const AboutUs: React.FC = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);

    // Optionally send to backend
    // await fetch("http://localhost:8081/feedback", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(feedback),
    // });

    alert("Thanks for your feedback!");
    setFeedback({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Welcome to Stitch & Fit — your one-stop solution for custom clothing
          and tailoring services. We pride ourselves on providing exceptional
          quality and personalized fits.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Location Map */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0786392475635!2d85.32222091506145!3d27.707551732605716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198fbd5c52d9%3A0x41fa06d30a4e4a35!2sKathmandu!5e0!3m2!1sen!2snp!4v1649517638012!5m2!1sen!2snp"
            width="100%"
            height="300"
            className="rounded-lg border"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Feedback Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Send Us Your Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="message"
              value={feedback.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
