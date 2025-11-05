import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Biography from '@/components/Biography';
import Testimonials from '@/components/Testimonials';
import ContactFooter from '@/components/ContactFooter';

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Biography />
      <Testimonials />
      <ContactFooter />
    </main>
  );
}

