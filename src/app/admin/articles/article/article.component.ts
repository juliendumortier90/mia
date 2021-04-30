import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationDialogService } from 'src/app/util/popup/confirmation-dialog.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class AdminArticleComponent implements OnInit {

  faTrash = faTrash
  faPlus = faPlus

  article = AdminArticleComponent.initArticle()

  editMode = false
  isNew = false

  constructor(private confirmationDialogService: ConfirmationDialogService, private http: HttpClient, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.article = window.history.state.article
    if (this.article == null) {
      this.article = AdminArticleComponent.initArticle()
      this.isNew = true
    }
  }

  addPic(event) {
    if (event.target.files[0].size>198000) {
      this.toastr.error("l'image doit faire moins de 200Ko")
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
          this.article.pictures.push(reader.result)
      }
    }
  }

  saveArticle() {
    if (this.isValidArticle(this.article)) {
      this.confirmationDialogService.confirm('Enregistrer', 'Voulez-vous vraiment enregistrer ?')
        .then((confirmed) => this.callUpdateArticle(this.article))
    }
  }

  deleteArticle() {
    this.confirmationDialogService.confirm('Supprimer', "Voulez-vous vraiment supprimer l'article ?")
      .then((confirmed) => this.callDeleteArticle(this.article))
  }
  
  goBack() {
    this.router.navigateByUrl('/admin/articles')
  }

  private static initArticle() {
    return { 
      id: '',
      type: 'TSHIRT',
      name: '',
      price: 0,
      stock: '',
      pictures: [],
      paypalRef: '' 
    }
  }

  private isValidArticle(article) {
    if (!article.name || article.name.length < 3) {
      this.toastr.error("titre de l'article trop court")
      return false
    }
    if (!article.price || article.price < 1) {
      this.toastr.error("prix trop petit")
      return false
    }
    if (!article.stock || article.stock < 0 || article.stock > 50) {
      this.toastr.error("vérifier le stock")
      return false
    }
    if (!article.pictures || article.pictures.length < 1) {
      this.toastr.error("au moins une image requise")
      return false
    }
    if (!article.pictures || article.pictures.length > 2) {
      this.toastr.error("maximum deux images")
      return false
    }
    return true
  }

  private callUpdateArticle(article) {
    this.http.post('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/shop/add-item', article)
        .subscribe((data: any) => {
          this.toastr.success('Article ajouté')
          this.goBack()
        })
  }

  private callDeleteArticle(article) {
    this.http.post('https://sb59re9hg9.execute-api.eu-west-1.amazonaws.com/integ/shop/delete-item', { id: article.id})
        .subscribe((data: any) => {
          this.toastr.success('Article supprimé')
          this.goBack()
        })
  }
}
