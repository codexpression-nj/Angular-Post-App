import { Component } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { error } from 'node:console';

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.css'
})
export class FeedPostComponent {
  postContent =''
  selectedfile :any
  posts :any[] =[]
  currentUserID : any
  postEditID: any

  constructor(private feedService:FeedService,private authService:AuthService) {
  }

  ngOnInit(){
    this.authService.currentUser$.subscribe({
      next:(user) => this.currentUserID = user?.uid
    })
    this.loadPost()
  }

  onFileSelected(event:any){
    this.selectedfile = event.target.files[0] || null
   
  }
  private readFile(file:File):Promise<string | ArrayBuffer | null>{
    return new Promise((resolve,reject) =>{
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.readAsDataURL(file)
        reader.onerror = (error) => reject(error)
        
    })
  }

  async addPost(){
    if(this.postContent.trim()){
      try {
        const img = this.selectedfile ? await this.readFile(this.selectedfile): null
        await this.feedService.addPost(this.currentUserID,this.postContent,img)
        this.postContent =""
        this.selectedfile = null
        
        this.loadPost()
      } catch (error:any) {
        alert(error.messegae || 'An error occured while adding') 
      }
    }else{
      console.log('no content');
      
    }
  }

  
async loadPost(){
  this.posts = await this.feedService.getPosts()
  console.log(this.posts);
  
}

async updatePost(){
    try { 
      // const img = this.selectedfile ? await this.readFile(this.selectedfile): null
      const updatedData = {content:this.postContent}
      await this.feedService.updatePost(this.postEditID,updatedData)
      this.postEditID =""
      this.postContent =""
      this.loadPost()
    } catch (error) {
      
    }
}

cancelEditing(){
  this.postEditID =""
  this.postContent =""
  this.selectedfile = null
}

startEdit(post:any){
  this.postEditID = post.id
  this.postContent = post.content
  this.selectedfile = post.selectedfile

}
 async deletePost(postId:string){
      try { 
        this.feedService.deletePost(postId)
        this.posts = this.posts.filter((post) => post.id !== postId)
        
      } catch (error:any) {
          alert(error.messegae)
      }
  }
} 
