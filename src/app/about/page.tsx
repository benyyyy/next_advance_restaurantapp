import React from "react";
import Image from 'next/image'
const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">About Us</h1>
        <p className="text-lg text-gray-700">
          Welcome to Contriverz restaurant, where we bring you the best culinary experiences. 
          Our chefs craft exquisite dishes using fresh ingredients to ensure every bite is delightful.
        </p>
      </div>
      <div className="mt-12 flex justify-center">
      <Image
      src="https://media.istockphoto.com/id/1248298359/photo/luxury-restaurant-interior-at-night.jpg?s=612x612&w=0&k=20&c=Uy2slhNJFTcHdQfRG5bSsOsFfl7J10a5ub5ZVofk-6c="
      alt="Picture of the author"
      width={1000}
      height={500}
    />
        
      </div>
    </div>
  );
};

export default About;
