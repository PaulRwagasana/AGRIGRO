import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import {
  MessageCircle,
  Download,
  Users,
  Calendar,
  Trophy,
  FileText,
  Video,
  Send,
  Bot,
  User,
  Syringe,
  Plus,
  CheckCircle
} from 'lucide-react';

const FarmersHub = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message: 'Muraho! Ndi ChatBot w\'ubuhinzi. Nshobora gufasha mu bikoresho by\'ubuhinzi. Ubaza iki?',
      time: '10:30'
    }
  ]);
  const [vaccinations, setVaccinations] = useState([
    { id: 1, animal: 'Cow #001', vaccine: 'FMD Vaccine', date: '2024-02-15', status: 'pending' },
    { id: 2, animal: 'Goat #003', vaccine: 'PPR Vaccine', date: '2024-02-18', status: 'completed' },
    { id: 3, animal: 'Pig #002', vaccine: 'Classical Swine Fever', date: '2024-02-20', status: 'pending' }
  ]);
  const { toast } = useToast();

  const successStories = [
    {
      name: 'Jean Baptiste Uwimana',
      location: 'Nyanza District',
      story: 'Increased maize yield by 300% using modern farming techniques',
      image: '/placeholder.svg',
      achievement: 'Best Farmer 2023',
      details: 'Transformed 2 hectares of land into highly productive farm using crop rotation and organic fertilizers'
    },
    {
      name: 'Marie Claire Mukamana',
      location: 'Rwamagana District',
      story: 'Built successful dairy cooperative with 50+ members',
      image: '/placeholder.svg',
      achievement: 'Cooperative Leader',
      details: 'Started with 3 cows, now manages dairy cooperative generating 2M RWF monthly'
    },
    {
      name: 'Emmanuel Nkurunziza',
      location: 'Musanze District',
      story: 'Pioneer in greenhouse vegetable farming in volcanic soil',
      image: '/placeholder.svg',
      achievement: 'Innovation Award',
      details: 'First farmer in region to successfully grow tomatoes year-round using greenhouse technology'
    }
  ];

  const resources = [
    {
      title: 'Modern Maize Farming Techniques',
      type: 'PDF',
      size: '2.3 MB',
      downloads: 1248,
      icon: FileText
    },
    {
      title: 'Dairy Cow Management Guide',
      type: 'Video',
      size: '15 MB',
      downloads: 892,
      icon: Video
    },
    {
      title: 'Organic Fertilizer Production',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 1567,
      icon: FileText
    },
    {
      title: 'Poultry Farming Best Practices',
      type: 'Video',
      size: '22 MB',
      downloads: 743,
      icon: Video
    },
    {
      title: 'Coffee Growing Manual',
      type: 'PDF',
      size: '3.1 MB',
      downloads: 2089,
      icon: FileText
    },
    {
      title: 'Greenhouse Construction Guide',
      type: 'Video',
      size: '28 MB',
      downloads: 456,
      icon: Video
    }
  ];

  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage = {
      type: 'user',
      message: chatMessage,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, newMessage]);
    setChatMessage('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      const lowerMessage = chatMessage.toLowerCase();
      
      if (lowerMessage.includes('ibigori') || lowerMessage.includes('maize')) {
        botResponse = 'Kubi ibigori, ni ngombwa gukoresha ifumbire nziza, guhitamo imbuto ziza, no kugira amazi ahagije. Ugomba gusarura ku munsi umunani.';
      } else if (lowerMessage.includes('inka') || lowerMessage.includes('cow')) {
        botResponse = 'Inka zigomba kugira ibiribwa byiza, amazi meza, n\'ahantu heza ho kuraramo. Kandi zigomba gutabarwa na muganga w\'amatungo buri gihe.';
      } else if (lowerMessage.includes('ifumbire') || lowerMessage.includes('fertilizer')) {
        botResponse = 'Ifumbire nyinshi ishobora gukoreshwa: ifumbire karemano, ifumbire ya kimitirire. Hitamo ubwoko bukwiye uturutse ku mahame y\'ubutaka bwawe.';
      } else {
        botResponse = 'Urakoze kubaza. Nshobora gufasha mu bikoresho by\'ubuhinzi nk\'ibigori, inka, ifumbire, n\'ibindi. Ubaza ikindi?';
      }

      const botMessage = {
        type: 'bot',
        message: botResponse,
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, botMessage]);
    }, 1000);
  };

  const downloadResource = (title: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${title} for offline use`,
    });
  };

  const markVaccinationComplete = (id: number) => {
    setVaccinations(prev => 
      prev.map(vac => 
        vac.id === id ? { ...vac, status: 'completed' } : vac
      )
    );
    toast({
      title: "Vaccination Recorded",
      description: "Vaccination has been marked as completed",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Farmers Hub</h1>
          <p className="text-lg text-muted-foreground">
            Community platform for Rwandan farmers - Chat, Learn, and Grow Together
          </p>
        </div>

        <Tabs defaultValue="chatbot" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chatbot" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Kinyarwanda Chat</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Success Stories</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="vaccination" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Vaccination</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chatbot" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <span>Kinyarwanda Farming Assistant</span>
                </CardTitle>
                <CardDescription>
                  Baza ibibazo bijyanye n'ubuhinzi mu Kinyarwanda - Ask farming questions in Kinyarwanda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 border rounded-lg p-4 mb-4 overflow-y-auto bg-muted/30">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex items-start space-x-3 mb-4 ${chat.type === 'user' ? 'justify-end' : ''}`}>
                      {chat.type === 'bot' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        chat.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-card border'
                      }`}>
                        <p className="text-sm">{chat.message}</p>
                        <p className="text-xs opacity-70 mt-1">{chat.time}</p>
                      </div>
                      {chat.type === 'user' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-accent text-accent-foreground">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Andika ibibazo byawe hano... (Type your farming questions here...)"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} disabled={!chatMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={story.image} alt={story.name} />
                        <AvatarFallback>{story.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{story.name}</h3>
                        <p className="text-sm text-muted-foreground">{story.location}</p>
                      </div>
                    </div>
                    <Badge className="w-fit bg-accent text-accent-foreground">
                      <Trophy className="h-3 w-3 mr-1" />
                      {story.achievement}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium mb-2">{story.story}</p>
                    <p className="text-xs text-muted-foreground">{story.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Farming Resources for Offline Use</span>
                </CardTitle>
                <CardDescription>
                  Download PDF guides and videos for offline learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => {
                    const IconComponent = resource.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${resource.type === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {resource.type} • {resource.size} • {resource.downloads} downloads
                            </p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => downloadResource(resource.title)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vaccination" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Syringe className="h-5 w-5" />
                    <span>Vaccination Scheduler</span>
                  </span>
                  <Button size="sm" className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Schedule</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Track and manage livestock vaccination schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vaccinations.map((vaccination) => (
                    <div key={vaccination.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          vaccination.status === 'completed' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-accent text-accent-foreground'
                        }`}>
                          <Syringe className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{vaccination.animal}</h4>
                          <p className="text-sm text-muted-foreground">{vaccination.vaccine}</p>
                          <p className="text-sm text-muted-foreground">Due: {vaccination.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={vaccination.status === 'completed' ? 'default' : 'secondary'}>
                          {vaccination.status === 'completed' ? 'Completed' : 'Pending'}
                        </Badge>
                        {vaccination.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => markVaccinationComplete(vaccination.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Done
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmersHub;