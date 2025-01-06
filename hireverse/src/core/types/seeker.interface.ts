export interface SeekerProfile {
    userId: string,
    profileName: string;
    title: string;
    location: {
        country: string;
        city: string;
    };
    isOpenToWork: boolean;
    bio: string;
    profileUsername: string;
    image: string;
}