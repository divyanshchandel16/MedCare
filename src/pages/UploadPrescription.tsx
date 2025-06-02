
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Camera, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface UploadedFile {
  file: File;
  preview: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

const UploadPrescription = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, message: 'Only JPG, PNG, HEIC, and PDF files are allowed' };
    }

    if (file.size > maxSize) {
      return { isValid: false, message: 'File size must be less than 10MB' };
    }

    return { isValid: true, message: '' };
  };

  const processFile = useCallback((file: File) => {
    const validation = validateFile(file);
    
    if (!validation.isValid) {
      const errorFile: UploadedFile = {
        file,
        preview: '',
        status: 'error',
        progress: 0,
        error: validation.message
      };
      setUploadedFiles(prev => [...prev, errorFile]);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newFile: UploadedFile = {
        file,
        preview: reader.result as string,
        status: 'uploading',
        progress: 0
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.file === file && f.status === 'uploading'
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 200);

      // Complete upload after progress reaches 100%
      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => 
          prev.map(f => 
            f.file === file 
              ? { ...f, status: 'success', progress: 100 }
              : f
          )
        );
      }, 2200);
    };

    reader.readAsDataURL(file);
  }, []);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(processFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  const successfulUploads = uploadedFiles.filter(f => f.status === 'success');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Upload Prescription</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Your Prescription</h2>
          <p className="text-gray-600 mb-6">
            Upload a clear photo or scan of your prescription. Our pharmacists will verify it and process your order.
          </p>
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Ensure your prescription is clearly visible, includes doctor's signature, 
              and is not expired. Supported formats: JPG, PNG, HEIC, PDF (max 10MB each).
            </AlertDescription>
          </Alert>
        </div>

        {/* Upload Area */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drag and drop your prescription here
                  </h3>
                  <p className="text-gray-600 mb-4">or</p>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={() => document.getElementById('file-input')?.click()}
                      className="mr-4"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => document.getElementById('camera-input')?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                  
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.heic,.pdf"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />
                  
                  <input
                    id="camera-input"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />
                </div>
                
                <p className="text-sm text-gray-500">
                  Supported formats: JPG, PNG, HEIC, PDF • Max size: 10MB per file
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedFiles.map((uploadedFile, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    {/* File Preview */}
                    <div className="w-16 h-16 flex-shrink-0">
                      {uploadedFile.file.type === 'application/pdf' ? (
                        <div className="w-full h-full bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-8 h-8 text-red-600" />
                        </div>
                      ) : uploadedFile.preview ? (
                        <img
                          src={uploadedFile.preview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {uploadedFile.file.name}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(uploadedFile.file)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-2">
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB
                      </p>

                      {/* Status */}
                      {uploadedFile.status === 'uploading' && (
                        <div className="space-y-1">
                          <Progress value={uploadedFile.progress} className="h-2" />
                          <p className="text-xs text-blue-600">Uploading... {uploadedFile.progress}%</p>
                        </div>
                      )}
                      
                      {uploadedFile.status === 'success' && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Uploaded Successfully
                          </Badge>
                        </div>
                      )}
                      
                      {uploadedFile.status === 'error' && (
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <Badge variant="destructive">Upload Failed</Badge>
                          </div>
                          <p className="text-xs text-red-600">{uploadedFile.error}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        {successfulUploads.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Prescription Uploaded Successfully!</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Your prescription has been uploaded and will be reviewed by our licensed pharmacists. 
                  You will receive a confirmation within 2-4 hours.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                    <li>Our pharmacist reviews your prescription</li>
                    <li>We verify the prescription with your doctor if needed</li>
                    <li>You receive an order confirmation via email/SMS</li>
                    <li>Your medicines are prepared and dispatched</li>
                  </ol>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/browse" className="flex-1">
                    <Button className="w-full">Browse More Medicines</Button>
                  </Link>
                  <Link to="/cart" className="flex-1">
                    <Button variant="outline" className="w-full">View Cart</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UploadPrescription;
