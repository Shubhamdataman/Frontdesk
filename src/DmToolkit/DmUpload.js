import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Box, Button, Link } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Webcam from "react-webcam";
const styles = {
  dropzone: {
    border: "2px dashed #cccccc",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    width: "15%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
};
const DmUpload = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState(null);

  const [isClicked, setIsClicked] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the files
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 136.73,
      height: 87.89,
    });
    setImageSrc(imageSrc);
    setIsClicked(false);
  }, [webcamRef, setImageSrc]);

  return (
    <>
      <div {...getRootProps()} style={styles.dropzone}>
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded" style={styles.image} />
        ) : isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div className="action">
        <CameraAltIcon
          onClick={() => {
            setIsClicked(true);
          }}
        />
        &nbsp;&nbsp;
        <Link to={imageSrc} download={imageName}>
          {" "}
          <FileDownloadIcon />{" "}
        </Link>
        &nbsp;&nbsp;
        <CloseIcon
          onClick={() => {
            setImageSrc(null);
          }}
        />
      </div>

      {isClicked ? (
        <Box
          height={400}
          width={400}
         my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          <Webcam
            audio={false}
            height={400}
            screenshotFormat="image/jpeg"
            width={400}
            ref={webcamRef}
          />
          <Button
            variant="contained"
            onClick={() => {
              capture();
            }}
          >
            Capture
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsClicked(false);
            }}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default DmUpload;