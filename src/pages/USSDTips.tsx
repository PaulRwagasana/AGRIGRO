import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Smartphone,
  Phone,
  Hash,
  MessageSquare,
  Clock,
  Leaf,
  Droplets,
  Sun,
  Bug,
  Copy,
  Check
} from 'lucide-react';

const USSDTips = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const ussdCodes = [
    {
      code: '*123*4*1#',
      title: 'Daily Weather & Farming Tips',
      description: 'Get daily weather updates and seasonal farming advice',
      category: 'weather',
      icon: Sun
    },
    {
      code: '*123*4*2#',
      title: 'Crop Disease Alerts',
      description: 'Receive alerts about common crop diseases in your area',
      category: 'disease',
      icon: Bug
    },
    {
      code: '*123*4*3#',
      title: 'Market Prices',
      description: 'Check current market prices for crops and livestock',
      category: 'market',
      icon: Hash
    },
    {
      code: '*123*4*4#',
      title: 'Irrigation Schedule',
      description: 'Get optimal watering schedules based on crop type',
      category: 'irrigation',
      icon: Droplets
    },
    {
      code: '*123*4*5#',
      title: 'Seasonal Planting Guide',
      description: 'Best times to plant different crops in Rwanda',
      category: 'planting',
      icon: Leaf
    }
  ];

  const messagingTips = [
    {
      number: '4567',
      format: 'FARM [QUESTION]',
      example: 'FARM How to treat maize pests?',
      description: 'Send farming questions via SMS and get expert replies within 2 hours'
    },
    {
      number: '4568',
      format: 'WEATHER [LOCATION]',
      example: 'WEATHER KIGALI',
      description: 'Get 5-day weather forecast for your specific location'
    },
    {
      number: '4569',
      format: 'PRICE [CROP]',
      example: 'PRICE MAIZE',
      description: 'Get current market prices and trends for specific crops'
    }
  ];

  const subscribeToService = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number to subscribe",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Subscription Successful!",
      description: `You will receive daily farming tips on ${phoneNumber}`,
    });
    setPhoneNumber('');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast({
      title: "Copied!",
      description: "USSD code copied to clipboard",
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      weather: 'bg-blue-100 text-blue-800',
      disease: 'bg-red-100 text-red-800',
      market: 'bg-green-100 text-green-800',
      irrigation: 'bg-cyan-100 text-cyan-800',
      planting: 'bg-emerald-100 text-emerald-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">USSD Farming Tips</h1>
          <p className="text-lg text-muted-foreground">
            Access farming information on any phone - no internet required
          </p>
        </div>

        {/* USSD Service Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>How USSD Works</span>
            </CardTitle>
            <CardDescription>
              USSD codes work on any mobile phone, even basic feature phones. 
              Simply dial the code and follow the prompts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Step 1: Dial</h3>
                <p className="text-sm text-muted-foreground">Dial the USSD code</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Step 2: Navigate</h3>
                <p className="text-sm text-muted-foreground">Follow menu options</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Step 3: Receive</h3>
                <p className="text-sm text-muted-foreground">Get instant information</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* USSD Codes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available USSD Services</CardTitle>
            <CardDescription>
              Quick access codes for different farming information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {ussdCodes.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{service.title}</h3>
                          <Badge className={getCategoryColor(service.category)} variant="secondary">
                            {service.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(service.code, service.code)}
                      >
                        {copied === service.code ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="bg-primary text-primary-foreground px-3 py-2 rounded font-mono text-lg mb-2">
                      {service.code}
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* SMS Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>SMS Information Services</span>
            </CardTitle>
            <CardDescription>
              Send SMS for detailed farming advice and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messagingTips.map((service, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Send to: {service.number}</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(service.number, `sms-${index}`)}
                    >
                      {copied === `sms-${index}` ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="bg-muted p-3 rounded mb-2">
                    <p className="font-mono text-sm">
                      <strong>Format:</strong> {service.format}
                    </p>
                    <p className="font-mono text-sm text-muted-foreground">
                      <strong>Example:</strong> {service.example}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Service */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Daily Tips Subscription</span>
            </CardTitle>
            <CardDescription>
              Receive daily farming tips and weather updates via SMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-sky rounded-lg">
                <h3 className="font-medium mb-2">What you'll receive:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Daily weather forecast for your area</li>
                  <li>• Seasonal farming tips and best practices</li>
                  <li>• Disease and pest alerts</li>
                  <li>• Market price updates</li>
                  <li>• Emergency farming alerts</li>
                </ul>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your phone number (e.g., +250 xxx xxx xxx)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={subscribeToService} className="whitespace-nowrap">
                  Subscribe Free
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                * Standard SMS rates apply. You can unsubscribe anytime by sending STOP to 4567
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Service Hours */}
        <div className="mt-8 p-4 bg-muted rounded-lg text-center">
          <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="font-medium">Service Available 24/7</p>
          <p className="text-sm text-muted-foreground">
            USSD and SMS services work around the clock. Expert responses to questions within 2 hours during business hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default USSDTips;