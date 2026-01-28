import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from "sonner";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      toast.error("Please fill all fields");
      return;
    }
    
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-showmoore-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We'd love to hear from you. Reach out with questions, feedback, or suggestions.
          </p>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <MapPin className="h-8 w-8 text-showmoore-600" />,
                title: "Visit Us",
                details: [
                  "123 Fashion Avenue",
                  "Style District",
                  "New York, NY 10001"
                ]
              },
              {
                icon: <Phone className="h-8 w-8 text-showmoore-600" />,
                title: "Call Us",
                details: [
                  "+1 (555) 123-4567",
                  "+1 (555) 987-6543"
                ]
              },
              {
                icon: <Mail className="h-8 w-8 text-showmoore-600" />,
                title: "Email Us",
                details: [
                  "info@showmoore.com",
                  "support@showmoore.com"
                ]
              },
              {
                icon: <Clock className="h-8 w-8 text-showmoore-600" />,
                title: "Opening Hours",
                details: [
                  "Monday-Friday: 9am - 6pm",
                  "Saturday: 10am - 4pm",
                  "Sunday: Closed"
                ]
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="inline-block mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <div className="space-y-2">
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                <p className="text-gray-600">
                  Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message here..."
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
            
            {/* Map and Social Media */}
            <div className="space-y-8">
              {/* Map */}
              <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  title="Showmoore Location"
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2408901032013!2d-73.99097882401256!3d40.75051997138805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b30eac9f%3A0xaca8d930bacf8c15!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1690892436044!5m2!1sen!2sus"
                  allowFullScreen
                  loading="lazy"
                  style={{ border: 0 }}
                ></iframe>
              </div>
              
              {/* Other Contact Methods */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-showmoore-600" />
                  Other Ways to Connect
                </h3>
                <p className="text-gray-600 mb-6">
                  Follow us on social media for the latest updates, styling tips, and exclusive offers.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-2">Customer Service Hours</h4>
                  <p className="text-gray-600">
                    Our team is available Monday through Friday, 9:00 AM to 6:00 PM EST.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find quick answers to common questions about our services
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What are your shipping options?",
                answer: "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery for select locations. Shipping costs vary based on location and chosen method."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email. You can also log into your account and view your order status in the 'My Orders' section."
              },
              {
                question: "What is your return policy?",
                answer: "We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Return shipping is free for exchanges or store credit returns."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days, depending on the destination and local customs procedures."
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
