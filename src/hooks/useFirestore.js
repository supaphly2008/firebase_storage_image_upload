import { useEffect, useState } from "react";
import { firebaseApp } from "../firebase/firebase";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firebaseApp
      .firestore()
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        let documents = [];
        snapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsub();
  }, [collection]);
  return { docs };
};

export default useFirestore;
