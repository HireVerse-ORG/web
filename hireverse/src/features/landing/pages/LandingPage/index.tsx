import HeroSection from './HeroSection';
import CategorySection from './CategorySection';
import RecruiterBanner from '../../components/RecruiterBanner';
import FeaturedJobsSection from './FeaturedJobsSection';

const LandingPage = () => {
    return (
        <>
            <HeroSection />
            <CategorySection />
            <RecruiterBanner />
            <FeaturedJobsSection />
        </>
    );
}

export default LandingPage;
