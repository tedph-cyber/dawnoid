import { Card } from '@/components/ui/card'
import { Heart } from 'lucide-react';
import { GemIcon } from 'lucide-react';
import { FcCustomerSupport } from 'react-icons/fc';
import { ClockIcon } from 'lucide-react';
export default function WhyUs() {
    const features = [
        {
            icon: <Heart className="h-6 w-6" aria-hidden />,
            title: "Faith-Centered",
            description: "Every service and product is delivered with integrity and Christian values at the core.",
        },
        {
            icon: <GemIcon className="h-6 w-6" aria-hidden />,
            title: "Premium Quality",
            description: "Only the finest materials and craftsmanship meet our standards of excellence.",
        },
        {
            icon: <FcCustomerSupport className="h-7 w-7" aria-hidden />,
            title: "Customer Support",
            description: "Our team is always ready to assist you with any inquiries or issues.",
        },
        {
            icon: <ClockIcon className="h-6 w-6" aria-hidden />,
            title: "Timely Delivery",
            description: "We respect your time and ensure timely delivery of all projects.",
        },
    ];

    return (
        <section className="py-12 bg-muted/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                        Why Choose Us
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        At DawnOID, we prioritize innovation, quality, and customer satisfaction. Our team is dedicated to delivering top-notch solutions tailored to your needs.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <Card key={feature.title} className="p-6 flex flex-col items-start gap-4 rounded-xl bg-card shadow-sm hover:shadow-lg transition-shadow">
                            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-card-foreground">{feature.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}