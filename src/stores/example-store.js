import { onAuthStateChanged } from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "src/firebaseConfig";

export const useUserStore = defineStore("useStore", {
  state: () => ({
    userData: null,
    urlPhoto: null,
  }),
  actions: {
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
                name: user.displayName,
                photo: user.photoURL,
              };
            } else {
              this.userData = null;
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        unsuscribe();
      });
    },
    urlPhotoPerfil(url) {
      this.urlPhoto = url;

    },
  },
});
