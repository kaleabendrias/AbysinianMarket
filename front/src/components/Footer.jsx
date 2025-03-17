const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h1 className="text-2xl font-bold">
              <span className="bg-white text-black rounded-lg px-2 py-1">Abysinia</span> Market
            </h1>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-black focus:outline-none"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-sm">
              © 2024 - Built by{" "}
              <a
                href="https://github.com/kaleabendrias"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
              >
                Kaleab Endrias
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;