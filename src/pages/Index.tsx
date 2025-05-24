
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ModelSelector from "@/components/ModelSelector";
import FileUpload from "@/components/FileUpload";
import ResultDisplay from "@/components/ResultDisplay";

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<string>("yolo");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setResultUrl(null);
    
    // Determine if the file is an image or video
    if (file.type.startsWith("image/")) {
      setFileType("image");
    } else if (file.type.startsWith("video/")) {
      setFileType("video");
    }
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

//detect_yolo

    const endpoint = selectedModel === "yolo" ? "https://50b7-196-118-4-101.ngrok-free.app/aimodel/test" : "https://50b7-196-118-4-101.ngrok-free.app/aimodel/detect_fasterrcnn";
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    // You might need to add additional metadata to the formData if required by your backend
    // formData.append("user_id", userId);
    // formData.append("settings", JSON.stringify({ option1: true }));

    setIsProcessing(true);
    setResultUrl(null);

    try {


      const response = await fetch(endpoint, {
        method: "POST",
        // For Django CSRF protection, you might need to include:
        // credentials: 'include',
        // headers: {
        //   'X-CSRFToken': getCsrfToken(), // You'll need to implement getCsrfToken()
        // },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Since your backend returns the video file directly, create a blob URL
      const blob = await response.blob();
      const videoUrl = URL.createObjectURL(blob);
      setResultUrl(videoUrl);

      
      // BACKEND INTEGRATION: Handle success response from backend
      toast.success("Processing completed!");
    } catch (error) {
      console.error("Error processing the file:", error);
      toast.error("Error processing the file. Please try again.");
      // BACKEND INTEGRATION: You might want to handle different error types differently
      // based on the error response from your Django backend
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Crowd Counting App</h1>
          <p className="text-muted-foreground">
            Upload an image or video and choose a model to count people in the scene
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
          />
          <FileUpload
            onFileSelected={handleFileSelected}
            selectedFile={selectedFile}
          />
        </div>

        <div className="text-center mb-8">
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedFile || isProcessing}
            size="lg"
          >
            Process File
          </Button>
        </div>

        <ResultDisplay
          resultUrl={resultUrl}
          isLoading={isProcessing}
          fileType={fileType}
        />
      </div>
    </div>
  );
};

export default Index;
