function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const fileReader = async (files: File[]) => {
  const filePathsPromises: Promise<File | unknown>[] = [];
  files.forEach((file) => {
    filePathsPromises.push(toBase64(file));
  });
  const filePaths = await Promise.all(filePathsPromises);
  const mappedFiles = filePaths.map((base64File) => base64File);
  return mappedFiles;
};
