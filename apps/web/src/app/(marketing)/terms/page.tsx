export default function Terms() {
  const updated = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-neutral-900 mb-2">
        Terms &amp; Conditions
      </h1>
      <p className="text-sm text-neutral-400 mb-10">Last updated: {updated}</p>

      <div className="space-y-8 text-neutral-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            1. About OpenD2C
          </h2>
          <p>
            OpenD2C is a directory and discovery platform for direct-to-consumer
            (D2C) brands in India. By submitting your details or using this
            website, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            2. Listing fees
          </h2>
          <p>
            We will not charge brands a fee per listing on OpenD2C. Your brand
            page is free to create and maintain. We may, however, introduce
            optional paid features or premium placements in the future, and we
            will communicate any such changes clearly in advance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            3. Advertising
          </h2>
          <p>
            To cover server and operational costs, we may display advertising on
            the OpenD2C website in the future. Advertising will not affect the
            neutral listing of brands or bias discovery results.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            4. Your information
          </h2>
          <p>
            Information you provide — including your name, company name, GST
            number, email, and website — is used solely to create and maintain
            your listing on OpenD2C and to contact you about the platform. We
            will not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            5. Accuracy of information
          </h2>
          <p>
            You are responsible for ensuring that all information you submit is
            accurate, current, and does not violate any applicable laws. OpenD2C
            reserves the right to remove listings that contain false, misleading,
            or unlawful content.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            6. Intellectual property
          </h2>
          <p>
            You retain ownership of your brand name, logo, and content. By
            submitting to OpenD2C, you grant us a non-exclusive, royalty-free
            licence to display your brand information on the platform for the
            purpose of enabling discovery.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            7. Limitation of liability
          </h2>
          <p>
            OpenD2C is provided &ldquo;as is&rdquo;. We are not liable for any
            indirect, incidental, or consequential damages arising from your use
            of the platform or reliance on information found here.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            8. Changes to these terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of
            OpenD2C after changes are posted constitutes acceptance of the
            revised terms. We will always display the date of the last update at
            the top of this page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            9. Governing law
          </h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be
            subject to the exclusive jurisdiction of the courts of Delhi, India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            10. Contact
          </h2>
          <p>
            For questions about these terms, reach us at{" "}
            <a
              href="mailto:hello@opend2c.in"
              className="underline hover:text-neutral-900"
            >
              hello@opend2c.in
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
