import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const LandingPage = () => {
    return (
        <Layout>
            <div>
                <h1>Landing Page</h1>
                <Link to="/admin">Admin Dashboard</Link>
            </div>
        </Layout>
    );
}

export default LandingPage;
