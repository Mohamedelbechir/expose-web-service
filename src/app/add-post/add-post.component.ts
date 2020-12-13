import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { v4 as uuidv4 } from 'uuid';
import { Post } from '../models/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  form = new FormGroup({
    texte: new FormControl('', [Validators.required]),
  });
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }
  onSubmit(value) {
    let post: Post = {
      texte: this.form.value.texte,
      createAt: Date.now().toString()
    };
    console.log(post)
    this.postService.createPost(post);
  }
}
