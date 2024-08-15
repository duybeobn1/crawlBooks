import { Injectable } from '@angular/core';
import { Client, Account, Databases, Query, OAuthProvider } from 'appwrite';  // Import Databases and Query
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppwriteService {
  private client: Client;
  private account: Account;
  private databases: Databases;
  private databaseId = '66b91d6a003dcc3d5039';  // Replace with your actual database ID
  private collectionId = '66b91dbf001f35b2c231';  // Replace with your actual collection ID

  constructor() {
    this.client = new Client()
      .setEndpoint(environment.appwrite.endpoint) // Your Appwrite endpoint
      .setProject(environment.appwrite.projectId); // Your Appwrite project ID

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);  // Initialize Databases
  }

  loginWithGoogle() {
    const successUrl = "www.bookstamp.site/search"; // Redirect here on success
    const failureUrl = "www.bookstamp.ste/login-failure"; // Redirect here on failure

    this.account.createOAuth2Session(OAuthProvider.Google, successUrl, failureUrl);
  }

  logout() {
    return this.account.deleteSession('current');
  }

  getCurrentUser() {
    return this.account.get().then(user => {
      return {
        $id: user.$id, // Include the $id
        name: user.name,
        picture: user.prefs?.['profilePicture'] || 'assets/default-avatar.png', // Access using bracket notation
      };
    });
  }
  
  

  createBook(book: any) {
    return this.databases.createDocument(this.databaseId, this.collectionId, 'unique()', book);
  }

  getBooksByUser(userId: string) {
    return this.databases.listDocuments(this.databaseId, this.collectionId, [
      Query.equal('userId', userId)  // Ensure the field name matches your database schema
    ]);
  }

  deleteBook(documentId: string) {
    return this.databases.deleteDocument(this.databaseId, this.collectionId, documentId);
  }

  getBookById(bookId: string) {
    return this.databases.getDocument(this.databaseId, this.collectionId, bookId);
  }
}
