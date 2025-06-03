import { useState } from 'react';
import logo from '../assets/logo.png';
import heroImg from '../assets/hero.png';
import loc1 from '../assets/location1.png';
import loc2 from '../assets/location2.png';
import loc3 from '../assets/location3.png';

const clinics = [
  {
    name: 'Pawsville',
    desc: 'Located at the heart of VetClinic Poznan...',
    image: loc1,
  },
  {
    name: 'Barktown',
    desc: 'Find us at 456 Furry Friend Road in vibrant Wroclaw...',
    image: loc2,
  },
  {
    name: 'Meow City',
    desc: 'Situated at 789 Whisker Way, our clinic in Gdansk...',
    image: loc3,
  },
];

const faqs = [
  {
    question: 'What is VetClinic Poznan?',
    answer:
      'VetClinic Poznań is a modern veterinary clinic based in Poznań...',
  },
  {
    question: 'What is Pawcare?',
    answer:
      'Pawcare is an online platform that helps pet owners easily book appointments...',
  },
  {
    question: 'How can I book consultation?',
    answer:
      'You can book a consultation by clicking the "Book Now" button...',
  },
];

export default function Blog() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="font-sans text-gray-800">
      <section
        className="relative h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center">
          <img src={logo} alt="VetClinic Logo" className="w-32 mb-4" />
          <h1 className="text-4xl font-bold">Welcome to VetClinic</h1>
          <p className="mt-4 text-xl max-w-xl">
            Compassionate care for your furry family members.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clinics.map((clinic, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
              <img src={clinic.image} alt={clinic.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{clinic.name}</h3>
                <p className="text-gray-600 text-sm">{clinic.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left py-2 font-medium text-lg"
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <p className="py-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </section>

      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} VetClinic. All rights reserved.
      </footer>
    </div>
  );
}
