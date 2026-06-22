import { Sparkles, Shield, Truck } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';

const features = [
  {
    icon: Sparkles,
    title: 'Personalization Experts',
    description: 'Custom engraving and printing for truly unique gifts that tell your story',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Premium materials and careful curation in every box we create',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Order today, celebrate tomorrow with express shipping across Kuwait',
  },
];

export function WhyChooseUs() {
  return (
    <Section className="bg-gradient-to-b from-white to-bg">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-dark mb-4">
            Why Choose Giftora
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            We're passionate about creating meaningful moments through thoughtfully curated gifts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center group hover:scale-105 transition-transform duration-200"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                <feature.icon size={28} />
              </div>
              <h3 className="font-serif text-2xl text-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
