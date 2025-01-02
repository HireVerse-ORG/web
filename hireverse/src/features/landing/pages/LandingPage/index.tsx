import Layout from '../../components/Layout';
import HeroSection from './HeroSection';
import CategorySection from './CategorySection';
import RecruiterBanner from '../../components/RecruiterBanner';
import FeaturedJobsSection from './FeaturedJobsSection';

const LandingPage = () => {
    return (
        <Layout>
            <HeroSection />
            <CategorySection />
            <RecruiterBanner />
            <FeaturedJobsSection />
        </Layout>
    );
}

export default LandingPage;
