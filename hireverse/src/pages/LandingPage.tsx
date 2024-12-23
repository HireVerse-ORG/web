import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <h1>Landing Page</h1>
            <Link to="/admin">Admin Dashboard</Link>           
        </div>
    );
}

export default LandingPage;
