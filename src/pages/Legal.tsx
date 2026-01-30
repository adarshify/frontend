import { Mail } from 'lucide-react';

export default function Legal() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="mb-12 border-b border-slate-100 pb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">📄 Legal Information</h1>
          <p className="text-slate-500 italic">Last updated: 28 January 2026</p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            This page combines the <strong>Disclaimer, Terms of Use, and Privacy Information</strong> for this website. 
            By accessing or using this site, you acknowledge and agree to the information and conditions outlined below.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-10 text-slate-700 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Project Purpose</h2>
            <p>
              This website is a <strong>personal, non-commercial project</strong> created to explore and share English-speaking job opportunities in Germany.
              The purpose of the project is to make it easier for professionals to discover roles that <em>may</em> be accessible without German language requirements. All information is provided for <strong>informational and educational purposes only</strong>.
            </p>
            <p className="mt-2">
              This site does <strong>not</strong> provide recruitment, hiring, legal, immigration, or career advisory services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">2. No Recruitment or Hiring Service</h2>
            <p>This website:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Is <strong>not</strong> a recruitment agency</li>
              <li>Does <strong>not</strong> represent employers</li>
              <li>Does <strong>not</strong> guarantee interviews, responses, or job offers</li>
            </ul>
            <p className="mt-2">
              All job listings link to external company career pages or publicly available sources. Any hiring decisions, requirements, or communications are handled entirely by the respective employers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Accuracy, Filtering & Language Disclaimer</h2>
            <p>
              Job listings are curated using automated systems and/or manual review to identify roles that <strong>appear</strong> to not require German language skills.
            </p>
            <p className="mt-2 font-semibold">However:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Job details may change or become outdated</li>
              <li>Language requirements may change over time</li>
              <li>Employers may assess language needs differently during interviews</li>
            </ul>
            <p className="mt-2">
              Inclusion of a job on this site does <strong>not guarantee</strong> that German language skills will not be required. Users are responsible for verifying all job details directly with the employer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Use of the Website</h2>
            <p>You may use this website for <strong>personal, non-commercial purposes only</strong>.</p>
            <p className="mt-2">You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Scrape, copy, or redistribute job listings in bulk</li>
              <li>Republish or commercialize site content</li>
              <li>Use the site for misleading, unlawful, or harmful purposes</li>
              <li>Attempt to disrupt, overload, or misuse the website</li>
            </ul>
            <p className="mt-2">
              All job descriptions, trademarks, company names, and related content remain the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Third-Party Links</h2>
            <p>
              This website contains links to third-party websites, typically employer career pages. We do not control, endorse, or take responsibility for the content, accuracy, availability, or policies of external sites. Accessing third-party websites is done at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Company Names & Logos</h2>
            <p>
              Company names, job titles, and <strong>logos</strong> displayed on this website are used <strong>solely for identification and informational purposes</strong>.
            </p>
            <p className="mt-2">Logos and brand assets:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Remain the property of their respective owners</li>
              <li>Are displayed only to help users recognize employers</li>
              <li>Do <strong>not</strong> imply any partnership, endorsement, or affiliation</li>
            </ul>
            <p className="mt-2">
              This website is <strong>not associated with or endorsed by</strong> any of the companies listed. If you are a company or rights holder and would like your logo or listing removed, please contact us and the request will be addressed promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Removal Requests</h2>
            <p>
              If you are an employer, recruiter, or rights holder and wish to have a job listing or logo removed, please contact us.
            </p>
            <p className="mt-2">Please include the job listing URL and the reason for removal. Valid requests will be handled within a reasonable timeframe.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">8. No Warranties & Limitation of Liability</h2>
            <p>
              This website is provided <strong>“as is”</strong> and <strong>“as available”</strong>, without warranties of any kind, express or implied.
              To the fullest extent permitted by law, the site owner shall not be liable for any loss, damages, or outcomes resulting from use of this website, reliance on job information, or external hiring decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">9. Privacy & Data Use</h2>
            <p>This website collects <strong>minimal data</strong>, which may include anonymous usage analytics and email addresses (only if you subscribe).</p>
            <p className="mt-2">We do <strong>not</strong> sell personal data, share it with third parties, or use it for advertising/profiling. Emails are only used for project updates and you can unsubscribe at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">10. Cookies & Tracking</h2>
            <p>
              If cookies or analytics are used, they are limited to understanding general website usage and improving the project. No tracking is used for targeted advertising.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">11. Changes & Project Status</h2>
            <p>
              This is an <strong>early-stage personal project</strong> and may be modified, paused, or discontinued at any time without notice. This Legal page may be updated from time to time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">12. Contact</h2>
            <p>For questions, feedback, or removal requests, please contact the site administration.</p>
            <div className="mt-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="text-slate-600 font-medium italic">
                    globaledvantagein@gmail.com
                </span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}