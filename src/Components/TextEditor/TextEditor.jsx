import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import useStyles from "./styles";

export default function TextEditor({ editorRef }) {
  const classes = useStyles();
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div className={classes.container}>
      <div className={classes.editorWrapper}>
        <Editor
          editorState={editorState}
          toolbarClassName={classes.toolbar}
          wrapperClassName={classes.editorWrapper}
          editorClassName={classes.editor}
          placeholder={"أدخل النص الوصفي هنا."}
          onEditorStateChange={onEditorStateChange}
          // toolbar={{
          //   image: {
          //     uploadEnabled: true, // Enable image upload
          //     urlEnabled: true, // Enable inserting images via URL
          //     uploadCallback: uploadImageCallBack, // Callback function for image upload
          //     previewImage: true, // Enable image preview
          //     alt: { present: true, mandatory: false }, // Alt attribute settings
          //   },
          //   emoji: {
          //     className: "demo-option-custom",
          //     popupClassName: "demo-popup-custom",
          //   },
          // }}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "embedded",
              "image",
              "emoji",
              "remove",
              "history",
            ],
            blockType: {
              inDropdown: true,
            },
            list: {
              inDropdown: true,
            },
            textAlign: {
              inDropdown: true,
            },
            image: {
              uploadEnabled: true, // Enable image upload
              urlEnabled: true, // Enable inserting images via URL
              uploadCallback: uploadImageCallBack, // Callback function for image upload
              previewImage: true, // Enable image preview
              alt: { present: true, mandatory: false }, // Alt attribute settings
            },
          }}
        />
        عرض مسبق:
        <div
          dangerouslySetInnerHTML={{
            __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          }}
        />
      </div>
    </div>
  );
}

// Mock upload callback function
const uploadImageCallBack = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ data: { link: reader.result } });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
