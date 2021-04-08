import React, { useContext } from "react";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";
import { useDatabase } from "./DatabaseContext";
const StorageContext = React.createContext();

export function useStorage() {
  return useContext(StorageContext);
}

const StorageProvider = ({ children }) => {
  const { addToMyImagesField } = useDatabase();

  async function uploadImage(email, receptid, image) {
    const task = storage.ref(`images/${email}/${receptid}/${image.name}`).put(image);
    task.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          db.collection("receptek").doc(receptid).update({ image: downloadUrl });
          addToMyImagesField(email, downloadUrl);
        });
      }
    );
  }

  function deleteSingleImage(url) {
    storage.refFromURL(url).delete();
  }

  function deleteAllImage(urls) {
    const promises = [];

    urls.forEach((url) => {
      promises.push(storage.refFromURL(url).delete());
    });

    Promise.all(promises);
  }

  const value = {
    uploadImage,
    deleteSingleImage,
    deleteAllImage,
  };
  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
};

export default StorageProvider;
