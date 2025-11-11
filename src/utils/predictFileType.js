let predictFileType = (fileName) => {
  let lastDot = fileName.lastIndexOf(".");
  let extension = fileName.substring(lastDot + 1);

  if (extension === "png" || extension === "jpg" || extension === "jpeg" || extension === "jfif" || extension === "heic") {
    return "image_file";
  } else if (extension === "pdf") {
    return "pdf_file";
  } else if (extension === "mp4" || extension === "mov" || extension === "webm") {
    return "video_file";
  } else if (
    extension === "xlsx" ||
    extension === "xlsm" ||
    extension === "xlsb" ||
    extension === "xltx"
  ) {
    return "excel_file";
  } else if (
    extension === "docx" ||
    extension === "dot" ||
    extension === "dotx"
  ) {
    return "word_file";
  } else if (extension === "txt") {
    return "text_file";
  } else {
    return "other_file_type";
  }
};

export default predictFileType;
