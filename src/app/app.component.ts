import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular';
  data:any;
  searchTerm: string = '';
  searchID: string = '';
  isSortedByTitle: boolean = false;
  showCompleted: number = 0; // Property to track the completion status display mode
  displayedColumns: string[] = ['userId', 'id', 'title', 'completed'];
  panelOpenState: boolean = false; // Declare panelOpenState property


  constructor(private service: AppService) { }

  ngOnInit(): void {
    console.log('hii')
    this.getDataFromAPI('https://jsonplaceholder.typicode.com/todos');
  }

  
  getDataFromAPI(url: string) {
    this.service.getDataFromAPI(url).subscribe(
      (res) => {
        this.data = res // Output the response to the console
        // Further processing of the response data can be done here
      },
      (error) => {
        console.error('An error occurred:', error); // Log any errors
      }
    );
  }

  
  reverseData() {
    if (this.data) {
      this.data.reverse(); // Reversing the data array
    }
  }

  searchData() {
    if (!this.searchTerm.trim()) {
      // If search term is empty, reset data to original
      this.getDataFromAPI('https://jsonplaceholder.typicode.com/todos');
      return;
    }

    const searchTermNumber = parseInt(this.searchTerm.trim(), 10);
    if (!isNaN(searchTermNumber) && searchTermNumber >= 1 && searchTermNumber <= 200) {
      // Perform search based on ID between 1 and 200
      this.data = this.data.filter((item: any) => {
        // Customize this logic based on your data structure and search requirements
        return item.id === searchTermNumber;
      });
    } else {
      // If search term is not a valid number or not between 1 and 200, reset data to original
      this.getDataFromAPI('https://jsonplaceholder.typicode.com/todos');
    }
  }

  sortByTitle() {
    if (!this.isSortedByTitle) {
      this.data.sort((a: any, b: any) => {
        // Use localeCompare for string comparison
        return a.title.localeCompare(b.title);
      });
      this.isSortedByTitle = true; // Data is now sorted by title
    } else {
      this.data = this.getDataFromAPI('https://jsonplaceholder.typicode.com/todos'); // Reset data to original
      this.isSortedByTitle = false; // Data is no longer sorted by title
    }
  }

  searchuser() {
    if (!this.searchID.trim()) {
      // If search term is empty, reset data to original
      this.getDataFromAPI('https://jsonplaceholder.typicode.com/todos');
      return;
    }

    const searchTermID = parseInt(this.searchID.trim(), 10);
    if (!isNaN(searchTermID) && searchTermID >= 1 && searchTermID <= 10) {
      // Perform search based on ID between 1 and 10
      this.data = this.data.filter((item: any) => {
        // Customize this logic based on your data structure and search requirements
        return item.userId === searchTermID;
      });
    } else {
      // If search term is not a valid number or not between 1 and 10, reset data to original
      this.getDataFromAPI('https://jsonplaceholder.typicode.com/todos');
    }
  }
  toggleCompletionStatus() {
    this.showCompleted = (this.showCompleted + 1) % 3; // Toggle between 0, 1, and 2
    switch (this.showCompleted) {
      case 0:
        // Show all rows
        this.getDataFromAPI('https://jsonplaceholder.typicode.com/todos');
        break;
      case 1:
        // Show completed tasks
        this.getDataFromAPI('https://jsonplaceholder.typicode.com/todos?completed=true');
        break;
      case 2:
        // Show incomplete tasks
        this.getDataFromAPI('https://jsonplaceholder.typicode.com/todos?completed=false');
        break;
    }
  }
  
  resetData() {
    this.data = this.getDataFromAPI('https://jsonplaceholder.typicode.com/todos'); // Restore original data
    this.searchTerm = ''; // Clear search term
    this.searchID = ''; // Clear search ID
    this.isSortedByTitle = false; // Reset sorting
    this.showCompleted = 0; // Reset completion status display mode
  }
}