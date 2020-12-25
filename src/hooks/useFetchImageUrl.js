import { useEffect, useState } from "react";
import firebaseApp from "../firebase/firebase";

const FOLDER_NAME = "/hair_gallery";
const useFetchImageUrl = () => {
  const [imageUrl, setImageUrl] = useState([]);

  const listRef = firebaseApp.storage().ref().child(FOLDER_NAME);

  // fetch image url when all promises has been resolved
  const fetchImages = async () => {
    let result = await listRef.listAll();
    let urlPromises = result.items.map((imageRef) => {
      return imageRef.getDownloadURL();
    });
    return Promise.all(urlPromises);
  };

  useEffect(() => {
    fetchImages().then((res) => {
      setImageUrl(res);
    });
  }, []);

  return [imageUrl];
};

export default useFetchImageUrl;
