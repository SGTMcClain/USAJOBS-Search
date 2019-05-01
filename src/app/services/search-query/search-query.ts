import { Secret } from '../../../../secret';
import { SearchResultsBasic } from '../../models/searchResultsBasic/search-results-basic';
import { HttpClient } from '@angular/common/http';
import { SearchQueryType, PositionType, SecurityClearanceType, SortDirection } from '../../eums/searchQuerys.enum' 
import { Injectable } from '@angular/core';

// TODO: fix CORS issue when using this service, and implement any improvements from the search-form component

@Injectable({providedIn: 'root'})
export class SearchQuery {
    public keyword: string;
    public location: string;
    secret: Secret = new Secret();
    public searchResults:any
    public resultsList: SearchResultsBasic[] = new Array;

    private BASE_URL:string = 'https://data.usajobs.gov/api/';
    
    constructor(private httpClient: HttpClient){
      // this.search({keyword: "par"})
    }

    public search({ keyword = "", location = "", resultsPerPage = 50 }): SearchResultsBasic[]{
        console.log(keyword);

        //build request
        
        this.httpClient.get(
          // this.urlBase + '/games;game_codes=nfl?format=json', // url
          this.BASE_URL + "search?" + SearchQueryType.keyword + keyword + "&" + SearchQueryType.location + location +
            "&" + SearchQueryType.resultsPerPage + resultsPerPage,
          // 'https://data.usajobs.gov/api/search?Keyword='+ keyword + "&LocationName" + location + "&ResultsPerPage=50", 
          {
            headers: {
              "Authorization-Key" : this.secret.usajobsAuthKey,
              "Host": this.secret.usajobsHost,
              "User-Agent": this.secret.usajobsUserAgent
            }
          },
    
        )
        .subscribe((res) => {
          // console.log(res)
          this.searchResults = res;
          console.log(this.searchResults);
          
          // console.log(res.SearchResult.SearchResultItems);
          
          this.createResultsList();
        });
        return this.resultsList;
      }

      createResultsList(): Array<SearchResultsBasic>{
        let resultsObject: SearchResultsBasic;
        this.resultsList = new Array<SearchResultsBasic>();
        console.log(this.searchResults.SearchResult.SearchResultItems);
        this.searchResults.SearchResult.SearchResultItems.forEach((object) => {
          resultsObject = new SearchResultsBasic()
          // let matchedObjectDescriptor = object.MatchedObjectDescriptor;
          
          resultsObject.announcementCloseDate = object.MatchedObjectDescriptor.ApplicationCloseDate;
          resultsObject.announcementStartDate = object.MatchedObjectDescriptor.PublicationStartDate;
          resultsObject.applyLink = object.MatchedObjectDescriptor.ApplyURI;
          resultsObject.title = object.MatchedObjectDescriptor.PositionTitle;
          resultsObject.positionID = object.MatchedObjectDescriptor.PositionID;
          resultsObject.locationDisplay = object.MatchedObjectDescriptor.PositionLocationDisplay; // locations may require an if statement
          resultsObject.lowGrade = object.MatchedObjectDescriptor.UserArea.Details.LowGrade;
          resultsObject.lowGrade = object.MatchedObjectDescriptor.UserArea.Details.HighGrade;
          resultsObject.jobSummary = object.MatchedObjectDescriptor.UserArea.Details.JobSummary;
          resultsObject.qualificationSummary = object.MatchedObjectDescriptor.QualificationSummary;
          resultsObject.organization = object.MatchedObjectDescriptor.OrganizationName;
          resultsObject.positionLink = object.MatchedObjectDescriptor.PositionURI;
          resultsObject.positionID = object.MatchedObjectID;
          resultsObject.salaryMin = object.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange;
          resultsObject.salaryMax = object.MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange;
          resultsObject.salaryType = object.MatchedObjectDescriptor.PositionRemuneration[0].RateIntervalCode;
          resultsObject.locations = object.MatchedObjectDescriptor.PositionLocation;
    
          this.resultsList.push(resultsObject);
    
        });
        console.log(this.resultsList);
        return this.resultsList;
      }
}
