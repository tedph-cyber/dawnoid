"use client";
import { Card } from '@/components/ui/card'
import { FaStar, FaQuoteLeft, FaHeart } from 'react-icons/fa'

export default function Testimonials() {
  const clientTestimonials = [
    {
      quote:
        "DawnOID transformed our wedding with their impeccable planning and attention to detail. Every moment was perfect!",
      author: "Jane Doe",
      role: "Bride",
      image: "/images/testimonials/jane.jpg",
      jobrole: "Wedding Planning and Decoration",
      rating: 5,
    },
    {
      quote:
        "The team at DawnOID delivered an unforgettable corporate event that impressed all our attendees. Highly recommend!",
      author: "John Smith",
      role: "CEO",
      image: "/images/testimonials/john.jpg",
      jobrole: "Corporate Event Planning",
      rating: 5,
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaHeart className="text-primary text-xl sm:text-2xl" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
              What Our Clients Say
            </h2>
            <FaHeart className="text-primary text-xl sm:text-2xl" />
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Testimonials that reflect our commitment to excellence and service in every project we undertake
          </p>
        </div>
        {/* Testimonials Grid */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 md:grid-cols-2">
          {clientTestimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative p-6 sm:p-8 bg-card border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaQuoteLeft className="text-4xl sm:text-5xl text-primary" />
              </div>
              
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm sm:text-base" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm sm:text-base lg:text-lg text-foreground italic mb-6 leading-relaxed relative z-10">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-linear-to-r from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 ring-2 ring-primary/10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">${testimonial.author.charAt(0)}</div>`;
                      }
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">
                    {testimonial.author}
                  </h4>
                  <p className="text-xs sm:text-sm text-primary font-medium">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {testimonial.jobrole}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Testimonial Submission Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Share Your Experience
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We'd love to hear about your experience with DawnOID. Your feedback helps us continue delivering excellence.
              </p>
            </div>

            <form
              className="space-y-4 sm:space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as HTMLFormElement;
                const data = Object.fromEntries(new FormData(target).entries());
                console.log("testimonial submit", data);
                target.reset();
                alert("Thank you for sharing your experience! We appreciate your feedback.");
              }}
            >
              {/* Name and Email Row */}
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name *
                  </label>
                  <input
                    name="author"
                    placeholder="Enter your full name"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email (Optional)
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Role and Rating Row */}
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Role
                  </label>
                  <input
                    name="role"
                    placeholder="e.g., Bride, CEO, Event Organizer"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Rating (Optional)
                  </label>
                  <select
                    name="rating"
                    defaultValue=""
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base"
                  >
                    <option value="" disabled>
                      Select a rating
                    </option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Very Good</option>
                    <option value="3">⭐⭐⭐ Good</option>
                    <option value="2">⭐⭐ Fair</option>
                    <option value="1">⭐ Poor</option>
                  </select>
                </div>
              </div>

              {/* Testimonial Text */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Testimonial *
                </label>
                <textarea
                  name="quote"
                  required
                  rows={4}
                  placeholder="Tell us about your experience with DawnOID. What made it special?"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-sm sm:text-base"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl"
                >
                  <FaHeart className="text-sm" />
                  Submit Testimonial
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}