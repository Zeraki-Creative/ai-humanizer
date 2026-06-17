import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | AI Humanizer",
  description:
    "Cookie Policy for AI Humanizer by Zeraki Creative. Learn about which cookies we use, including Google Analytics (gtag.js), and how to manage or opt out of them.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://humanizer.zerakicreative.com/cookie-policy" },
};

const LAST_UPDATED = "17 June 2026";
const CONTACT_EMAIL = "privacy@zerakicreative.com";

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
  { id: "what-are-cookies", label: "1. What Are Cookies?" },
  { id: "cookies-we-use", label: "2. Cookies We Use" },
  { id: "google-analytics", label: "3. Google Analytics (gtag.js)" },
  { id: "consent", label: "4. Cookie Consent & GDPR" },
  { id: "manage", label: "5. Managing & Opting Out" },
  { id: "browser-settings", label: "6. Browser Cookie Settings" },
  { id: "changes", label: "7. Changes to This Policy" },
  { id: "contact", label: "8. Contact Us" },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#07071A" }}>
      <Navbar />

      {/* Hero */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(180deg, rgba(99,102,241,0.05) 0%, transparent 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">Cookie Policy</h1>
          <p className="text-slate-400 text-base">
            Last updated: <span className="text-slate-300">{LAST_UPDATED}</span>
          </p>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">
            This Cookie Policy explains what cookies are, which cookies AI Humanizer uses, why we use
            them, and how you can control them — in plain English, in compliance with GDPR, the ePrivacy Directive,
            and other applicable regulations.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">

          {/* Sticky sidebar ToC */}
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

            <Section id="what-are-cookies" title="1. What Are Cookies?">
              <p>
                Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a
                website. They are widely used to make websites work more efficiently, remember your preferences, and provide
                information to the website owner.
              </p>
              <p>
                Cookies can be <strong className="text-slate-300">session cookies</strong> (deleted when you close your
                browser) or <strong className="text-slate-300">persistent cookies</strong> (stored on your device for a
                set period). They can be set by the website you&rsquo;re visiting (<strong className="text-slate-300">first-party
                cookies</strong>) or by third parties whose services are embedded on the page (
                <strong className="text-slate-300">third-party cookies</strong>).
              </p>
            </Section>

            <Section id="cookies-we-use" title="2. Cookies We Use">
              <p>
                We use a minimal set of cookies. We do <strong className="text-slate-300">not</strong> use advertising,
                retargeting, or social media tracking cookies. The cookies on our site fall into two categories:
              </p>

              {/* Strictly necessary */}
              <div className="rounded-xl overflow-hidden mt-4" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="px-5 py-3" style={{ background: "rgba(16,185,129,0.08)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span className="text-emerald-400 font-semibold text-sm">Strictly Necessary</span>
                    <span className="text-xs text-slate-500 ml-auto">No consent required</span>
                  </div>
                </div>
                <div className="p-5">
                  <p>
                    These cookies are required for the basic operation of the website. They do not track you for marketing
                    purposes and cannot be turned off.
                  </p>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                          <th className="text-left text-slate-300 pb-2 pr-4">Name</th>
                          <th className="text-left text-slate-300 pb-2 pr-4">Set by</th>
                          <th className="text-left text-slate-300 pb-2 pr-4">Purpose</th>
                          <th className="text-left text-slate-300 pb-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                        <tr>
                          <td className="py-2.5 pr-4 font-mono text-indigo-300">__Host-next-auth</td>
                          <td className="py-2.5 pr-4">AI Humanizer</td>
                          <td className="py-2.5 pr-4">Session state management for Next.js (if applicable)</td>
                          <td className="py-2.5">Session</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-slate-600 text-xs mt-3">
                    Note: Because our service requires no login, there are no session authentication cookies set for registered users.
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="rounded-xl overflow-hidden mt-4" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="px-5 py-3" style={{ background: "rgba(99,102,241,0.08)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                    <span className="text-indigo-400 font-semibold text-sm">Analytics Cookies</span>
                    <span className="text-xs text-slate-500 ml-auto">Consent required (GDPR)</span>
                  </div>
                </div>
                <div className="p-5">
                  <p>
                    These cookies help us understand how visitors use our website so we can improve it. All data is
                    anonymized and aggregated — we cannot identify individual users from it.
                  </p>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                          <th className="text-left text-slate-300 pb-2 pr-4">Name</th>
                          <th className="text-left text-slate-300 pb-2 pr-4">Set by</th>
                          <th className="text-left text-slate-300 pb-2 pr-4">Purpose</th>
                          <th className="text-left text-slate-300 pb-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                        {[
                          { name: "_ga", by: "Google (GA4)", purpose: "Distinguishes unique users by assigning a randomly generated ID. Used to calculate sessions and traffic.", duration: "2 years" },
                          { name: "_ga_XXXXXXXX", by: "Google (GA4)", purpose: "Maintains GA4 session state and stores session data specific to this property.", duration: "2 years" },
                          { name: "_gid", by: "Google (GA4)", purpose: "Distinguishes unique users. Expires quickly to avoid confusion between separate browsing sessions.", duration: "24 hours" },
                          { name: "_gat", by: "Google (GA4)", purpose: "Used to throttle request rate to the Google Analytics collection servers.", duration: "1 minute" },
                        ].map((row) => (
                          <tr key={row.name}>
                            <td className="py-2.5 pr-4 font-mono text-indigo-300">{row.name}</td>
                            <td className="py-2.5 pr-4">{row.by}</td>
                            <td className="py-2.5 pr-4">{row.purpose}</td>
                            <td className="py-2.5 whitespace-nowrap">{row.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="google-analytics" title="3. Google Analytics (gtag.js)">
              <p>
                We use Google Analytics 4 (GA4) via the <code className="text-indigo-300 bg-white/5 rounded px-1">gtag.js</code> library,
                operated by Google LLC. This service helps us understand visitor behavior in aggregate so we can improve
                the AI Humanizer experience.
              </p>

              <p className="text-slate-300 font-semibold mt-2">What Google Analytics collects on our behalf:</p>
              <ul className="list-none space-y-2 mt-2">
                {[
                  "Anonymized IP address (last octet is masked before any data is stored)",
                  "Pages you visit on our site and the time spent on each",
                  "How you arrived at our site (search engine, direct link, referral)",
                  "Your device type, browser, and general geographic region (country/city)",
                  "Events such as button clicks and tool interactions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-slate-300 font-semibold mt-4">Measures we have taken to protect your privacy:</p>
              <ul className="list-none space-y-2 mt-2">
                {[
                  "IP anonymization is enabled — your full IP address is never stored by Google",
                  "Advertising features (remarketing, interest-based targeting) are disabled",
                  "Data sharing with Google's other products is disabled",
                  "User-ID tracking is not used — we cannot link analytics data to any individual",
                  "Data retention in GA4 is set to 26 months",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-4">
                Google processes this data as our data processor under their{" "}
                <a href="https://business.safety.google/dataprocessingterms/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  Data Processing Terms
                </a>. International transfers from the EEA to the US are covered by the EU-US Data Privacy Framework
                and Standard Contractual Clauses. For more details, see{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  Google&rsquo;s Privacy Policy
                </a>{" "}and{" "}
                <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  Google Analytics data practices
                </a>.
              </p>
            </Section>

            <Section id="consent" title="4. Cookie Consent & GDPR">
              <p>
                Under the GDPR and ePrivacy Directive (EU Cookie Law), analytics cookies that are not strictly necessary
                for the operation of the website require your prior, informed, and freely given consent before being set.
              </p>
              <p>
                Where required by applicable law, we obtain your consent before placing analytics cookies. You can
                withdraw your consent at any time (see Section 5 below). Withdrawing consent will not affect the
                lawfulness of processing that occurred before you withdrew it.
              </p>
              <p>
                Strictly necessary cookies do not require consent as they are essential for the website to function.
              </p>
              <div className="rounded-xl p-4 mt-3" style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <p className="text-slate-300 font-semibold text-sm">Legal basis under GDPR</p>
                <p className="mt-2">
                  Analytics cookies: <strong className="text-slate-300">Consent</strong> — Article 6(1)(a) GDPR<br />
                  Strictly necessary cookies: <strong className="text-slate-300">Legitimate interests</strong> — Article 6(1)(f) GDPR (operational necessity)
                </p>
              </div>
            </Section>

            <Section id="manage" title="5. Managing & Opting Out">
              <p>You have several options to control or opt out of cookies:</p>

              <div className="space-y-4 mt-3">
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-slate-300 font-semibold text-sm">Google Analytics Opt-out Add-on</p>
                  <p className="mt-1.5">
                    Google provides an official browser add-on that prevents your data from being sent to Google Analytics
                    across all websites:{" "}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                      tools.google.com/dlpage/gaoptout
                    </a>
                  </p>
                </div>

                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-slate-300 font-semibold text-sm">Google Privacy Controls</p>
                  <p className="mt-1.5">
                    Manage how Google uses your data across its products:{" "}
                    <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                      myaccount.google.com/data-and-privacy
                    </a>
                  </p>
                </div>

                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-slate-300 font-semibold text-sm">Browser Cookie Settings</p>
                  <p className="mt-1.5">
                    You can configure your browser to block, delete, or alert you about cookies. See Section 6 for
                    browser-specific instructions.
                  </p>
                </div>

                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-slate-300 font-semibold text-sm">Your Ad Choices (YourAdChoices / NAI)</p>
                  <p className="mt-1.5">
                    Opt out of interest-based advertising (note: we do not use advertising cookies, but you may do this
                    globally):{" "}
                    <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                      optout.networkadvertising.org
                    </a>
                  </p>
                </div>
              </div>

              <p className="mt-4">
                <strong className="text-slate-300">Please note:</strong> Blocking strictly necessary cookies may affect
                the functionality of the website. Blocking analytics cookies will not affect your ability to use any of
                our tools.
              </p>
            </Section>

            <Section id="browser-settings" title="6. Browser Cookie Settings">
              <p>
                Each browser handles cookie management differently. Use the links below to access cookie settings in your
                browser:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {[
                  { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
                  { name: "Mozilla Firefox", url: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" },
                  { name: "Apple Safari", url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" },
                  { name: "Microsoft Edge", url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
                  { name: "Opera", url: "https://help.opera.com/en/latest/web-preferences/#cookies" },
                  { name: "Safari on iOS", url: "https://support.apple.com/en-gb/HT201265" },
                ].map((browser) => (
                  <a key={browser.name} href={browser.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    <span className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm">{browser.name}</span>
                  </a>
                ))}
              </div>
              <p className="mt-4">
                On mobile devices, you can typically manage cookies through your device&rsquo;s Settings app under the
                browser&rsquo;s privacy or site settings section.
              </p>
            </Section>

            <Section id="changes" title="7. Changes to This Policy">
              <p>
                We may update this Cookie Policy periodically to reflect changes in the cookies we use, changes in
                applicable law, or changes in our data practices. When we make material updates, we will revise the
                &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this page from time to time.
                Continued use of our website after any changes constitutes acceptance of the updated policy.
              </p>
            </Section>

            <Section id="contact" title="8. Contact Us">
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="rounded-xl p-5 mt-3" style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <p className="text-slate-300 font-semibold">Zeraki Creative — Data Privacy</p>
                <p className="mt-2">
                  Email:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p className="mt-1">Website:{" "}
                  <a href="https://zerakicreative.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">zerakicreative.com</a>
                </p>
              </div>
              <p className="mt-5 text-xs text-slate-600">
                Also see our{" "}
                <Link href="/privacy-policy" className="text-indigo-400/70 hover:text-indigo-400 transition-colors">Privacy Policy</Link>{" "}
                for full details on how we handle your personal data.
              </p>
            </Section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
