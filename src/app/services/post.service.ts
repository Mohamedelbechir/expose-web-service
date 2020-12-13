import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private firestore: AngularFirestore) { }

  getPost() {
    return this.firestore.collection<any>('posts').snapshotChanges();
  }
  createPost(post: Post) {
    return this.firestore.collection('posts').add(post);
  }
  updatePost(post: Post) {
    this.firestore.doc('posts/' + post.id).update(post);
  }
  deletePost(postId: string) {
    this.firestore.doc('posts/' + postId).delete();
  }
}
