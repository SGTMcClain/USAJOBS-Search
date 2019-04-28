// import {
//     MatchedObjectDescriptor,
//     MatchedObjectDescriptorUserArea,
//     SearchResult,
//     SearchResultItem,
//     SearchResultUserArea
// } from '../searchResultsComplete/search-results-complete'

export class SearchResultsBasic {
    usajobsID: string;
    positionID: string;
    title: string;
    locationDisplay: string;
    locations: {}[];
    positionLink: string;
    applyLink: string[];
    organization: string;
    lowGrade: string;
    highGrade: string;
    jobGrade: string[];
    jobSummary: string;
    qualificationSummary:string;
    announcementStartDate: string;
    announcementCloseDate: string;
    salaryMin: string;
    salaryMax: string;
    salaryType: string;


    constructor(){}
}
