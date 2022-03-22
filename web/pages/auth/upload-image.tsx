import React, { useCallback } from "react";
import { NextPage } from "next";
import useFileUpload from "react-use-file-upload";
import FormikField from "../../components/FormikField";
import { Formik } from "formik";

const UploadImagePage: NextPage = () => {
  const { files, setFiles, fileNames, totalSize } = useFileUpload();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl">Upload Your Photo</h1>

      <h3 className="mt-8 mb-4"> {totalSize}</h3>
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(files[0]);
        }}
      >
        <input onChange={(e) => setFiles(e as any)} type="file" />
        <button className="mt-3 btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UploadImagePage;
