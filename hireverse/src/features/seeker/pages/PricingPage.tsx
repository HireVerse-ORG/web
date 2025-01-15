import PaymentPlanCard from "@core/components/ui/PaymentPlanCard";
import useAppSelector from "@core/hooks/useSelector";
import { Box, Grid2 } from "@mui/material";

const plans = [
    {
        planName: 'Free',
        rate: '$0',
        duration: 'month',
        features: [
            { name: 'Feature 1', available: true },
            { name: 'Feature 2', available: false },
            { name: 'Feature 3', available: true },
        ],
        isPopular: false,
        isActive: true
    },
    {
        planName: 'Basic Plan',
        rate: '$10',
        duration: 'month',
        features: [
            { name: 'Feature 1', available: true },
            { name: 'Feature 2', available: false },
            { name: 'Feature 3', available: true },
        ],
        isPopular: true,
    },
    {
        planName: 'Premium Plan',
        rate: '$25',
        duration: 'month',
        features: [
            { name: 'Feature 1', available: true },
            { name: 'Feature 2', available: true },
            { name: 'Feature 3', available: true },
        ],
        isPopular: false,
    },
];

function PricingPage() {
    const user = useAppSelector((state) => state.auth.user);

    const handleSubscribe = (planName: string) => { }

    return (
        <Box
            sx={{
                p: 4,
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap', 
                justifyContent: 'center', 
            }}
        >
            {plans.map((plan, index) => (
                <Box
                    key={index}
                    sx={{
                        flexGrow: 1,
                        flexBasis: '200px', 
                        maxWidth: '400px',
                        '@media (max-width: 600px)': {
                            flexBasis: '100%', 
                        },
                    }}
                >
                    <PaymentPlanCard
                        planName={plan.planName}
                        rate={plan.rate}
                        duration={plan.duration}
                        features={plan.features}
                        isPopular={plan.isPopular}
                        isActive={plan.isActive}
                        onSubscribe={() => handleSubscribe(plan.planName)}
                    />
                </Box>
            ))}
        </Box>

        // <stripe-pricing-table
        //     pricing-table-id="prctbl_1QhVLnRFZZ0zOK4c1NKXfBtO"
        //     publishable-key="pk_test_51QhUdCRFZZ0zOK4cOwjk1Rk3AU5FGxoc12knbmeh1ZEacsXgaEjM8eettZqMNAwICb2ZXw5r1gg0Oddsganxumgz009ZzLxC93"
        //     // client-reference-id={user?.id || ""}
        //     // customer-email={user?.email || ""}
        //     customer-session-client-secret="cuss_secret_Ramao9O9zQui7xzGwyJyGmyOEFHLpmJzkX6SyiAv94795jU"
        // >
        // </stripe-pricing-table>
    );
}

export default PricingPage;
