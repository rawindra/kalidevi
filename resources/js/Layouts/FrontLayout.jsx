import Footer from '@/partials/Footer';
import Header from '@/partials/Header';
import Sidebar from '@/partials/Sidebar';

export default function Front({ children }) {
    return (
        <div className="overflow-hidden">
            <Header />
            {children}
            <Sidebar />
            <Footer />
        </div>
    );
}
