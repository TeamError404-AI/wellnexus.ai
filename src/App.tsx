import React from 'react';
import {
  Shield,
  Brain,
  UserRound,
  MessageSquareText,
  Activity,
  Lock,
  HeartPulse,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <HeartPulse className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">WellNexus.AI</span>
          </div>
          <div className="space-x-8">
            <button className="text-gray-600 hover:text-blue-600">About</button>
            <button className="text-gray-600 hover:text-blue-600">Services</button>
            <button className="text-gray-600 hover:text-blue-600">Contact</button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </nav>

        <div className="flex items-center">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Predict Health Risks with Privacy-Preserved AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Make informed health decisions with our federated AI system that respects your privacy
              while providing accurate health risk assessments and real-time medical support.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 shadow-lg">
              Check Your Health Risk
            </button>
          </div>
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
              alt="Medical Technology"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How HealthGuard AI Works
          </h2>
          <div className="grid grid-cols-3 gap-12">
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-blue-600" />}
              title="Privacy-First Approach"
              description="Your health data stays on your device. Our federated learning system ensures complete privacy while delivering accurate predictions."
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-blue-600" />}
              title="AI-Powered Analysis"
              description="Advanced machine learning algorithms analyze symptoms and provide personalized health risk assessments."
            />
            <FeatureCard
              icon={<MessageSquareText className="h-8 w-8 text-blue-600" />}
              title="24/7 Doctor Support"
              description="Connect with healthcare professionals in real-time for expert guidance and consultation."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Simple Steps to Better Health
          </h2>
          <div className="grid grid-cols-4 gap-8">
            <Step
              number="1"
              title="Enter Symptoms"
              description="Input your symptoms and health concerns securely"
              icon={<AlertCircle className="h-6 w-6 text-blue-600" />}
            />
            <Step
              number="2"
              title="AI Analysis"
              description="Our AI processes your data locally for privacy"
              icon={<Activity className="h-6 w-6 text-blue-600" />}
            />
            <Step
              number="3"
              title="Get Insights"
              description="Receive personalized health risk assessment"
              icon={<CheckCircle2 className="h-6 w-6 text-blue-600" />}
            />
            <Step
              number="4"
              title="Expert Support"
              description="Connect with doctors for professional advice"
              icon={<UserRound className="h-6 w-6 text-blue-600" />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Take Control of Your Health Today
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of users who trust HealthGuard AI for their health risk assessment needs.
            Your privacy is our priority.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100">
            Start Free Assessment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <HeartPulse className="h-6 w-6" />
              <span className="text-xl font-bold">HealthGuard AI</span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-blue-400">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400">Terms of Service</a>
              <a href="#" className="hover:text-blue-400">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © 2025 HealthGuard AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Step({ number, title, description, icon }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <div className="text-xl font-semibold text-gray-900 mb-2">{title}</div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;