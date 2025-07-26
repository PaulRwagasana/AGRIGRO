import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Camera,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  Loader2
} from 'lucide-react';

const DiseaseDetection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [livestockType, setLivestockType] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        disease: "Foot and Mouth Disease",
        confidence: 87,
        severity: "moderate",
        symptoms: [
          "Blisters on hooves",
          "Excessive salivation",
          "Fever symptoms"
        ],
        treatment: [
          "Isolate affected animals immediately",
          "Apply antiseptic solution to blisters",
          "Provide supportive care with fluids",
          "Contact veterinarian for vaccination schedule"
        ],
        prevention: [
          "Regular hoof inspections",
          "Maintain clean, dry housing",
          "Implement quarantine protocols for new animals"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "No symptoms provided",
        description: "Please describe the symptoms you've observed",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        disease: "Possible Respiratory Infection",
        confidence: 73,
        severity: "mild",
        symptoms: [
          "Coughing",
          "Nasal discharge",
          "Reduced appetite"
        ],
        treatment: [
          "Ensure proper ventilation",
          "Provide antibiotics as prescribed",
          "Monitor temperature regularly",
          "Increase fluid intake"
        ],
        prevention: [
          "Improve air quality in housing",
          "Regular health checkups",
          "Vaccination schedule maintenance"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-accent text-accent-foreground';
      case 'moderate': return 'bg-yellow-500 text-white';
      case 'severe': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Disease Detection</h1>
          <p className="text-lg text-muted-foreground">
            Advanced AI-powered livestock disease identification and treatment recommendations
          </p>
        </div>

        <Tabs defaultValue="camera" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Photo Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Symptom Description</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Upload Livestock Photo</span>
                </CardTitle>
                <CardDescription>
                  Take or upload a clear photo of the affected animal for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={selectedImage} 
                        alt="Selected livestock" 
                        className="max-w-full h-64 object-cover rounded-lg mx-auto"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">Upload or capture photo</p>
                        <p className="text-sm text-muted-foreground">
                          Supported formats: JPG, PNG, WebP
                        </p>
                      </div>
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Select Image
                      </Button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                
                <Button 
                  onClick={analyzeImage} 
                  disabled={!selectedImage || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Analyze Disease
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Describe Symptoms</span>
                </CardTitle>
                <CardDescription>
                  Provide detailed information about the observed symptoms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="livestock-type">Livestock Type</Label>
                  <Input
                    id="livestock-type"
                    placeholder="e.g., Cow, Goat, Sheep, Pig"
                    value={livestockType}
                    onChange={(e) => setLivestockType(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Observed Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe the symptoms you've observed: behavior changes, physical symptoms, eating patterns, etc."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={6}
                  />
                </div>
                
                <Button 
                  onClick={analyzeSymptoms} 
                  disabled={!symptoms.trim() || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Get Diagnosis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Analysis Results */}
        {analysisResult && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Analysis Results</span>
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {analysisResult.confidence}% confidence
                  </Badge>
                  <Badge className={getSeverityColor(analysisResult.severity)}>
                    {analysisResult.severity}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Diagnosed: {analysisResult.disease}
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Symptoms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.symptoms.map((symptom: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-accent rounded-full"></span>
                          <span className="text-sm">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Treatment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.treatment.map((step: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Prevention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysisResult.prevention.map((tip: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary-glow" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Disclaimer:</strong> This AI diagnosis is for reference only. 
                  Always consult with a qualified veterinarian for professional medical advice and treatment.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetection;