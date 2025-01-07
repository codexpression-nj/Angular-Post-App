import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, query, updateDoc } from '@angular/fire/firestore';
import { timeStamp } from 'console';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private collectionRef: any

  constructor(private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'posts')

  }

  async addPost(userId: string, content: string, image: any) {
    try {
      const postCollection = collection(this.firestore, 'posts')

      await addDoc(postCollection, {
        userId,
        content,
        image,
        timestamp: new Date()
      })
    } catch (error) {
      console.log('error adding a post', error);
      throw new Error('failed to add')

    }

  }

  async deletePost(postId:string) { 
    const postDoc = doc(this.firestore, 'posts/' + postId)
    await deleteDoc(postDoc)
  }

  async updatePost(postId:string,updateedData:any) { 
    const docRef = doc(this.firestore, 'posts/' + postId)
    await updateDoc(docRef,updateedData)
  }

  async getPosts() {
   try {
    const docRef = collection(this.firestore,'posts')
      const querySnapshot = await getDocs(query(docRef))
      return querySnapshot.docs.map((doc) =>{
        const data = doc.data()
        return{
          id: doc.id,
          ...data, 
          // timestamp: data['timestamp'] ? data.timestamp.toDate(): new Date()
        }
      })
   } catch (error) {
      console.log(error);
      throw new Error('failed to ferch posts')
      
   }
  }}
