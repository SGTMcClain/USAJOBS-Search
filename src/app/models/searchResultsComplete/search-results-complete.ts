export interface Top {
    LanguageCode?:     string;
    SearchParameters?: SearchParameters;
    SearchResult?:     SearchResult;
}

export interface SearchParameters {
}

export interface SearchResult {
    SearchResultCount?:    number;
    SearchResultCountAll?: number;
    SearchResultItems?:    SearchResultItem[];
    UserArea?:             SearchResultUserArea;
}

export interface SearchResultItem {
    MatchedObjectId?:         string;
    MatchedObjectDescriptor?: MatchedObjectDescriptor;
    RelevanceRank?:           number;
}

export interface MatchedObjectDescriptor {
    PositionID?:                   string;
    PositionTitle?:                string;
    PositionURI?:                  string;
    ApplyURI?:                     string[];
    PositionLocationDisplay?:      PositionLocationDisplay;
    PositionLocation?:             PositionLocation[];
    OrganizationName?:             string;
    DepartmentName?:               string;
    SubAgency?:                    string;
    JobCategory?:                  JobCategory[];
    JobGrade?:                     JobGrade[];
    PositionSchedule?:             JobCategory[];
    PositionOfferingType?:         JobCategory[];
    QualificationSummary?:         string;
    PositionRemuneration?:         PositionRemuneration[];
    PositionStartDate?:            Date;
    PositionEndDate?:              Date;
    PublicationStartDate?:         Date;
    ApplicationCloseDate?:         Date;
    PositionFormattedDescription?: PositionFormattedDescription[];
    UserArea?:                     MatchedObjectDescriptorUserArea;
}

export interface JobCategory {
    Name?: string;
    Code?: string;
}

export interface JobGrade {
    Code?: string;
}

export interface PositionFormattedDescription {
    Label?:            string;
    LabelDescription?: string;
}


export interface PositionLocation {
    LocationName?:           string;
    CountryCode?:            string;
    CountrySubDivisionCode?: string;
    CityName?:               string;
    Longitude?:              number;
    Latitude?:               number;
}


export interface PositionLocationDisplay {
    PositionLocationDisplay?;
}

export interface PositionRemuneration {
    MinimumRange?:     string;
    MaximumRange?:     string;
    RateIntervalCode?: string;
}

export interface MatchedObjectDescriptorUserArea {
    Details?:        Details;
    IsRadialSearch?: boolean;
}

export interface Details {
    JobSummary?:                       string;
    WhoMayApply?:                      JobCategory;
    LowGrade?:                         string;
    HighGrade?:                        string;
    PromotionPotential?:               string;
    HiringPath?:                       string[];
    TotalOpenings?:                    string;
    AgencyMarketingStatement?:         string;
    TravelCode?:                       string;
    ApplyOnlineUrl?:                   string;
    DetailStatusUrl?:                  string;
    PromotionPotentialAdditionalText?: string;
    AppointmentExplanationText?:       string;
}

export interface SearchResultUserArea {
    NumberOfPages?:  string;
    IsRadialSearch?: boolean;
}
    

