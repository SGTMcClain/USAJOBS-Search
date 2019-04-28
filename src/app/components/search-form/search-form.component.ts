import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchQuery } from '../../models/search-query/search-query';
import { SearchResultsBasic } from '../../models/searchResultsBasic/search-results-basic';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { Secret } from '../../../../secret'
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  private searchQuery: SearchQuery;
  public searchResultComplete:any;
  public resultsList: SearchResultsBasic[] = new Array;
  private secret: Secret = new Secret;
   
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form.value);
    this.searchQuery = new SearchQuery();
    this.searchQuery.keyword = form.value.keyword;
    this.searchQuery.location = form.value.location;
    this.search(this.searchQuery.location, this.searchQuery.location);
    sessionStorage.setItem('lastSearchQuery' ,JSON.stringify(this.searchQuery));
  }

  public search(keyword:string, location?:string){
    console.log(keyword);
    this.httpClient.get(
      // this.urlBase + '/games;game_codes=nfl?format=json', // url
      'https://data.usajobs.gov/api/search?Keyword='+ keyword + "&LocationName" + location + "&ResultsPerPage=50&Page=2", 
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
      this.searchResultComplete = res;
      console.log(this.searchResultComplete);
      this.createResultsList();
      // console.log(res.SearchResult.SearchResultItems);
    });
  }

  createResultsList(){
    let resultsObject: SearchResultsBasic;
    this.resultsList = new Array<SearchResultsBasic>();
    console.log(this.searchResultComplete.SearchResult.SearchResultItems);
    this.searchResultComplete.SearchResult.SearchResultItems.forEach((object) => {
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
  }


}
