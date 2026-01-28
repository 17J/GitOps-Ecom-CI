
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, Truck, Shield, Award, Users, Mail } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-showmoore-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Showmoore</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The story behind your favorite fashion destination
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-showmoore-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551446591-142875a901a1?q=80&w=1080" 
                alt="Our Story" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Founded in 2020, Showmoore began with a simple mission: to provide high-quality fashion that doesn't compromise on style, sustainability, or affordability.
              </p>
              <p className="text-gray-700">
                What started as a small online boutique has grown into a beloved fashion destination for thousands of customers worldwide. Our commitment to quality, customer satisfaction, and responsible business practices has remained unwavering throughout our journey.
              </p>
              <p className="text-gray-700">
                Today, Showmoore offers a curated collection of apparel and accessories for men, women, and children, carefully selected to help our customers express their unique style while feeling good about their purchase.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-showmoore-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at Showmoore
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-showmoore-600" />,
                title: "Quality Assurance",
                description: "We rigorously test all our products to ensure they meet our high standards for quality and durability."
              },
              {
                icon: <Award className="h-10 w-10 text-showmoore-600" />,
                title: "Customer First",
                description: "Our customers are at the heart of everything we do. We constantly strive to exceed expectations."
              },
              {
                icon: <Users className="h-10 w-10 text-showmoore-600" />,
                title: "Ethical Practices",
                description: "We're committed to fair labor practices and working with suppliers who share our values."
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-block mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Showmoore</h2>
            <div className="w-20 h-1 bg-showmoore-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="h-8 w-8 text-showmoore-600" />,
                title: "Premium Quality",
                description: "Our products are crafted from high-quality materials that look good and last longer."
              },
              {
                icon: <Truck className="h-8 w-8 text-showmoore-600" />,
                title: "Fast Shipping",
                description: "We offer quick and reliable shipping to get your order to you as soon as possible."
              },
              {
                icon: <Clock className="h-8 w-8 text-showmoore-600" />,
                title: "24/7 Support",
                description: "Our customer service team is always available to help with any questions or concerns."
              },
              {
                icon: <Shield className="h-8 w-8 text-showmoore-600" />,
                title: "Secure Payment",
                description: "Shop with confidence knowing your payment information is always protected."
              },
              {
                icon: <Users className="h-8 w-8 text-showmoore-600" />,
                title: "Satisfied Customers",
                description: "Join thousands of happy customers who love shopping with Showmoore."
              },
              {
                icon: <Mail className="h-8 w-8 text-showmoore-600" />,
                title: "Regular Updates",
                description: "Subscribe to our newsletter to stay updated on new arrivals and exclusive offers."
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-showmoore-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the passionate people behind Showmoore
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/women/23.jpg",
                bio: "With over 15 years in the fashion industry, Sarah brings her passion for sustainable fashion to Showmoore."
              },
              {
                name: "Michael Chen",
                role: "Head of Design",
                image: "https://randomuser.me/api/portraits/men/54.jpg",
                bio: "Michael's innovative designs and attention to detail help create Showmoore's signature aesthetic."
              },
              {
                name: "Emily Rodriguez",
                role: "Customer Experience",
                image: "https://randomuser.me/api/portraits/women/65.jpg",
                bio: "Emily ensures every customer interaction with Showmoore exceeds expectations."
              },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-showmoore-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-showmoore-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Showmoore?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have made Showmoore their go-to fashion destination.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button className="bg-gold text-showmoore-800 hover:bg-gold-light">
                Shop Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
