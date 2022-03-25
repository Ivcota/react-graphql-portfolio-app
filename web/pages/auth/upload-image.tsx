import React from "react";
import { NextPage } from "next";
import useFileUpload from "react-use-file-upload";
import {
  useFileUploadMutation,
  useSessionUpdateUserImageMutation,
} from "../../src/generated/graphql";

const UploadImagePage: NextPage = () => {
  const { files, setFiles, fileNames, totalSize } = useFileUpload();
  const [fileUploadResult, fileUpload] = useFileUploadMutation();
  const [
    updateUserImageResult,
    updateUser,
  ] = useSessionUpdateUserImageMutation();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const upload = await fileUpload({
      file: files[0],
    });

    const updatedUser = await updateUser({
      pictureURL: upload.data?.UploadFile.fileURL as string,
    });

    console.log(updatedUser);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl">Upload Your Photo</h1>

      <h3 className="mt-8 mb-4"> {totalSize}</h3>
      <form className="flex flex-col items-center" onSubmit={handleFormSubmit}>
        <input onChange={(e) => setFiles(e as any)} type="file" />
        <button className="mt-3 btn-primary">Submit</button>
      </form>
      <div>
        <h1>Upload Results</h1>
        <div>
          <p> {fileUploadResult.data?.UploadFile.filename} </p>
          <img
            className="rounded shadow-lg w-72 shadow-steel-900"
            src={fileUploadResult.data?.UploadFile.fileURL}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default UploadImagePage;
