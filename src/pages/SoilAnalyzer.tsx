import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Camera,
  Upload,
  FlaskConical,
  Droplets,
  Thermometer,
  Zap,
  Leaf,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

const SoilAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  const analyzeSoil = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select a soil image to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        soilType: "Loamy Clay",
        overallHealth: "Good",
        ph: 6.8,
        moisture: 65,
        organicMatter: 4.2,
        nitrogen: 2.1,
        phosphorus: 45,
        potassium: 180,
        nutrients: {
          nitrogen: { level: 2.1, status: "adequate", color: "text-accent" },
          phosphorus: { level: 45, status: "high", color: "text-primary-glow" },
          potassium: { level: 180, status: "optimal", color: "text-primary" }
        },
        recommendations: [
          "Maintain current organic matter levels through regular composting",
          "Consider reducing phosphorus inputs in next season",
          "pH level is ideal for most crops - no adjustment needed",
          "Monitor moisture levels during dry periods"
        ],
        fertilizers: [
          {
            name: "NPK 15-5-20",
            application: "2-3 kg per 100m²",
            timing: "Before planting season"
          },
          {
            name: "Organic Compost",
            application: "5-10 cm layer",
            timing: "Monthly application"
          }
        ],
        bestCrops: [
          "Maize", "Beans", "Tomatoes", "Carrots", "Lettuce"
        ]
      });
      setIsAnalyzing(false);
    }, 4000);
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Excellent': return 'text-primary';
      case 'Good': return 'text-primary-glow';
      case 'Fair': return 'text-accent';
      case 'Poor': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getPhStatus = (ph: number) => {
    if (ph < 6.0) return { status: "Acidic", color: "text-yellow-600", recommendation: "Add lime to increase pH" };
    if (ph > 7.5) return { status: "Alkaline", color: "text-blue-600", recommendation: "Add sulfur to decrease pH" };
    return { status: "Optimal", color: "text-primary", recommendation: "pH level is perfect" };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Soil Health Analyzer</h1>
          <p className="text-lg text-muted-foreground">
            Advanced soil analysis and treatment recommendations for optimal crop growth
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FlaskConical className="h-5 w-5" />
              <span>Upload Soil Photo</span>
            </CardTitle>
            <CardDescription>
              Take a clear photo of your soil sample for comprehensive analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {selectedImage ? (
                <div className="space-y-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected soil" 
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
                  <FlaskConical className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">Upload soil sample photo</p>
                    <p className="text-sm text-muted-foreground">
                      Best results with natural lighting and close-up shots
                    </p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
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
              onClick={analyzeSoil} 
              disabled={!selectedImage || isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Soil...
                </>
              ) : (
                <>
                  <FlaskConical className="h-4 w-4 mr-2" />
                  Analyze Soil Health
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Overall Health Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Soil Analysis Results</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{analysisResult.soilType}</Badge>
                    <Badge className={`${getHealthColor(analysisResult.overallHealth)} bg-opacity-10`}>
                      {analysisResult.overallHealth} Health
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{analysisResult.moisture}%</p>
                    <p className="text-sm text-muted-foreground">Moisture</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Thermometer className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <p className="text-2xl font-bold">{analysisResult.ph}</p>
                    <p className="text-sm text-muted-foreground">pH Level</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Leaf className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{analysisResult.organicMatter}%</p>
                    <p className="text-sm text-muted-foreground">Organic Matter</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                    <p className="text-2xl font-bold">85</p>
                    <p className="text-sm text-muted-foreground">Health Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nutrient Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Nutrient Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Nitrogen (N)</span>
                      <span className={analysisResult.nutrients.nitrogen.color}>
                        {analysisResult.nutrients.nitrogen.level}% - {analysisResult.nutrients.nitrogen.status}
                      </span>
                    </div>
                    <Progress value={(analysisResult.nutrients.nitrogen.level / 5) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Phosphorus (P)</span>
                      <span className={analysisResult.nutrients.phosphorus.color}>
                        {analysisResult.nutrients.phosphorus.level}ppm - {analysisResult.nutrients.phosphorus.status}
                      </span>
                    </div>
                    <Progress value={(analysisResult.nutrients.phosphorus.level / 60) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Potassium (K)</span>
                      <span className={analysisResult.nutrients.potassium.color}>
                        {analysisResult.nutrients.potassium.level}ppm - {analysisResult.nutrients.potassium.status}
                      </span>
                    </div>
                    <Progress value={(analysisResult.nutrients.potassium.level / 200) * 100} className="h-2" />
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    {getPhStatus(analysisResult.ph).color.includes('primary') ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-accent" />
                    )}
                    <span className="font-medium">pH Status: {getPhStatus(analysisResult.ph).status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getPhStatus(analysisResult.ph).recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Fertilizers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.fertilizers.map((fertilizer: any, index: number) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium">{fertilizer.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Application: {fertilizer.application}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Timing: {fertilizer.timing}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Best Crops */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5" />
                  <span>Recommended Crops for This Soil</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.bestCrops.map((crop: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {crop}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  These crops are well-suited for your soil type and current nutrient levels.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilAnalyzer;