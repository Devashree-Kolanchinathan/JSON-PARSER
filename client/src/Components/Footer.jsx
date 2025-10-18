import React from "react";
import { FaYoutube, FaTwitter, FaLinkedin } from "react-icons/fa";
import { SiGooglechrome } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full bg-[#f3f8ff] px-6 py-10 text-[#1a2b6d]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Left Section - Logo + About */}
        <div className="md:w-[30%] self-start">
          <a
            href="/"
            className="flex items-center space-x-1 hover:opacity-90 transition-opacity"
          >
            <h2 className="text-2xl font-bold">
              <span className="text-[#1a50b3]">JSON</span> Format
            </h2>
          </a>
          <p className="mt-3 bg-white shadow-sm p-3 rounded-lg leading-relaxed text-[15px] text-gray-700">
            JSON-Format is a fast, user-friendly tool to format, validate, and beautify JSON data.
            Instantly check for errors and ensure clean, optimized JSON code.
          </p>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-center text-center flex-1">
          <p>
            Write to us @{" "}
            <a href="mailto:info@json-format.com" className="text-[#1a50b3] font-medium">
              info@json-format.com
            </a>
          </p>

          <p className="mt-3 font-semibold">Follow us :</p>
          <div className="flex justify-center gap-6 my-3">
            <a
              href="https://www.youtube.com/@JsonFormat-w8z"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#eaf1ff] p-2 rounded-full hover:scale-110 transition-transform"
              title="YouTube"
            >
              <FaYoutube size={26} className="text-[#1a50b3]" />
            </a>
            <a
              href="https://x.com/json_format"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#eaf1ff] p-2 rounded-full hover:scale-110 transition-transform"
              title="Twitter"
            >
              <FaTwitter size={26} className="text-[#1a50b3]" />
            </a>
            <a
              href="https://www.linkedin.com/company/json-format-page"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#eaf1ff] p-2 rounded-full hover:scale-110 transition-transform"
              title="LinkedIn"
            >
              <FaLinkedin size={26} className="text-[#1a50b3]" />
            </a>
          </div>



          <p className="font-semibold">Our Products</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png"
              alt="Chrome"
              className="w-8 h-8"
            />
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a2b6d] font-medium hover:underline"
            >
              Chrome Extension
            </a>
          </div>



          <p className="text-[#002fff] mt-3 font-medium">
            Latest Release Version: <span className="font-bold">11.0</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/4 text-left">
          <h3 className="text-lg font-bold text-[#1a50b3] mb-2">BLOG</h3>
          <ul className="space-y-2 font-medium">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#6a5acd] rounded-full"></span> Basics
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#ff8c00] rounded-full"></span> Features
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#ff4500] rounded-full"></span> Releases
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#3cb371] rounded-full"></span> Resources
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
