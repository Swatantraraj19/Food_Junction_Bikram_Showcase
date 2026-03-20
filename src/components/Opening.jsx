import { PartyPopper, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Opening = () => {
    // Use the officially provided WhatsApp number
    const whatsappNumber = "910000000000"; 
    const whatsappMessage = encodeURIComponent("Hi! I would like to book a party/table at Food Junction Bikram.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <section id="opening" className="bg-gradient-to-r from-brand-primary to-orange-500 py-16 text-white overflow-hidden relative shadow-inner">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-repeat" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2.5px)', backgroundSize: '20px 20px' }}></div>

            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10 gap-8 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="bg-white text-brand-primary p-6 rounded-full shadow-lg transform hover:rotate-12 transition-transform duration-300">
                        <PartyPopper size={48} className="" />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-2 leading-tight">Book For Parties</h2>
                        <p className="text-white/90 text-xl font-medium">Celebrate your special moments with us!</p>
                    </div>
                </div>

                <div 
                    onClick={() => toast.error('WhatsApp booking is disabled in this demo.', { position: 'bottom-center' })}
                    className="cursor-pointer flex items-center justify-center bg-white text-brand-dark hover:bg-gray-100 px-6 py-4 md:px-8 md:py-5 rounded-2xl shadow-xl transition-all w-full md:w-auto transform hover:scale-105 group border-4 border-white/20 bg-clip-padding"
                >
                    <div className="flex items-center gap-3 md:gap-4">
                        <MessageCircle size={32} className="text-[#25D366] group-hover:animate-pulse md:w-9 md:h-9" />
                        <div className="flex flex-col text-left">
                            <span className="text-lg md:text-xl font-bold tracking-wide leading-tight">Book via WhatsApp</span>
                            <span className="text-sm md:text-base font-semibold text-gray-500">+91 00000 00000</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Opening;
