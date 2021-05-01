import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class AdminArticlesComponent implements OnInit {

  articles = []

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.updateArticles()
  }

  private updateArticles() {
    this.getArticles().subscribe((data: any[]) => {
      this.articles = data
    })
  }

  private getArticles(): Observable<any[]> {
    return this.http.get<any>('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/shop/list-items')
  }

  updateArticle(article) {
    this.router.navigateByUrl('/admin/article', { state: {article: article}})
  }

  addArticle() {
    this.router.navigateByUrl('/admin/article')
  }
}
