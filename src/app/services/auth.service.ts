import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, user } from '@angular/fire/auth';
import {doc,docData,docSnapshots,Firestore, getDoc, setDoc, updateDoc} from '@angular/fire/firestore'
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth, private firestore:Firestore) {
     this.observeAuthState();
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  async register(email: string, password: string, name: string,profilePic:File) {
    const userCreditial = await createUserWithEmailAndPassword(this.auth, email, password)

    const userRef = doc(this.firestore, 'users/'+ userCreditial.user.uid)
    await setDoc(userRef ,{
      name,
      email,
      profilePic,
      uid: userCreditial.user.uid
    })
    return userCreditial;
    
  }
  private observeAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

async getProfile(uid:string): Promise<{name:string;profilePic:string, email:string} | null> {
 
  // const userId = this.auth.currentUser?.uid
  console.log("user" + uid);
  const userId = uid || this.auth.currentUser?.uid;

  if (!userId) {
    console.log('No user ID provided or logged in.');
    return null;
  }
  try {
    console.log("user" + uid);

      const userDoc = doc(this.firestore, 'users/' + userId)
      const docSnapshot = await getDoc(userDoc)

      if(docSnapshot.exists()){
        console.log(docSnapshot.data());
        
        return docSnapshot.data() as {name:string, profilePic:string,email:string}
      }
      return null

  } catch (error) {
    console.log(error);
    throw error
  }
}

updateUserProfile(userID:string,name:string,profilePic:string):Observable<void>{
    const userRef = doc(this.firestore, 'users/' + userID)
    return from(updateDoc(userRef,{name,profilePic}))
}

  resetPassword(email: string) {
    console.log(email);

    return sendPasswordResetEmail(this.auth, email);
  }

  logout() {
    return signOut(this.auth)
  }

}
