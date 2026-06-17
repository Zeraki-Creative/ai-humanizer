import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | AI Humanizer",
  description:
    "Privacy Policy for AI Humanizer by Zeraki Creative. Learn how we collect, use, and protect your data in compliance with GDPR and applicable privacy laws.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://humanizer.zerakicreative.com/privacy-policy" },
};

const LAST_UPDATED = "17 June 2026";
const CONTACT_EMAIL = "privacy@zerakicreative.com";
const SITE_URL = "https://humanizer.zerakicreative.com";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-bold text-white mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {title}
      </h2>
      <div className="space-y-4 text-slate-400 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

const toc = [
  { id: "who-we-are", label: "1. Who We Are" },
  { id: "data-we-collect", label: "2. Data We Collect" },
  { id: "how-we-use", label: "3. How We Use Your Data" },
  { id: "legal-basis", label: "4. Legal Basis for Processing (GDPR)" },
  { id: "data-sharing", label: "5. Data Sharing & Third Parties" },
  { id: "international-transfers", label: "6. International Data Transfers" },
  { id: "retention", label: "7. Data Retention" },
  { id: "your-rights", label: "8. Your Rights" },
  { id: "cookies", label: "9. Cookies" },
  { id: "children", label: "10. Children's Privacy" },
  { id: "changes", label: "11. Changes to This Policy" },
  { id: "contact", label: "12. Contact Us" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#07071A" }}>
      <Navbar />

      {/* Hero */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(180deg, rgba(99,102,241,0.05) 0%, transparent 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">Privacy Policy</h1>
          <p className="text-slate-400 text-base">
            Last updated: <span className="text-slate-300">{LAST_UPDATED}</span>
          </p>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">
            This Privacy Policy explains how Zeraki Creative (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, and protects your
            personal data when you use <span className="text-slate-300">AI Humanizer</span> at{" "}
            <a href={SITE_URL} className="text-indigo-400 hover:text-indigo-300 transition-colors">{SITE_URL}</a>.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">

          {/* Table of contents — sticky sidebar on desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Contents</p>
              <nav className="space-y-1.5">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`}
                    className="block text-xs text-slate-400 hover:text-indigo-400 transition-colors py-0.5">
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Policy content */}
          <div className="space-y-12">

            <Section id="who-we-are" title="1. Who We Are">
              <p>
                The data controller responsible for your personal data is:
              </p>
              <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-slate-300 font-semibold">Zeraki Creative</p>
                <p className="mt-1">Website: <a href="https://zerakicreative.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">zerakicreative.com</a></p>
                <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">{CONTACT_EMAIL}</a></p>
              </div>
              <p>
                If you are located in the European Economic Area (EEA) or United Kingdom, Zeraki Creative acts as the
                data controller of your personal data within the meaning of the General Data Protection Regulation (GDPR)
                and the UK GDPR respectively.
              </p>
            </Section>

            <Section id="data-we-collect" title="2. Data We Collect">
              <p>We collect only the minimum data necessary to operate and improve our service. We do <strong className="text-slate-300">not</strong> require account registration and do <strong className="text-slate-300">not</strong> store the text you process through our tools on our servers.</p>

              <p className="text-slate-300 font-semibold mt-2">2.1 Data collected automatically</p>
              <p>When you visit our website, we automatically collect certain technical and usage data through Google Analytics (see Section 9 for cookie details):</p>
              <ul className="list-none space-y-2 mt-2">
                {[
                  "Anonymized IP address (last octet removed before storage)",
                  "Browser type, version, and language settings",
                  "Device type (desktop, tablet, mobile) and operating system",
                  "Pages visited, time spent on each page, and navigation paths",
                  "Referring website or source (how you found us)",
                  "General geographic region (country/city level, not precise location)",
                  "Session duration and frequency of visits",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-slate-300 font-semibold mt-4">2.2 Data you provide voluntarily</p>
              <p>
                If you contact us by email, we collect your email address and any information you include in your message
                solely to respond to your inquiry. We do not add you to any mailing list without your explicit consent.
              </p>

              <p className="text-slate-300 font-semibold mt-4">2.3 Tool input text</p>
              <p>
                Text you paste or upload into our AI tools (humanizer, paraphraser, AI detector, plagiarism checker) is
                transmitted to our AI processing API solely to generate your result. <strong className="text-slate-300">We do not log, store, or use
                this text for any other purpose.</strong> It is processed in memory and discarded immediately after your
                result is returned.
              </p>
            </Section>

            <Section id="how-we-use" title="3. How We Use Your Data">
              <p>We use the data we collect for the following purposes:</p>
              <ul className="list-none space-y-3 mt-2">
                {[
                  { title: "Service delivery", desc: "To operate and provide AI text processing features in real time." },
                  { title: "Analytics & improvement", desc: "To understand how users interact with our site so we can improve performance, usability, and content. This is done via aggregated, anonymized data through Google Analytics." },
                  { title: "Security & fraud prevention", desc: "To detect and prevent abuse, spam, and malicious requests to our API endpoints." },
                  { title: "Legal compliance", desc: "To comply with applicable laws, regulations, and legal processes." },
                  { title: "Responding to inquiries", desc: "To respond to emails or support requests you send us." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                    <span><strong className="text-slate-300">{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="legal-basis" title="4. Legal Basis for Processing (GDPR)">
              <p>
                If you are in the EEA, UK, or Switzerland, we process your personal data only where we have a valid legal
                basis under GDPR Article 6:
              </p>
              <div className="space-y-3 mt-3">
                {[
                  { basis: "Legitimate Interests (Art. 6(1)(f))", desc: "We have a legitimate interest in analyzing how users interact with our service in aggregate to improve it, provided this does not override your fundamental rights and freedoms. We have carried out a legitimate interests assessment to confirm this basis is appropriate." },
                  { basis: "Consent (Art. 6(1)(a))", desc: "Where we use analytics cookies that are not strictly necessary, we rely on your consent. You may withdraw consent at any time by adjusting your browser cookie settings or using Google's opt-out tools (see Section 9)." },
                  { basis: "Legal Obligation (Art. 6(1)(c))", desc: "Where we are required to process data to comply with applicable law." },
                  { basis: "Contract (Art. 6(1)(b))", desc: "Where processing is necessary to fulfil a request you have made (e.g. processing text through our tools)." },
                ].map((item) => (
                  <div key={item.basis} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-slate-300 font-semibold text-sm">{item.basis}</p>
                    <p className="mt-1.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="data-sharing" title="5. Data Sharing & Third Parties">
              <p>
                We do not sell, rent, or trade your personal data. We share data only with the following categories of
                third parties, and only to the extent necessary:
              </p>
              <div className="space-y-4 mt-3">
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-slate-300 font-semibold text-sm">Google LLC — Google Analytics (gtag.js)</p>
                  <p className="mt-1.5">
                    We use Google Analytics 4 (GA4) with IP anonymization enabled to collect aggregated, anonymized usage
                    data. Google may receive your anonymized IP address, device information, and browsing behavior on our
                    site. Google processes this data as a data processor on our behalf under Google&rsquo;s data processing
                    terms. For more information, see{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">Google&rsquo;s Privacy Policy</a>.
                  </p>
                </div>
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-slate-300 font-semibold text-sm">Groq, Inc. — AI Processing API</p>
                  <p className="mt-1.5">
                    Text you submit through our tools is sent to Groq&rsquo;s API for AI processing. Groq processes this as a
                    data processor. Input text is not retained by Groq beyond the processing of your individual request per
                    Groq&rsquo;s zero-data-retention API policy. We do not send any personally identifying information alongside
                    your text.
                  </p>
                </div>
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-slate-300 font-semibold text-sm">Hosting & Infrastructure</p>
                  <p className="mt-1.5">
                    Our website is hosted on Vercel, Inc. Standard server logs (access logs) may include IP addresses for
                    security purposes. These are retained per Vercel&rsquo;s data retention policy and are not used by us for
                    marketing or analytics.
                  </p>
                </div>
                <p>
                  We may also disclose data where required by law, court order, or to protect the rights, property, or
                  safety of Zeraki Creative, our users, or others.
                </p>
              </div>
            </Section>

            <Section id="international-transfers" title="6. International Data Transfers">
              <p>
                Some of our third-party providers are based outside the European Economic Area. When we transfer personal
                data internationally, we ensure appropriate safeguards are in place:
              </p>
              <ul className="list-none space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                  <span><strong className="text-slate-300">Google Analytics:</strong> Covered by Google LLC&rsquo;s participation in the EU-US Data Privacy Framework and Standard Contractual Clauses (SCCs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                  <span><strong className="text-slate-300">Groq API:</strong> Transfers are covered by Standard Contractual Clauses. Input data is processed ephemerally with no retention.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                  <span><strong className="text-slate-300">Vercel:</strong> Hosting with edge infrastructure globally, covered by Vercel&rsquo;s DPA and Standard Contractual Clauses.</span>
                </li>
              </ul>
              <p className="mt-3">
                You may request a copy of the relevant transfer safeguards by contacting us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">{CONTACT_EMAIL}</a>.
              </p>
            </Section>

            <Section id="retention" title="7. Data Retention">
              <p>We retain personal data only for as long as necessary for the purposes described in this policy:</p>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      <th className="text-left text-slate-300 font-semibold py-3 pr-6">Data Type</th>
                      <th className="text-left text-slate-300 font-semibold py-3">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    {[
                      ["Tool input text", "Not stored — processed in memory only"],
                      ["Google Analytics usage data", "26 months (GA4 default)"],
                      ["Server access logs (Vercel)", "Per Vercel's policy (up to 30 days)"],
                      ["Email correspondence", "Until the matter is resolved, then deleted within 12 months"],
                    ].map(([type, period]) => (
                      <tr key={type}>
                        <td className="py-3 pr-6 text-slate-400">{type}</td>
                        <td className="py-3 text-slate-400">{period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="your-rights" title="8. Your Rights">
              <p>
                Depending on your location, you may have the following rights regarding your personal data. Residents of
                the EEA and UK have these rights under GDPR/UK GDPR. California residents may have similar rights under
                CCPA.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {[
                  { right: "Right of Access", desc: "Request a copy of the personal data we hold about you." },
                  { right: "Right to Rectification", desc: "Request correction of inaccurate or incomplete data." },
                  { right: "Right to Erasure", desc: "Request deletion of your data ('right to be forgotten') where it is no longer needed." },
                  { right: "Right to Restriction", desc: "Request that we restrict processing of your data in certain circumstances." },
                  { right: "Right to Object", desc: "Object to processing based on legitimate interests or for direct marketing." },
                  { right: "Right to Portability", desc: "Receive your data in a structured, machine-readable format." },
                  { right: "Right to Withdraw Consent", desc: "Withdraw consent at any time where processing is based on consent (e.g. analytics cookies)." },
                  { right: "Right to Complain", desc: "Lodge a complaint with your local data protection authority if you believe your rights have been violated." },
                ].map((item) => (
                  <div key={item.right} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-slate-300 font-semibold text-sm">{item.right}</p>
                    <p className="mt-1 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4">
                To exercise any of these rights, contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">{CONTACT_EMAIL}</a>.
                We will respond within 30 days. We may need to verify your identity before processing your request. There is
                no charge for making a request.
              </p>
              <p className="mt-3">
                If you are in the EEA and unsatisfied with our response, you have the right to lodge a complaint with your
                national data protection authority (e.g. the ICO in the UK, or the relevant EU supervisory authority).
              </p>
            </Section>

            <Section id="cookies" title="9. Cookies">
              <p>
                We use cookies and similar tracking technologies to enhance your experience and collect analytics data.
                For full details on every cookie we use, including how to opt out, please see our{" "}
                <Link href="/cookie-policy" className="text-indigo-400 hover:text-indigo-300 transition-colors">Cookie Policy</Link>.
              </p>
              <p className="mt-3">
                In summary, we use Google Analytics cookies (via gtag.js) which set the <code className="text-indigo-300 bg-white/5 rounded px-1">_ga</code>,{" "}
                <code className="text-indigo-300 bg-white/5 rounded px-1">_ga_*</code>, and{" "}
                <code className="text-indigo-300 bg-white/5 rounded px-1">_gid</code> cookies to measure site usage. These are analytics
                cookies that require your consent under GDPR. You can opt out at any time by:
              </p>
              <ul className="list-none space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                  <span>Adjusting your browser&rsquo;s cookie settings to block third-party cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                  <span>Installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">Google Analytics Opt-out Browser Add-on</a></span>
                </li>
              </ul>
            </Section>

            <Section id="children" title="10. Children's Privacy">
              <p>
                Our service is not directed at children under the age of 13 (or 16 in the EEA where applicable). We do
                not knowingly collect personal data from children. If you believe a child has provided us with personal
                data, please contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">{CONTACT_EMAIL}</a>{" "}
                and we will take steps to delete it promptly.
              </p>
            </Section>

            <Section id="changes" title="11. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or
                legal requirements. When we make material changes, we will update the &ldquo;Last updated&rdquo; date at the top of
                this page. We encourage you to review this policy periodically. Continued use of the service after any
                changes constitutes acceptance of the updated policy.
              </p>
            </Section>

            <Section id="contact" title="12. Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your
                personal data, please contact us:
              </p>
              <div className="rounded-xl p-5 mt-3" style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <p className="text-slate-300 font-semibold">Zeraki Creative — Data Privacy</p>
                <p className="mt-2">
                  Email:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p className="mt-1">Website: <a href="https://zerakicreative.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">zerakicreative.com</a></p>
                <p className="text-slate-500 text-xs mt-3">We aim to respond to all privacy-related inquiries within 5 business days and all formal GDPR requests within 30 calendar days.</p>
              </div>

              <p className="mt-5 text-xs text-slate-600">
                Also see our{" "}
                <Link href="/cookie-policy" className="text-indigo-400/70 hover:text-indigo-400 transition-colors">Cookie Policy</Link>.
              </p>
            </Section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
