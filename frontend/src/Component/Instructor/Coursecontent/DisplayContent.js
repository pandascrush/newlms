import React from "react";
import { useLocation } from "react-router-dom";

// Function to format file size
const formatSize = (bytes) => {
  if (bytes === 0) return "0 Byte";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

const DisplayContent = () => {
  const location = useLocation();
  const { content, image } = location.state || {};

  return (
    <div className="container-fluid">
      <h3>Uploaded Content</h3>
      <div className="my-3">
        <h4>Content:</h4>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="my-3">
        <h4>Uploaded File:</h4>
        {image && (
          <div>
            <p>Size: {formatSize(image.size)}</p>
            {image.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                style={{ maxWidth: "100%" }}
              />
            )}
            {image.type.startsWith("video/") && (
              <video controls style={{ maxWidth: "100%" }}>
                <source src={URL.createObjectURL(image)} type={image.type} />
                Your browser does not support the video tag.
              </video>
            )}
            {(image.type === "application/pdf" || image.type.includes("powerpoint")) && (
              <iframe
                src={URL.createObjectURL(image)}
                title="Uploaded File"
                width="100%"
                height="600px"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayContent;
