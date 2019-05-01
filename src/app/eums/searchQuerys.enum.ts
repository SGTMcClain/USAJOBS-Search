export enum SearchQueryType{
    location = "LocationName=",
    keyword = "Keyword=",
    resultsPerPage = "ResultsPerPage=",
    positionTitle = "PositionTitle=",
    minPay = "RemunerationMinimumAmount=",
    maxPay = "RemunerationMaximumAmount",
    positionType = "PositionSchedule=",
    securityClearance = "SecurityClearanceRequired=1",
    radius = "Radius="
}

export enum PositionType{
    fullTime = 1,
    partTime = 2,
    shiftWork = 3,
    intermittent = 4,
    jobSharing = 5,
    multipleShcedules = 6
}

export enum SecurityClearanceType{
    notReuired = 0,
    confidential = 1,
    secret = 2,
    topSecret = 3,
    sensitive = 4,
    qAccess = 5,
    lAccess = 7,
    other = 8
}

export enum SortDirection{
    ascending = "Asc",
    descending = "desc"
}