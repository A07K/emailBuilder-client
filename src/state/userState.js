import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const loginAtom = atom({
  key: "loign",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const registerAtom = atom({
  key: "reigster",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
