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
    coverImage: string;
}

export interface SeekerEducation {
    id: string,
    profileId: string;
    school: string;
    fieldOfStudy: string;
    startMonth: number;  
    startYear: number;   
    endMonth: number;    
    endYear: number;     
    currentlyPursuing: boolean;
    location: {
        city: string;
        country: string;
    };
    description: string;
}