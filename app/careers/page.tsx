import { Briefcase, TrendingUp, Users, Heart } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Careers at Jumian</h1>

      <div className="max-w-4xl">
        <section className="mb-12">
          <p className="text-xl text-gray-700 mb-6">
            Join our team and help us revolutionize e-commerce in Africa. We're always looking for talented individuals who are passionate about technology and innovation.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TrendingUp className="mb-4 text-jumia-orange" size={32} />
              <h3 className="font-bold mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">Continuous learning and development programs to help you grow your career</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="mb-4 text-jumia-orange" size={32} />
              <h3 className="font-bold mb-2">Great Team</h3>
              <p className="text-gray-600">Work with talented and passionate people who love what they do</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Briefcase className="mb-4 text-jumia-orange" size={32} />
              <h3 className="font-bold mb-2">Competitive Benefits</h3>
              <p className="text-gray-600">Attractive salary packages, health insurance, and other benefits</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Heart className="mb-4 text-jumia-orange" size={32} />
              <h3 className="font-bold mb-2">Work-Life Balance</h3>
              <p className="text-gray-600">Flexible working arrangements and supportive culture</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-jumia-orange">
              <h3 className="font-bold text-lg mb-2">Software Engineer</h3>
              <p className="text-gray-600 mb-2">Technology · Full Time · Nairobi</p>
              <p className="text-sm text-gray-500">Join our engineering team to build scalable solutions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-jumia-orange">
              <h3 className="font-bold text-lg mb-2">Product Manager</h3>
              <p className="text-gray-600 mb-2">Product · Full Time · Nairobi</p>
              <p className="text-sm text-gray-500">Lead product strategy and development</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-jumia-orange">
              <h3 className="font-bold text-lg mb-2">Customer Service Representative</h3>
              <p className="text-gray-600 mb-2">Customer Service · Full Time · Nairobi</p>
              <p className="text-sm text-gray-500">Help our customers have the best experience</p>
            </div>
          </div>
        </section>

        <section className="bg-jumia-orange text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="mb-6">
            Send your CV and cover letter to careers@jumian.ke
          </p>
          <button className="bg-white text-jumia-orange px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
            Apply Now
          </button>
        </section>
      </div>
    </div>
  );
}
