import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const templateAtom = atom({
  key: "templaet",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const createTemplateAtom = atom({
  key: "createTemplaet",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
