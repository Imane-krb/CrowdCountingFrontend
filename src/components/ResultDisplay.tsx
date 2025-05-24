
import React from "react";
import { Card } from "@/components/ui/card";

interface ResultDisplayProps {
  resultUrl: string | null;
  isLoading: boolean;
  fileType: "image" | "video" | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  resultUrl,
  isLoading,
  fileType,
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      <div className="min-h-[300px] flex items-center justify-center">
        {isLoading ? (
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
            <p className="text-lg">Please wait, processing...</p>
          </div>
        ) : resultUrl ? (
          <div className="w-full">
            {/* BACKEND INTEGRATION: 
                Your Django backend should return URLs to processed files.
                Ensure these URLs are accessible from the frontend.
                
                If your Django server serves media files from a different domain/path,
                you may need to prepend the base URL to resultUrl, for example:
                src={`http://your-django-server.com${resultUrl}`}
                
                Also ensure your Django CORS settings allow your frontend to access these files.
            */}
            {fileType === "image" ? (
              <img
                src={resultUrl}
                alt="Analysis Result"
                className="max-w-full max-h-[500px] mx-auto"
              />
            ) : fileType === "video" ? (
              <video
                controls
                className="max-w-full max-h-[500px] mx-auto"
              >
                <source src={resultUrl} />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Upload an image or video and select a model to see results
          </p>
        )}
      </div>
    </Card>
  );
};

export default ResultDisplay;
