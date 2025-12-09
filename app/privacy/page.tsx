export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl">
        <p className="text-sm text-gray-500 mb-6">Last Updated: January 2025</p>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, place an order, or contact us.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
          <p>We use your information to process orders, provide customer service, and improve our platform.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p>For privacy questions, contact us at privacy@jumian.ke</p>
        </section>
      </div>
    </div>
  );
}
