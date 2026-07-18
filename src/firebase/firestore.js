import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

const POSTS_COLLECTION = "posts";

export async function createPost(title, content, authorId, authorName) {
  try {
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
      title,
      content,
      authorId,
      authorName,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (err) {
    console.error("Error while creating post: ", err);
    throw err;
  }
}

export async function getPosts() {
  try {
    const q = query(
      collection(db, POSTS_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return posts;
  } catch (err) {
    console.error("Error while getting posts: ", err);
    throw err;
  }
}

export async function updatePost(postId, updatedData) {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId);
    await updateDoc(postRef, updatedData);
  } catch (err) {
    console.error("Error while updating post: ", err);
    throw new err();
  }
}

export async function deletePost(postId) {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId);
    await deleteDoc(postRef);
  } catch (err) {
    console.error("Error while deleting post: ", err);
    throw err;
  }
}

export async function getPostById(postId) {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      return {
        id: postSnap.id,
        ...postSnap.data(),
      };
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error while geting Post: ", err);
    throw err;
  }
}
