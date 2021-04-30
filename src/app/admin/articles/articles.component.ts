import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class AdminArticlesComponent implements OnInit {

  articles = []

  constructor(private http: HttpClient, private toastr: ToastrService) {
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

  private addArticle(article) {
    this.http.post('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/shop/add-item', article)
        .subscribe((data: any) => {
          this.toastr.success('Article ajouté')
          this.updateArticles()
        })
  }

  private deleteArticle(article) {
    this.http.post('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/shop/delete-item', { id: article.id})
        .subscribe((data: any) => {
          this.toastr.success('Article supprimé')
          this.updateArticles()
        })
  }
}
