import React, { useState } from 'react';
import { Button, Text, View, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';
import ImageResizer from 'react-native-image-resizer';
import { zip } from 'react-native-zip-archive';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const DocumentUpload = () => {
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const uploadFile = async () => {
    try {
      // Reset states
      setProgress(0);
      setUploadStatus('');
      setErrorMessage('');

      // Step 1: Pick the file
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const fileUri = res[0].uri;
      const fileName = res[0].name || 'unknown_file';
      const fileType = res[0].type || 'application/octet-stream';

      console.log(`File picked: ${fileName} (${fileType})`);

      // Step 2: Resolve the file path for RNFS (especially for Android)
      let filePath = fileUri;

      if (Platform.OS === 'android' && fileUri.startsWith('content://')) {
        const destPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
        await RNFS.copyFile(fileUri, destPath);
        filePath = destPath;
      }

      // Step 3: Check file size and compress if necessary
      const fileStats = await RNFS.stat(filePath);
      console.log(`Original file size: ${fileStats.size} bytes`);

      if (fileStats.size > MAX_FILE_SIZE) {
        console.log('File is larger than 5MB, attempting to compress.');

        if (fileType.startsWith('image/')) {
          filePath = await compressImage(filePath);
        } else {
          filePath = await compressFile(filePath, fileName);
        }

        // Re-check size after compression
        const newFileStats = await RNFS.stat(filePath);
        console.log(`Compressed file size: ${newFileStats.size} bytes`);

        if (newFileStats.size > MAX_FILE_SIZE) {
          setErrorMessage('File size is still too large after compression.');
          return;
        }
      }

      // Step 4: Upload file to the server
      const uploadResponse = await uploadToServer(filePath, fileName, fileType);
      setUploadStatus(uploadResponse ? 'Upload Successful' : 'Upload Failed');
    } catch (err) {
      console.error('Error during file upload:', err);
      setErrorMessage(err.message || 'Unknown error');
    }
  };

  const compressImage = async (fileUri) => {
    try {
      const compressedImage = await ImageResizer.createResizedImage(
        fileUri,
        800, // Max width
        800, // Max height
        'JPEG', // Format (use 'PNG' if needed)
        80, // Quality (0-100)
        0, // Rotation
        undefined, // Output path
        false, // Keep EXIF data
      );

      console.log(`Image compressed to: ${compressedImage.uri}`);
      return compressedImage.uri;
    } catch (error) {
      console.error('Image compression failed:', error);
      return fileUri; // Fallback to original file
    }
  };

  const compressFile = async (fileUri, fileName) => {
    try {
      const outputPath = `${RNFS.DocumentDirectoryPath}/${fileName}.zip`;
      const result = await zip(fileUri, outputPath);

      console.log(`File compressed to ZIP: ${result}`);
      return result;
    } catch (error) {
      console.error('File compression failed:', error);
      return fileUri; // Fallback to original file
    }
  };

  const uploadToServer = async (filePath, fileName, fileType) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: filePath,
        name: fileName,
        type: fileType,
      });

      // Replace with your actual API endpoint
      const response = await axios.post('http://10.0.2.2:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progressPercent = (progressEvent.loaded / progressEvent.total) * 100;
          setProgress(progressPercent);
        },
      });

      console.log('Upload response:', response.data);
      return response.status === 200;
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage('Upload failed: ' + (error.response?.data?.message || error.message));
      return false;
    }
  };

  return (
    <View>
      <Button title="Pick and Upload File" onPress={uploadFile} />
      <Text>Upload Progress: {progress.toFixed(2)}%</Text>
      {uploadStatus ? <Text>Status: {uploadStatus}</Text> : null}
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
    </View>
  );
};

export default DocumentUpload;