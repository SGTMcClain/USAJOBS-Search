import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchQuery } from '../../services/search-query/search-query';
import { SearchResultsBasic } from '../../models/searchResultsBasic/search-results-basic';
import { Secret } from '../../../../secret'
import { SearchQueryType, PositionType, SecurityClearanceType, SortDirection } from '../../eums/searchQuerys.enum'
import { SearchQueryModel } from 'src/app/models/searchQueryModel/search-query.model';

//TODO: Break out the results from the search page

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  
  public searchResultComplete:any;
  public searchResults:any
  public resultsList: SearchResultsBasic[] = new Array;
  private secret: Secret = new Secret;
  private BASE_URL:string = 'https://data.usajobs.gov/api/';
  private searchQueryModel = new SearchQueryModel();
  
  //TODO: searchQuery is the service that will be used in the future
  constructor(private httpClient: HttpClient, private searchQuery: SearchQuery) { }


  /**
   * On Submit
   * 
   * Captures form values on button click
   * 
   * @param form 
   */
  onSubmit(form: any){
    //quick debug for form values
    // console.log(form.value);

    // TODO: it doesn't like the search being performed from the service
    // this.searchQuery.search({keyword: form.value.keyword, location: form.value.location, resultsPerPage: 50});

    // Using this until the searchQuery Service is fixed
    this.search({keyword: form.value.keyword, location: form.value.location});


  }

  //performing search using keyword and location
  
  /**
   * Search
   * 
   * This is a basic search on keyword and location with a default of 50 results
   * This method can be extended to utilize other search fields with any search field being optional
   * 
   * @todo #1 extend this for all possible fields
   * @todo #2 overcome the CORS issue that persists when using this method from a service
   * @todo #3 properly utilize the service results in this component. 
   * 
   * 
   * @param keyword
   * @param location
   * @param resultsPerPage
   */
  public search({ keyword = "", location = "", resultsPerPage = 50 }){
    console.log(keyword);

    //build request
    
    this.httpClient.get(
      // this.urlBase + '/games;game_codes=nfl?format=json', // url
      this.BASE_URL + "search?" + SearchQueryType.keyword + keyword + "&" + SearchQueryType.location + location
        + "&" + SearchQueryType.resultsPerPage + resultsPerPage,
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
      this.searchResults = res;
      console.log(this.searchResults);
      this.createResultsList();
      
    //storing user entry to session storage
    this.searchQueryModel.keyword = keyword;
    this.searchQueryModel.location = location;
    this.searchQueryModel.resultsPerPage = resultsPerPage;
    sessionStorage.setItem('lastSearchQuery' ,JSON.stringify(this.searchQueryModel));
    });
  }

  /**
   * Create Results List
   * 
   * Organizes results into an object to use within the HTML page
   * 
   * @todo #1 Create an advanced method that would allow the user to customize results.
   * @todo #2 Adjust the HTML for the use of customized results
   * 
   * @returns Array<SearchResultsBasic>
   */
  createResultsList(): Array<SearchResultsBasic>{
    let resultsObject: SearchResultsBasic;
    this.resultsList = new Array<SearchResultsBasic>();
    console.log(this.searchResults.SearchResult.SearchResultItems);
    this.searchResults.SearchResult.SearchResultItems.forEach((object) => {
      resultsObject = new SearchResultsBasic()
      
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
