import axios from "@core/lib/axios";
import { IJobApplication, IJobApplicationWithSeekerProfile, JobApplicationStatus } from "@core/types/job.application.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { apiWrapper } from "@core/utils/helper";

const baseUrl = '/jobs/company';


export const getApplicationDetailsforCompany= async (applicationId: string): Promise<IJobApplicationWithSeekerProfile> => {
  const url = `${baseUrl}/application/${applicationId}`;
  return (await apiWrapper(axios.get<IJobApplicationWithSeekerProfile>(url))).data;
};

export const addCommentToApplication= async (applicationId: string, comment: string): Promise<{message: string}> => {
  const url = `${baseUrl}/application/${applicationId}/comment`;
  return (await apiWrapper(axios.put<{message: string}>(url, {comment}))).data;
};

export const updateJobApplicationStatus= async (applicationId: string, data: {status: JobApplicationStatus, reason?: string}): Promise<{message: string}> => {
  const url = `${baseUrl}/application/${applicationId}/status`;
  return (await apiWrapper(axios.put<{message: string}>(url, data))).data;
};

export const listCompanyApplicants = async (filter: {
    jobId?: string,
    companyProfileId?: string,
    page: number;
    limit: number;
    query?: string;
    status?: JobApplicationStatus;
  }): Promise<IPaginationResponse<IJobApplication>> => {
    const { jobId, companyProfileId, page, limit, query, status } = filter;

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if(jobId){
      params.append('jobId', jobId);
    }

    if(companyProfileId){
      params.append('companyProfileId', companyProfileId);
    }
  
    if (query) {
      params.append("query", query);
    }
  
    if (status) {
      params.append("status", status);
    }
  
    const url = `${baseUrl}/applicants?${params.toString()}`;
  
    return (await apiWrapper(axios.get<IPaginationResponse<IJobApplication>>(url))).data;
  };
  