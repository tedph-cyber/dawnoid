"use client";
import { useState } from "react";

const WHATSAPP_NUMBER = "2347080982579"; // e.g. country code + number, no "+" or spaces
const EMAIL = "info@dawnoid.20@gmail.com";
const PHONE_DISPLAY = "+234 708 098 2579";
const PHONE_TEL = "+234 708 098 2579";
const LOCATION = "Ibadan, Oyo state";
const SOCIALS = {
  instagram: "https://www.instagram.com/dawn_oid18",
  facebook: "https://www.facebook.com/share/1BzinM3x8R/",
};

export default function Contact(): React.ReactElement {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("General Inquiry");
  const [message, setMessage] = useState("");

  const makeWhatsAppLink = (text: string) => {
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website contact - ${service}`;
    const body = `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
    window.open(mailto, "_blank");
  };

  const handleChatDirectly = () => {
    const prebuilt = `Hi, my name is ${fullName || "[Your name]"}.
I am interested in: ${service}.
Message: ${message || "[short description]"}`;
    window.open(makeWhatsAppLink(prebuilt), "_blank");
  };

  return (
    <section className="max-w-4xl mx-auto p-6 font-sans bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-semibold mb-2 text-foreground">Get in touch</h1>
      <p className="text-muted-foreground mb-6">
        Have a question or want to start a project? Choose the method that suits you — message us on WhatsApp for a quick chat,
        email for details, or call for urgent matters.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact details card */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4 text-card-foreground">Quick contact</h2>

          <ul className="space-y-4 text-card-foreground">
            <li>
              <div className="font-semibold">WhatsApp</div>
              <div className="mt-2">
                <a
                  href={makeWhatsAppLink("Hi! I want to get in touch with Dawnoid.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 bg-[#25D366] text-white rounded-md font-medium hover:opacity-95 transition-opacity"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </li>

            <li>
              <div className="font-semibold">Email</div>
              <div className="mt-2">
                <a href={`mailto:${EMAIL}`} className="text-primary hover:underline transition-colors">
                  {EMAIL}
                </a>
              </div>
            </li>

            <li>
              <div className="font-semibold">Phone (urgent)</div>
              <div className="mt-2">
                <a href={`tel:${PHONE_TEL}`} className="text-primary hover:underline transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </li>

            <li>
              <div className="font-semibold">Location</div>
              <div className="mt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors"
                >
                  {LOCATION}
                </a>
              </div>
            </li>
          </ul>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="font-semibold text-card-foreground">Follow us</div>
            <div className="flex gap-3 mt-3">
              <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <svg className="w-6 h-6 text-[#E4405F]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm5.5-2.9a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z" />
                </svg>
              </a>

              <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <svg className="w-6 h-6 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.59l-.467 3.622h-3.123V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Contact form card */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-4 text-card-foreground">Send us a message</h2>

                    <form onSubmit={handleSend} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-card-foreground">Full name</span>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="mt-2 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-card-foreground">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-2 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-card-foreground">Phone number</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="090...789"
                className="mt-2 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-card-foreground">Service interest</span>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="mt-2 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option>General Inquiry</option>
                <option>Event planning</option>
                <option>Event Decoration</option>
                <option>Alaga Services</option>
                <option>Handmade Crafts</option>
                <option>Other</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-card-foreground">More information</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us more about your project or enquiry..."
                rows={5}
                className="mt-2 w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                Send
              </button>

              <button
                type="button"
                onClick={handleChatDirectly}
                className="px-4 py-2 bg-[#25D366] text-white rounded-md font-semibold hover:opacity-95 transition-opacity"
              >
                Chat directly on WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
