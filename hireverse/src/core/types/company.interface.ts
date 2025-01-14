export type CompanyProfileStatus = 'pending' | 'verified' | 'rejected';

export interface ICompanyProfile {
    id: string;
    userId: string;
    companyId: string;
    name: string;
    location: {
        country: string;
        city: string;
    };
    bio: string;
    image: string;
    founded: Date;
    industry: string;
    companyType: string;
    email: string;
    phone: string;
    website: string;
    socialLinks: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
        instagram?: string;
    };
    employeeCount: number;
    status: CompanyProfileStatus;
    workplaceImages: string[]; 
    createdAt: Date;
    updatedAt: Date;
}