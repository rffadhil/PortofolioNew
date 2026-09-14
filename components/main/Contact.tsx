/** @format */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/utils/motion";
import { Socials } from "@/constants";
import ContactCard from "../sub/ContactCard";
import {
  FiUser,
  FiAtSign,
  FiEdit3,
  FiCopy,
  FiCheck,
  FiExternalLink,
  FiSend,
  FiMail,
} from "react-icons/fi";
import { RxGithubLogo, RxInstagramLogo, RxLinkedinLogo } from "react-icons/rx";

const EMAIL = "rafifadh8@gmail.com";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const github = Socials.find((s) => s.name === "GitHub");
  const linkedin = Socials.find((s) => s.name === "LinkedIn");
  const instagram = Socials.find((s) => s.name === "Instagram");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire this up to a backend/email service (e.g. an API route or
    // EmailJS) once one is available. Intentionally left unimplemented
    // rather than faking a success state.
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently, the email is still
      // visible and selectable on the card itself.
    }
  };

  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center pt-[60px] pb-20"
      id="contact"
    >
      <div className="flex justify-center mb-6">
        <h1 className="text-[40px] md:text-[48px] font-semibold text-gray-200">
          Get In{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Touch
          </span>
        </h1>
      </div>

      <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-6 lg:px-8">
        {/* LEFT COLUMN — telemetry / direct channels */}
        <motion.section
          variants={slideInFromLeft(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-6 lg:-translate-y-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0300145e] border border-[#7042f861] backdrop-blur-md">
              <span className="text-cyan-300 text-[13px]">✦</span>
              <span className="text-purple-300 text-[13px] tracking-wider">
                Lets Connect
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <p className="mt-4 text-gray-400 text-[15px] leading-relaxed">
              Have a project, collaboration, or opportunity in mind? Feel free
              to reach out and let&apos;s create something great together.
            </p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0300145e] border border-[#7042f861] backdrop-blur-md flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-gray-200 text-[14px]">Connect With Me</span>
            </div>
            <span className="text-emerald-400 text-[12px] px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              Available for freelance &amp; full-time
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <ContactCard
              icon={<FiMail size={20} />}
              label="Primary Frequency"
              value={EMAIL}
              onAction={handleCopyEmail}
              actionIcon={copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
              actionLabel="Copy email address"
            />
            {linkedin && (
              <ContactCard
                icon={<RxLinkedinLogo size={20} />}
                label="Professional Network"
                value="Rafi Fadhil Amanullah"
                meta="linkedin.com/in/rafi-fadhil-amanullah"
                href={linkedin.link}
                actionIcon={<FiExternalLink size={18} />}
              />
            )}
            {github && (
              <ContactCard
                icon={<RxGithubLogo size={20} />}
                label="Code Repository"
                value="@rffadhil"
                meta="github.com/rffadhil"
                href={github.link}
                actionIcon={<FiExternalLink size={18} />}
              />
            )}
            {instagram && (
              <ContactCard
                icon={<RxInstagramLogo size={20} />}
                label="Creative & Dev Reels"
                value="@rffadhil_"
                meta="instagram.com/rffadhil_"
                href={instagram.link}
                actionIcon={<FiExternalLink size={18} />}
              />
            )}
          </div>
        </motion.section>

        {/* RIGHT COLUMN — message form */}
        <motion.section
          variants={slideInFromRight(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-7 lg:translate-y-4"
        >
          <div className="relative rounded-3xl bg-[#0300145e] border border-[#7042f861] backdrop-blur-2xl shadow-[0_12px_40px_rgba(3,0,20,0.8),0_0_32px_rgba(112,66,248,0.18)] p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-cyan-300">
                <FiSend size={16} />
              </span>
              <h2 className="text-[20px] font-semibold text-gray-200">
                Send a Message
              </h2>
            </div>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="sender-name"
                    className="text-[12px] tracking-wide uppercase text-gray-400"
                  >
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="sender-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#03001480] border border-[#7042f861] text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all text-[15px]"
                    />
                    <FiUser className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="sender-email"
                    className="text-[12px] tracking-wide uppercase text-gray-400"
                  >
                    Your Email <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="sender-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#03001480] border border-[#7042f861] text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all text-[15px]"
                    />
                    <FiAtSign className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="sender-subject"
                  className="text-[12px] tracking-wide uppercase text-gray-400"
                >
                  Subject <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="sender-subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry, collaboration, or hello..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#03001480] border border-[#7042f861] text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all text-[15px]"
                  />
                  <FiEdit3 className="absolute right-4 top-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="message-content"
                    className="text-[12px] tracking-wide uppercase text-gray-400"
                  >
                    Message
                  </label>
                  <span className="text-[11px] text-gray-500">
                    Detailed Brief
                  </span>
                </div>
                <textarea
                  id="message-content"
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project goals, timeline, and vision..."
                  className="experience-scroll w-full px-4 py-3.5 rounded-xl bg-[#03001480] border border-[#7042f861] text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all text-[15px] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7042f8] to-[#22d3ee] text-white font-semibold tracking-wide shadow-[0_0_25px_rgba(112,66,248,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] hover:scale-[0.99] active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                <span>Send Message</span>
                <FiSend className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Contact;
