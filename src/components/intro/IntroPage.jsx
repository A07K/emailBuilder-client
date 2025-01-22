import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Box, Zap, Shield } from "lucide-react";
import { useSignIn } from "../../hooks/useSignIn";

const IntroPage = () => {
  const { loginEmail, loading } = useSignIn();
  const [isSignInOpen, setIsSignInOpen] = useState(false); // Modal state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (email && password) {
      await loginEmail(email, password);
    }
  };

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
              <button
                onClick={() => setIsSignInOpen(true)}
                className="rounded-lg border border-gray-200 px-6 py-2 text-sm font-medium transition-all hover:border-gray-300"
              >
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

      {/* Sign In Modal */}
      {isSignInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <button
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsSignInOpen(false)}
            >
              ✕
            </button>
            <h3 className="mb-4 text-center text-xl font-semibold text-gray-800">
              Sign In to EmailBuilder
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-lg border-gray-300 px-4 py-2 text-gray-800 focus:border-primary focus:ring-primary"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-lg border-gray-300 px-4 py-2 text-gray-800 focus:border-primary focus:ring-primary"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-4 py-2 transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroPage;
