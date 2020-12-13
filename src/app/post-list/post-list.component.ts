import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  selectedPost: Post;

  form = new FormGroup({
    texte: new FormControl('', [Validators.required]),
  });
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPost().subscribe(data => {
      this.clear();
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Post;
      })
    });
  }

  onSubmit(value) {
    if (this.selectedPost) {
      this.selectedPost.texte = this.form.value.texte;
      this.postService.updatePost(this.selectedPost);

    } else {
      let post: Post = {
        texte: this.form.value.texte,
        createAt: Date.now().toString()
      }
      this.postService.createPost(post);
    }
  }
  onSelect(post: Post) {
    this.selectedPost = post;
    this.form.setValue({ texte: this.selectedPost.texte })

  }
  clear() {
    this.selectedPost = null;
    this.form.reset()
  }

  delete(id: string) {
    this.postService.deletePost(id);
  }
}
