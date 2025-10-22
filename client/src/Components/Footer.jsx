import React from "react";
import { FaYoutube, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGooglechrome } from "react-icons/si";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#f3f8ff] px-6 py-10 text-[#1a2b6d] border-t border-gray-200" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer Navigation for JSON Parser</h2>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">

                {/* Left Section - Branding, About, and Contact */}
                <div className="md:w-[35%] self-start">
                    <a
                        href="/"
                        className="flex items-center space-x-1 hover:opacity-90 transition-opacity"
                    >
                        <h2 className="text-2xl font-extrabold" title="JSON Parser - Online JSON Formatter and Validator">
                            <span className="text-[#1a50b3]">JSON</span> PARSER
                        </h2>
                    </a>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                        JSON Parser is your all-in-one online tool to <strong>format, validate, and beautify JSON data</strong>. Quickly detect errors, convert JSON to <strong>XML or YAML</strong>, and make your code clean, readable, and ready for web or API projects. Ideal for developers, testers, and students who want optimized JSON instantly.
                    </p>

                    {/* Write to us */}
                    <p className="mt-8">
                        Write to us @{" "}
                        <a href="mailto:info@json-format.com" className="text-[#1a50b3] font-medium">
                            info@json-format.com
                        </a>
                    </p>
                </div>

                {/* Center Section - JSON Tools */}
                <div className="md:w-[25%]">
                    <h3 className="text-lg font-bold text-[#1a50b3] mb-4">JSON Tools</h3>
                    <nav aria-label="JSON Utility Links">
                        <ul className="space-y-2 text-sm font-medium">
                            <li><a href="/json-parser" title="Parse JSON Online" className="hover:underline">JSON Parser</a></li>
                            <li><a href="/json-validator" title="Validate JSON Online" className="hover:underline">JSON Validator</a></li>
                            <li><a href="/json-beautifier" title="Beautify JSON Code Online" className="hover:underline">JSON Beautifier</a></li>
                            <li><a href="/api-testing-tool" title="Test JSON APIs" className="hover:underline">API Testing Tool</a></li>
                            <li><a href="/blog" title="JSON Parser Blog - Tutorials & Tips" className="hover:underline">JSON Blog</a></li>
                        </ul>
                    </nav>
                </div>

                {/* Right Section - Company Links and Social */}
                <div className="md:w-[20%]">
                    <h3 className="text-lg font-bold text-[#1a50b3] mb-4">Company & Connect</h3>
                    <nav aria-label="Company Links">
                        <ul className="space-y-2 text-sm font-medium mb-6">
                            <li><a href="/about" title="About JSON Parser Tool" className="hover:underline">About JSON Parser</a></li>
                            <li><a href="/contact" title="Contact JSON Parser Team" className="hover:underline">Contact Us</a></li>
                            <li className="flex items-center gap-1">
                                <SiGooglechrome size={18} /> 
                                <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" title="JSON Parser Chrome Extension" className="hover:underline">
                                    Chrome Extension
                                </a>
                            </li>
                            <li className="flex items-center gap-1">
                                <FaGithub size={18} /> 
                                <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" title="JSON Parser GitHub Repository" className="hover:underline">
                                    GitHub Repository
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Social Links */}
                    <p className="font-semibold text-sm mt-3 mb-2">
                        Stay Updated with JSON Parser:
                    </p>
                    <div className="flex gap-4">
                        <a href="https://x.com/json_format" target="_blank" rel="noopener noreferrer" title="Follow JSON Parser on X" className="text-[#1a50b3] hover:text-blue-700 transition-colors"><FaTwitter size={24} /></a>
                        <a href="https://www.linkedin.com/company/json-format-page" target="_blank" rel="noopener noreferrer" title="Follow JSON Parser on LinkedIn" className="text-[#1a50b3] hover:text-blue-700 transition-colors"><FaLinkedin size={24} /></a>
                        <a href="https://www.youtube.com/@JsonFormat-w8z" target="_blank" rel="noopener noreferrer" title="Subscribe to JSON Parser YouTube Channel" className="text-[#1a50b3] hover:text-red-600 transition-colors"><FaYoutube size={24} /></a>
                        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" title="JSON Parser GitHub Repository" className="text-[#1a50b3] hover:text-gray-800 transition-colors"><FaGithub size={24} /></a>
                    </div>
                </div>
            </div>

            {/* Legal and Copyright */}
            <div className="mt-10 pt-5 border-t border-gray-300">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 space-y-3 md:space-y-0">
                    <p className="order-2 md:order-1">&copy; {currentYear} JSON PARSER. All rights reserved. Format, validate, and beautify your JSON online for free.</p>
                    <nav aria-label="Legal Links" className="order-1 md:order-2">
                        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                            <li><a href="/privacy-policy" title="JSON Parser Privacy Policy" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="/terms-of-service" title="JSON Parser Terms of Service" className="hover:underline">Terms of Service</a></li>
                            <li><a href="/disclaimer" title="JSON Parser Disclaimer" className="hover:underline">Disclaimer</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
