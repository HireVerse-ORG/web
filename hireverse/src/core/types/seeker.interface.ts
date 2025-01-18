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

export interface SeekerExperience {
    id: string,
    profileId: string;
    title: string;
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
    currentlyWorking: boolean;
    employmentType: string;
    location: {
        city: string;
        country: string;
    };
    company: {
        companyId: string | null,
        name: string;
        image: string | null;
    };
    description: string;
}

export interface SeekerPortfolio {
    id: string,
    userId: string,
    profileId: string;
    thumbnail: string;
    title: string;
    mediaLink: string;
}