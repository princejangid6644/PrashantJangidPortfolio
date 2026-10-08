import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="outline" className="glass border-blue-500/30 text-white hover:bg-blue-500/20 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="glass p-8 sm:p-12 rounded-3xl border border-blue-500/20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center glow-blue">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold gradient-text">Privacy Policy</h1>
            </div>

            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                <p className="leading-relaxed">
                  Welcome to Prashant Jangid's portfolio website. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or contact us through our forms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                <p className="leading-relaxed mb-4">
                  When you use our contact form, we collect:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your name</li>
                  <li>Email address</li>
                  <li>Project details you provide</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <p className="leading-relaxed mb-4">
                  The information you provide is used solely to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Respond to your inquiries</li>
                  <li>Discuss potential video editing projects</li>
                  <li>Provide you with information about our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Safety and Security</h2>
                <p className="leading-relaxed">
                  We take the security of your personal information seriously. Your contact form data is transmitted securely through Instagram Direct Messages. We do not store your information on our servers or share it with any third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Third-Party Platforms</h2>
                <p className="leading-relaxed mb-4">
                  Our website integrates with the following third-party platforms:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>YouTube</strong> - For video hosting and playback</li>
                  <li><strong>Instagram</strong> - For direct messaging and social media contact</li>
                  <li><strong>WhatsApp</strong> - For instant messaging communication</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  These platforms have their own privacy policies, and we encourage you to review them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">No Data Selling</h2>
                <p className="leading-relaxed">
                  We never sell, rent, or trade your personal information to third parties. Your privacy is important to us, and we respect your trust.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
                <p className="leading-relaxed">
                  Our website uses minimal cookies and local storage only for essential functionality, such as maintaining admin session state. We do not use cookies for advertising or tracking purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                <p className="leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Request information about the data we have collected</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of communications at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy or how we handle your data, please contact us at:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong>Email:</strong> princejangid6644@gmail.com</p>
                  <p><strong>Instagram:</strong> @asthetic._prince</p>
                  <p><strong>WhatsApp:</strong> +91 9351664400</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
                <p className="mt-4 text-gray-400">
                  <strong>Last Updated:</strong> January 25, 2026
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
