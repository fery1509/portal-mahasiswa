import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg("NIM atau kata sandi tidak valid");
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Full screen */}
      <div className="absolute inset-0">
        <img
          src="/images/poliban-building.jpg"
          alt="Poliban Building"
          className="w-full h-full object-cover"
        />
        {/* Overlay untuk memastikan teks tetap terbaca */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 p-8 rounded-xl backdrop-blur-md bg-white/30 shadow-xl border border-white/30">
          {/* Logos */}
          <div className="flex justify-center items-center gap-6">
            <img
              src="/images/logo-simak.png"
              alt="Logo SIMAK"
              className="h-12 w-auto"
            />
            <img
              src="/images/logo-univ.png"
              alt="Logo Universitas"
              className="h-16 w-auto"
            />
            <img
              src="/images/logo-kampus-merdeka.png"
              alt="Logo Kampus Merdeka"
              className="h-12 w-auto"
            />
          </div>

          {/* Heading */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Masuk ke SIMAK
            </h2>
            <p className="text-base text-white/80">
              Akses Mudah, Akademik Lancar
            </p>
          </div>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="nim"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  NIM
                </label>
                <div className="mt-2">
                  <input
                    id="nim"
                    name="nim"
                    type="text"
                    required
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 bg-white/50 backdrop-blur-sm placeholder:text-gray-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Kata sandi anda
                </label>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 bg-white/50 backdrop-blur-sm placeholder:text-gray-500 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-600 hover:text-gray-800 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-600 hover:text-gray-800 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <a
                href="#"
                className="text-sm font-medium text-white hover:text-white/80 transition-colors"
              >
                Lupa kata sandi?
              </a>
            </div>

            {(error || errorMsg) && (
              <div className="bg-red-500/50 backdrop-blur-sm border border-red-300/50 text-white px-4 py-3 rounded-lg text-sm">
                {errorMsg || (error && "NIM atau kata sandi tidak valid")}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

            <p className="text-center text-sm text-white">
              Belum Punya Akun?{" "}
              <a
                href="#"
                className="font-medium text-white hover:text-white/80 transition-colors"
              >
                Buat Akun
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
