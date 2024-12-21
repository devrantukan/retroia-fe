import Image from "next/image";
import { MapPin } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="Real estate cityscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About Pinnacle Realty
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Your trusted partner in finding the perfect property since 1995
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Our Story
            </h2>
            <p className="text-lg mb-4">
              Pinnacle Realty was founded with a vision to revolutionize the
              real estate industry. For over 25 years, we&apos;ve been dedicated
              to helping our clients find their dream homes and make smart
              investment decisions.
            </p>
            <p className="text-lg mb-4">
              Our team of experienced professionals combines local expertise
              with cutting-edge technology to provide unparalleled service. We
              pride ourselves on our integrity, attention to detail, and
              commitment to exceeding our clients&apos; expectations.
            </p>
            <p className="text-lg">
              Whether you&apos;re a first-time homebuyer, seasoned investor, or
              looking to sell your property, Pinnacle Realty is here to guide
              you every step of the way.
            </p>
          </div>
        </section>

        {/* Our Offices Section */}
        <section className="py-16 px-4 md:px-8 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Our Offices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Image
                    src={office.image}
                    alt={`${office.city} office`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {office.city}
                    </h3>
                    <p className="text-gray-600 mb-4">{office.address}</p>
                    <div className="flex items-center text-blue-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>View on map</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-2">{member.position}</p>
                  <p className="text-sm text-gray-500">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const offices = [
  {
    city: "New York City",
    address: "123 Broadway, New York, NY 10001",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    city: "Los Angeles",
    address: "456 Sunset Blvd, Los Angeles, CA 90028",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    city: "Chicago",
    address: "789 Michigan Ave, Chicago, IL 60611",
    image: "/placeholder.svg?height=300&width=400",
  },
];

const teamMembers = [
  {
    name: "Sarah Johnson",
    position: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "With over 20 years of experience, Sarah leads our team with passion and expertise.",
  },
  {
    name: "Michael Chen",
    position: "Senior Real Estate Agent",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Michael's negotiation skills and market knowledge make him an invaluable asset to our clients.",
  },
  {
    name: "Emily Rodriguez",
    position: "Marketing Director",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Emily's innovative strategies keep Pinnacle Realty at the forefront of the industry.",
  },
  {
    name: "David Thompson",
    position: "Commercial Real Estate Specialist",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "David's expertise in commercial properties has helped numerous businesses find their ideal locations.",
  },
  {
    name: "Olivia Patel",
    position: "Client Relations Manager",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "Olivia ensures our clients receive personalized attention and support throughout their journey.",
  },
  {
    name: "James Wilson",
    position: "Luxury Property Expert",
    image: "/placeholder.svg?height=200&width=200",
    description:
      "James specializes in high-end properties, providing white-glove service to discerning clients.",
  },
];
