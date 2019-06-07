export const handleFileUpload = fileReader => {
  const fileContent = fileReader.result;
  let fileLines = fileContent.split('\n');
  let uploadedData = [];
  fileLines.forEach(fileLine => {
    const fieldsUnAtered = fileLine.split(',');
    const fieldsCleaned = fieldsUnAtered.map(fieldData => fieldData.replace(/\s+/g, ' ').trim());
    uploadedData.push(fieldsCleaned);
  });
  if (uploadedData.length > 0) {
    const uploadedHeaders = uploadedData.shift();
    const usableData = uploadedData.filter(uploadRow => {
      const joinedData = uploadRow.join('');
      return uploadRow[0].length > 0 && joinedData.length > uploadRow[0].length + 1;
    });
    return { uploadedHeaders, uploadedData: usableData };
  }
};
