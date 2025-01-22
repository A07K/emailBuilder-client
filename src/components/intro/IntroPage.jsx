import { Link } from "react-router-dom";
import { Mail, ArrowRight, Box, Zap, Shield } from "lucide-react";

const IntroPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col items-center justify-center space-y-20">
          {/* Logo & Brand */}
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center">
              <Mail className="h-16 w-16 text-primary" />
              <span className="ml-4 text-5xl font-bold">EmailBuilder</span>
            </div>
            <h2 className="mt-6 text-3xl font-light text-gray-600">
              Create beautiful email templates with ease
            </h2>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center space-y-6">
            <Link
              to="/builder"
              className="group border border-gray-800 flex items-center space-x-2 rounded-full bg-primary px-8 py-4 text-lg font-medium text-white transition-all hover:bg-primary/90"
            >
              <span className="text-gray-900">Start Building</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1 group-hover:text-gray-900" />
            </Link>

            <div className="flex space-x-4">
              <button className="rounded-lg border border-gray-200 px-6 py-2 text-sm font-medium transition-all hover:border-gray-300">
                Sign In
              </button>
              <button className="rounded-lg bg-gray-900 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800">
                Create Account
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                icon: <Box className="h-8 w-8 text-primary" />,
                title: "Drag & Drop",
                description: "Intuitive builder interface",
              },
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: "Lightning Fast",
                description: "Real-time preview & editing",
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Enterprise Ready",
                description: "Secure & scalable platform",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
