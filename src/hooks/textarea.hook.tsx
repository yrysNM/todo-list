import { useEffect } from "react";

const useAutoSizeTextArea = (
  textAreaInput: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaInput) {
      textAreaInput.style.height = "0px";

      const scrollHeight = textAreaInput.scrollHeight + "px";

      textAreaInput.style.height = scrollHeight;
    }
  }, [textAreaInput, value]);
};

export { useAutoSizeTextArea };
