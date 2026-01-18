const companies = [
  'Intel',
  'Google',
  'HubSpot',
  'Salesforce',
  'Stripe',
  'Microsoft',
]

export default function CompanyLogos() {
  return (
    <section className="py-12 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
          {companies.map((company, index) => (
            <div
              key={index}
              className="text-white text-xl md:text-2xl font-semibold hover:opacity-100 transition-opacity cursor-pointer"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
