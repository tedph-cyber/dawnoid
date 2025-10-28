"use client";
import {Card} from '@/components/ui/card'
export default function Testimonials() {
  const clientTestimonials = [
    {
      quote:
        "DawnOID transformed our wedding with their impeccable planning and attention to detail. Every moment was perfect!",
      author: "Jane Doe",
      role: "Bride",
      image: "/images/testimonials/jane.jpg",
      jobrole: "Wedding Planning and Decoration",
    },
    {
      quote:
        "The team at DawnOID delivered an unforgettable corporate event that impressed all our attendees. Highly recommend!",
      author: "John Smith",
      role: "CEO",
      image: "/images/testimonials/john.jpg",
      jobrole: "Corporate Event Planning",
    },
  ];

  return (
    <section className="py-12 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex justify-center">
      <div className="w-full max-w-5xl px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            What our clients say
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
            Testimonials that reflect our commitment to excellence and service
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {clientTestimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-700 dark:text-gray-200 italic mb-4">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-gray-400">{testimonial.jobrole}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-6 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Share your experience
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            We'd love to hear about your experience. Submit a short testimonial
            below.
          </p>

          <form
            className="grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              const data = Object.fromEntries(new FormData(target).entries());
              // Replace this with real submit logic (API call) as needed
              console.log("testimonial submit", data);
              target.reset();
              alert("Thanks for sharing your experience!");
            }}
          >
            <div className="grid md:grid-cols-2 gap-3">
              <input
                name="author"
                placeholder="Your name"
                required
                className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
              />
              <input
                name="email"
                type="email"
                placeholder="Email (optional)"
                className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
              />
            </div>

            <input
              name="role"
              placeholder="Your role (e.g., Bride, CEO)"
              className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
            />

            <textarea
              name="quote"
              required
              rows={4}
              placeholder="Share your testimonial"
              className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm resize-none"
            />

            <div className="flex items-center justify-between gap-3">
              <select
                name="rating"
                defaultValue=""
                className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
              >
                <option value="" disabled>
                  Rating (optional)
                </option>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>

              <button
                type="submit"
                className="ml-auto inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}