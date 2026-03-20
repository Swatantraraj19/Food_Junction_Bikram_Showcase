import { CheckCircle } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-20 md:py-28 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Images Side */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="/About_img1.jpeg"
                                alt="Premium Restaurant Ambience at Food Junction Bikram, Patna"
                                className="rounded-2xl shadow-lg w-full h-72 md:h-90 object-cover hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                decoding="async"
                            />
                            <img
                                src="/About_img2.webp"
                                alt="Delicious Multi-Cuisine Meal served at Food Junction"
                                className="rounded-2xl shadow-lg w-full h-72 md:h-90 object-cover transform translate-y-8 md:translate-y-12 hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        {/* Premium Medal Aesthetic for EST Year */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-40 md:h-40 flex flex-col items-center justify-center rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(212,175,55,0.05)] border-8 border-white z-10 group hover:scale-110 transition-transform duration-700">
                            <div className="absolute inset-1.5 border border-brand-primary/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
                            <span className="text-3xl md:text-4xl font-black text-brand-dark tracking-tighter leading-none mb-0.5">2026</span>
                            <div className="h-[2px] w-6 bg-brand-primary/30 mb-0.5 rounded-full"></div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Est. Year</span>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="relative lg:pl-10 text-center lg:text-left mt-10 lg:mt-0">
                        <div className="inline-block mb-3">
                            <span className="text-brand-primary font-bold tracking-[0.2em] uppercase text-sm border-b-2 border-brand-primary/30 pb-1">Our Story</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-dark mb-8 leading-tight">
                            Experience the Taste of <span className="text-brand-primary italic">Tradition</span>
                        </h2>
                        
                        <div className="space-y-4 text-gray-600 text-base md:text-lg text-justify lg:text-left leading-relaxed font-light">
                            <p>
                                Welcome to <span className="font-semibold text-brand-dark tracking-wide">Food Junction Bikram</span>, where every meal is a celebration of flavor. Located in the heart of Bikram, Patna, we bring you a diverse culinary experience ranging from authentic Indian curries to zesty fast food favorites.
                            </p>
                            <p>
                                Our mission is simple: to serve fresh, hygienic, and delicious food in a warm, family-friendly environment. Whether it's a birthday bash or a quiet dinner, we are here to make every moment memorable.
                            </p>
                        </div>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-2 gap-y-5 gap-x-4 mt-10 text-left w-full max-w-lg mx-auto lg:mx-0">
                            {[
                                "Fresh Ingredients",
                                "Family Atmosphere",
                                "Hygiene Focused",
                                "Best Chefs",
                                "Live Kitchen",
                                "Party Hall"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3 group">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 group-hover:bg-red-100 transition-colors">
                                        <CheckCircle className="text-brand-primary" size={18} strokeWidth={2.5} />
                                    </div>
                                    <span className="font-bold text-sm md:text-base text-gray-800 tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
