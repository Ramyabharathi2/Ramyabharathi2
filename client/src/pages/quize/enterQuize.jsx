import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PlayQuizPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 50000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleYes = () => {
    setShowPrompt(false);
    navigate("/playquiz");
  };

  const handleNo = () => {
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-white via-blue-100 to-blue-200 rounded-xl p-8 text-center shadow-2xl max-w-md w-full border border-blue-300"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-4 animate-bounce">Ready to Play a Quiz?</h2>
            <p className="text-gray-600 mb-6">Challenge yourself and test your knowledge!</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleYes}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition transform duration-200"
              >
                Yes, Let's Go!
              </button>
              <button
                onClick={handleNo}
                className="bg-gray-300 text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-400 transition"
              >
                Not Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlayQuizPrompt;
