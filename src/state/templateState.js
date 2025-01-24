import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const templateAtom = atom({
  key: "templaet",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const templateByIdAtom = atom({
  key: "templatebyidd",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
