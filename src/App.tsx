import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Send, AlertCircle } from 'lucide-react';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

function App() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const healthRiskScore = 75;

  const data = [
    { name: 'Risk', value: healthRiskScore },
    { name: 'Safe', value: 100 - healthRiskScore },
  ];

  const COLORS = ['#ef4444', '#e5e7eb'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contacting doctor with:', { name, contact });
  };

  const handleAIResponse = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    try {
      console.log('Sending request to OpenAI...');
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful medical AI assistant. Provide concise, informative responses to health-related questions."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      console.log('OpenAI response:', completion);

      const response = completion.choices[0]?.message?.content;
      if (response) {
        setAiResponse(response);
      } else {
        console.error('No content in OpenAI response:', completion);
        throw new Error('No response from AI');
      }
    } catch (error: any) {
      console.error('Error getting AI response:', {
        error: error.message,
        details: error.response?.data || error
      });
      setAiResponse('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black-900 mb-8 text-center">
          Dashboard
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Risk Score and AI Chat */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-black-900 mb-4">Your Risk Level</h2>
              <div className="flex justify-center">
                <div className="relative">
                  <PieChart width={200} height={100}>
                    <Pie
                      data={data}
                      cx={105}
                      cy={90}
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/3 translate-y-[-25%] text-center">
                    <span className="text-3xl font-bold text-red-500">{healthRiskScore}%</span>
                    <p className="text-sm text-gray-600">Risk Level</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-red-500 flex items-center gap-2">
                  <AlertCircle size={20} />
                  Preventive Tips
                </h3>
                <ul className="mt-2 text-gray-600 space-y-2">
                  <li>• Maintain regular exercise routine</li>
                  <li>• Follow a balanced diet</li>
                  <li>• Get adequate sleep</li>
                  <li>• Monitor blood pressure regularly</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-black-900 mb-4">Your AI Health Assistant</h2>
              {aiResponse && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700">{aiResponse}</p>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about your health concerns..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && message.trim() && handleAIResponse()}
                />
                <button
                  onClick={handleAIResponse}
                  disabled={isLoading || !message.trim()}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-black-900 mb-6">Talk To Your Doctor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contact" className="block text-gray-700 mb-2">Contact Number</label>
                <input
                  id="contact"
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Contact Doctor Now
              </button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Emergency Contact Hours</h3>
              <p className="text-gray-600">24/7 Available for Emergency Consultations</p>
              <p className="text-gray-600">Regular Hours: Mon-Fri 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;