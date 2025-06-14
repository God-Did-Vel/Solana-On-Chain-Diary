import { useState } from 'react';
import { Upload, X } from 'lucide-react';



interface ImageUploadProps {
  imageUrl?: string;
 onImageChange: (_?: string) => void;
}

export function ImageUpload({ imageUrl, onImageChange }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        Add an image (optional)
      </label>
      
      {imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Upload preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onImageChange(undefined)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-gray-600 hover:border-gray-500'
          }`}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-400 mb-2">Drag and drop an image here, or</p>
          <label className="cursor-pointer text-purple-400 hover:text-purple-300">
            browse files
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}
