import React from "react";
import { ArrowLeft, FileText, Shield } from "lucide-react";

// Terms of Use Component
export const Terms = ({ darkMode, onBack }) => {
  const lastUpdated = "January 15, 2024";

  return (
    <div className={`flex flex-col min-h-screen ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
    } pb-20`}>
      
      {/* Header */}
      <div className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b px-4 py-4`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`p-2 rounded-xl ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } transition-colors`}
          >
            <ArrowLeft className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-900"}`} />
          </button>
          <div className="flex items-center gap-2">
            <FileText className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Terms of Use
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4">
        <div className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        } border rounded-2xl p-6 shadow-sm`}>
          
          <div className="mb-6">
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className={`prose max-w-none ${darkMode ? "prose-invert" : ""}`}>
            <div className="space-y-6 text-sm">
              
              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  1. Acceptance of Terms
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  By accessing and using this application, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do 
                  not use this service.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  2. Use License
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Permission is granted to temporarily download one copy of the materials on our 
                  application for personal, non-commercial transitory viewing only. This is the 
                  grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className={`list-disc pl-6 mb-3 space-y-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <li>modify or copy the materials;</li>
                  <li>use the materials for any commercial purpose or for any public display;</li>
                  <li>attempt to decompile or reverse engineer any software contained in the application;</li>
                  <li>remove any copyright or other proprietary notations from the materials.</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  3. User Accounts
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  When you create an account with us, you must provide information that is accurate, 
                  complete, and current at all times. You are responsible for safeguarding the password 
                  and for ensuring the security of your account.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  4. Prohibited Uses
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  You may not use our application:
                </p>
                <ul className={`list-disc pl-6 mb-3 space-y-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <li>For any unlawful purpose or to solicit others to perform illegal acts;</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances;</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate;</li>
                  <li>To submit false or misleading information.</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  5. Payment and Refunds
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  All payments made through our application are processed securely. Refunds are available 
                  within 7 days of purchase for eligible items, subject to our refund policy. Digital 
                  products may have different refund terms.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  6. Disclaimer
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  The materials on our application are provided on an 'as is' basis. We make no 
                  warranties, expressed or implied, and hereby disclaim and negate all other warranties 
                  including, without limitation, implied warranties or conditions of merchantability, 
                  fitness for a particular purpose, or non-infringement of intellectual property or 
                  other violation of rights.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  7. Limitations
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  In no event shall our company or its suppliers be liable for any damages (including, 
                  without limitation, damages for loss of data or profit, or due to business interruption) 
                  arising out of the use or inability to use the materials on our application.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  8. Governing Law
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  These terms and conditions are governed by and construed in accordance with the laws 
                  of India and you irrevocably submit to the exclusive jurisdiction of the courts in 
                  that State or location.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  9. Changes to Terms
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at 
                  any time. If a revision is material, we will try to provide at least 30 days notice 
                  prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  10. Contact Information
                </h2>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  If you have any questions about these Terms of Use, please contact us at 
                  support@yourapp.com or through our in-app support system.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Component
export const PrivacyPolicy = ({ darkMode, onBack }) => {
  const lastUpdated = "January 15, 2024";

  return (
    <div className={`flex flex-col min-h-screen ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
    } pb-20`}>
      
      {/* Header */}
      <div className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b px-4 py-4`}>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className={`p-2 rounded-xl ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } transition-colors`}
          >
            <ArrowLeft className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-900"}`} />
          </button>
          <div className="flex items-center gap-2">
            <Shield className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Privacy Policy
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4">
        <div className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        } border rounded-2xl p-6 shadow-sm`}>
          
          <div className="mb-6">
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className={`prose max-w-none ${darkMode ? "prose-invert" : ""}`}>
            <div className="space-y-6 text-sm">
              
              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  1. Information We Collect
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact us for support. This may include:
                </p>
                <ul className={`list-disc pl-6 mb-3 space-y-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Account credentials and preferences</li>
                  <li>Payment information (processed securely by third-party processors)</li>
                  <li>Communication data when you contact us</li>
                  <li>Location data (with your permission)</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  2. How We Use Your Information
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  We use the information we collect to:
                </p>
                <ul className={`list-disc pl-6 mb-3 space-y-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Personalize your experience and show relevant content</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  3. Information Sharing
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  We do not sell, trade, or rent your personal information to third parties. We may 
                  share your information only in the following circumstances:
                </p>
                <ul className={`list-disc pl-6 mb-3 space-y-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With service providers who assist our operations</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  4. Data Security
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className={`list-disc pl-6 mb-3 space-y-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  5. Your Rights and Choices
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  You have the right to:
                </p>
                <ul className={`list-disc pl-6 mb-3 space-y-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Control location data sharing</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  6. Cookies and Tracking
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  We use cookies and similar technologies to enhance your experience, analyze usage, 
                  and provide personalized content. You can control cookie settings through your 
                  device or browser settings.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  7. Children's Privacy
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Our service is not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you are a parent and believe 
                  your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  8. International Data Transfers
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place to protect your data in accordance with 
                  applicable privacy laws.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  9. Changes to This Policy
                </h2>
                <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new policy in the app and updating the "Last updated" 
                  date.
                </p>
              </section>

              <section>
                <h2 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  10. Contact Us
                </h2>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  If you have any questions about this Privacy Policy or our data practices, please 
                  contact us at privacy@yourapp.com or through our in-app support system.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};