import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  lastFeeds = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.getLastFeeds().subscribe((data: any[]) => {
      this.lastFeeds = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      for (let i=0; i<this.lastFeeds.length; i++) {
        if (this.lastFeeds[i].media_type === 'VIDEO') {
          this.lastFeeds[i].media_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.lastFeeds[i].media_url)
        }
      }
    });
  }

  private getLastFeeds(): Observable<any[]> {
    return this.http.get<any>('https://zq3s7ojolk.execute-api.eu-west-1.amazonaws.com/integ/instagram/list-feeds')
  }
}
