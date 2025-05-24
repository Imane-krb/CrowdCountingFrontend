
import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  selectedFile: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  selectedFile,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (isValidFileType(file)) {
        onFileSelected(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (isValidFileType(file)) {
        onFileSelected(file);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const isValidFileType = (file: File) => {
    // BACKEND INTEGRATION: Make sure these file types match what your Django backend can process
    // Update these arrays if your backend only supports specific formats or has size limits
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const acceptedVideoTypes = ["video/mp4", "video/quicktime", "video/webm"];
    return (
      acceptedImageTypes.includes(file.type) || acceptedVideoTypes.includes(file.type)
    );
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Image or Video</h2>
      <div
        className={`file-drop-area ${isDragging ? "active" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
        <p className="mb-2">
          Drag and drop your file here, or
          <Button
            variant="link"
            className="px-1 py-0 h-auto"
            onClick={handleButtonClick}
          >
            browse
          </Button>
        </p>
        <p className="text-xs text-muted-foreground">
          {/* BACKEND INTEGRATION: Update these supported formats to match your Django backend */}
          Supports: JPG, PNG, GIF, MP4, WebM
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/jpeg, image/png, image/gif, video/mp4, video/quicktime, video/webm"
          className="hidden"
        />
      </div>
      {selectedFile && (
        <div className="mt-4">
          <p className="font-medium">Selected file:</p>
          <p className="text-sm text-muted-foreground">
            {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        </div>
      )}
    </Card>
  );
};

export default FileUpload;
