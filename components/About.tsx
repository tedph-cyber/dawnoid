import { FaCalendar, FaCross, FaPeopleArrows } from "react-icons/fa";
import { Heart, StarIcon, GemIcon, Handshake } from "lucide-react";
import { Card } from "./ui/card";

export default function About() {
  const successMetrics = [
    {
      icon: StarIcon,
      title: "5.0",
      subtitle: "Average rating",
    },
    {
      icon: FaCalendar,
      title: "5+",
      subtitle: "Years of Service",
    },
    {
      icon: FaPeopleArrows,
      title: "500+",
      subtitle: "Happy Clients",
    },
    {
      icon: Heart,
      title: "1000+",
      subtitle: "Events Planned",
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
            Our Story
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to DawnOID, where we blend faith and technology to create
            innovative solutions that inspire and empower.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Born from Faith, Driven by Excellence
            </h3>
            <div className="space-y-4 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              <p>
                DawnOID Enterprise was founded on the belief that every product and
                service should reflect the highest standards of quality while honoring
                God in all we do. Our journey began with a simple vision: to create a
                business that serves others with integrity, grace and unwavering
                commitment to excellence.
              </p>
              <p>
                From our carefully curated collection of premium footwear and
                fragrances to our comprehensive event planning services, every aspect
                of our business is infused with Christian values and a dedication to
                exceeding expectations.
              </p>
            </div>
          </div>
        </div>
        {/* Success Metrics */}
        <div className="mb-8 sm:mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {successMetrics.map((metric, index) => (
              <div 
                key={metric.title} 
                className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white mb-3 sm:mb-4">
                  <metric.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {metric.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-300 font-medium">
                  {metric.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0 ring-1 ring-gray-200 dark:ring-gray-700">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed italic">
                "To serve our community with products and services that reflect the
                highest standards of quality, integrity, and Christian values, while
                creating memorable experiences that bring joy and honor to God"
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center rounded-full bg-linear-to-r from-red-500 to-pink-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <FaCross className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Faith-Centered
                </h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Every decision and action is guided by Christian principles and
                  values.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center rounded-full bg-linear-to-r from-emerald-500 to-teal-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <GemIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Quality Excellence
                </h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  We are committed to delivering only the finest products and
                  services.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-indigo-600 text-white group-hover:scale-110 transition-transform duration-300">
                  <Handshake className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Service Excellence
                </h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our customers are at the heart of everything we do, and we
                  strive to exceed their expectations.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
