import Footer from '@/partials/Footer';
import Header from '@/partials/Header';

export default function Front({ children }) {
    return (
        <div className="overflow-hidden md:px-16 md:py-5 min-h-screen flex flex-col">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
