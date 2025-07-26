import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Camera, FlaskConical, Users, Smartphone, Leaf, ArrowRight } from 'lucide-react';

const Index = () => {
  const features = [
    {
      title: 'Disease Detection',
      description: 'AI-powered livestock disease identification',
      icon: Camera,
      path: '/disease-detection',
      color: 'text-red-600'
    },
    {
      title: 'Soil Analyzer',
      description: 'Comprehensive soil health analysis',
      icon: FlaskConical,
      path: '/soil-analyzer',
      color: 'text-blue-600'
    },
    {
      title: 'Farmers Hub',
      description: 'Community, resources & Kinyarwanda chat',
      icon: Users,
      path: '/farmers-hub',
      color: 'text-green-600'
    },
    {
      title: 'USSD Tips',
      description: 'Farming tips for rural farmers',
      icon: Smartphone,
      path: '/ussd',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-sky py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="h-16 w-16 text-primary mr-4" />
            <h1 className="text-5xl font-bold text-primary">AgriGro</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Empowering Rwandan farmers with AI-powered tools for disease detection, 
            soil analysis, and agricultural knowledge sharing
          </p>
          <Button asChild size="lg" className="shadow-primary">
            <Link to="/disease-detection">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Comprehensive Farming Solutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-card transition-shadow">
                  <CardHeader className="text-center">
                    <div className={`mx-auto mb-4 p-3 rounded-full bg-muted ${feature.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button asChild variant="outline" className="w-full">
                      <Link to={feature.path}>
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
