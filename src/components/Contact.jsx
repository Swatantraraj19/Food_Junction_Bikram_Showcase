import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Instagram, MessageCircle, Youtube } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
    const whatsappNumber = "910000000000";
    const phoneNumber = "+91 00000 00000";
    const email = "hello@foodjunctionbikram.in";

    const contactInfo = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Visit Us",
            content: "Your Street, Your City, Your State, 000000",
            link: "https://maps.google.com",
            label: "Get Directions"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Call Us",
            content: phoneNumber,
            link: `tel:${phoneNumber.replace(/\s/g, '')}`,
            label: "Dial Now"
        },
        
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Opening Hours",
            content: "Mon - Sun: 10:00 AM - 11:00 PM",
            link: "#",
            label: "Open Now"
        }
    ];

    const socialLinks = [
        { name: 'Instagram', url: 'https://instagram.com/yourhandle', icon: <Instagram size={18} /> },
        { name: 'YouTube', url: 'https://youtube.com/yourchannel', icon: <Youtube size={18} /> },
        { name: 'WhatsApp', url: `https://wa.me/${whatsappNumber}`, icon: <MessageCircle size={18} /> },
        { name: 'Email', url: `mailto:${email}`, icon: <Mail size={18} /> },
    ];

    return (
        <section id="contact" className="pt-12 pb-24 md:pt-16 md:pb-32 bg-[#faf9f6] relative overflow-hidden scroll-mt-24">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[40%] h-full bg-brand-primary/5 -skew-x-12 transform translate-x-1/2 pointer-events-none z-0"></div>
            
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    
                    {/* Left Side: Invitation Content */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className="w-8 h-[1px] bg-brand-primary"></div>
                                <span className="text-brand-primary font-bold tracking-[0.4em] uppercase text-xs">Reach Out</span>
                                <div className="w-8 h-[1px] bg-brand-primary"></div>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-8 leading-tight">
                                Join Us <br />
                                <span className="text-brand-primary italic">at the Table</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-lg mb-10 font-light italic">
                                From family celebrations in our Party Hall to a quick craving fix, we bring the best of Patna's flavors to your plate.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                            {contactInfo.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => toast.error(`Contact link for ${item.title} is disabled.`, { position: 'bottom-center' })}
                                    className="cursor-pointer group flex items-center p-5 bg-white/70 backdrop-blur-sm border border-black/[0.03] rounded-3xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-15px_rgba(212,175,55,0.15)] transition-all duration-500 hover:bg-white"
                                >
                                    <div className="w-14 h-14 shrink-0 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                                        {item.icon}
                                    </div>
                                    <div className="ml-5 flex-1 pr-4">
                                        <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">{item.title}</h4>
                                        <p className="text-brand-dark font-medium leading-tight group-hover:text-brand-primary transition-colors">{item.content}</p>
                                    </div>
                                    <div className="hidden sm:flex items-center justify-center w-24 h-8 border border-brand-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                        <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest">{item.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="mt-14 pt-10 border-t border-brand-primary/10 flex flex-wrap items-center gap-6"
                        >
                            <span className="text-brand-dark font-bold text-[10px] uppercase tracking-[0.4em]">Follow the Taste</span>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, idx) => (
                                        <div 
                                            key={idx}
                                            onClick={() => toast.error('Social links are disabled in this demo.', { position: 'bottom-center' })}
                                            className="w-11 h-11 rounded-full bg-white border border-black/5 flex items-center justify-center text-gray-400 hover:text-brand-primary hover:border-brand-primary hover:shadow-lg transition-all cursor-pointer"
                                        >
                                            {social.icon}
                                        </div>
                                    ))}
                                </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Visual Map Frame */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-full lg:w-1/2 relative group"
                    >
                        {/* Map Architecture */}
                        <div className="relative z-10 w-full aspect-[1/1] sm:aspect-[4/3] lg:aspect-[5/6] rounded-[3.5rem] overflow-hidden bg-white shadow-2xl p-3 border border-black/5 transition-transform duration-700 hover:scale-[1.01]">
                            <div className="w-full h-full rounded-[2.8rem] overflow-hidden relative">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.58!2d84.8!3d25.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI3JzM5LjAiTiA4NMKwNTEnMjUuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Restaurant Location"
                                    className="grayscale hover:grayscale-0 transition-all duration-700"
                                ></iframe>
                                
                                {/* Aesthetic Gradient Guard */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                                
                                {/* Info Floating Plate */}
                                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-5 md:p-8 rounded-[2rem] shadow-2xl border border-white/40 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[backOut]">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Live at Bikram</span>
                                            </div>
                                            <h4 className="font-bold text-lg md:text-xl text-brand-dark mb-1">Our Location</h4>
                                            <p className="text-gray-500 text-sm md:text-base">Your City, Your State, 000000</p>
                                        </div>
                                        <div 
                                            onClick={() => toast.error('Route viewing is disabled.', { position: 'bottom-center' })}
                                            className="w-full md:w-auto text-center px-8 py-4 bg-brand-dark text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-primary transition-all duration-300 shadow-xl cursor-pointer"
                                        >
                                            View Route
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Floating Blob */}
                        <div className="absolute -top-10 -left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-[120px] -z-10 group-hover:bg-brand-primary/20 transition-all duration-1000"></div>
                        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[150px] -z-10"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
