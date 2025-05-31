
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (value: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
}) => {
  // BACKEND INTEGRATION: The values here ("yolo" and "rcnn") should match
  // the model identifiers that your Django backend expects.
  // If your backend uses different identifiers, update these values.
  
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select Model</h2>
      <RadioGroup
        value={selectedModel}
        onValueChange={onModelChange}
        className="flex flex-col space-y-3"
      >
        {/* BACKEND INTEGRATION: 
            These radio button values determine which endpoint is called.
            Make sure they match what your Django views are expecting.
            You could also fetch available models from an API endpoint
            and dynamically generate these options. */}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yolo" id="yolo" />
          <Label htmlFor="yolo" className="cursor-pointer">
            YOLOv11
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rcnn" id="rcnn" />
          <Label htmlFor="rcnn" className="cursor-pointer">
            FASTER R-CNN
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="One Image" id="One_Image" />
          <Label htmlFor="One_Image" className="cursor-pointer">
            One Image
          </Label>
        </div>
        <hr className="my-2 border-t border-gray-300" />
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="YOLO v11 -- Lower FPS" id="yolo_low" />
          <Label htmlFor="yolo_low" className="cursor-pointer">
            YOLOv11 -- Lower FPS
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="FASTER R-CNN -- Lower FPS" id="rcnn_lower" />
          <Label htmlFor="rcnn_lower" className="cursor-pointer">
            FASTER R-CNN -- Lower FPS
          </Label>
        </div>
      </RadioGroup>
    </Card>
  );
};

export default ModelSelector;
