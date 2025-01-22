import { atom } from "recoil";

export const editorAtom = atom({
  key: "editorState",
  default: {
    content: {
      subject: "",
      body: '<div style="padding: 20px; font-family: Arial, sans-serif;"><p>Start typing your email...</p></div>',
    },
    style: {
      backgroundColor: "#ffffff",
      textColor: "#000000",
      fontFamily: "Arial, sans-serif",
      spacing: "20px",
    },
  },
});
