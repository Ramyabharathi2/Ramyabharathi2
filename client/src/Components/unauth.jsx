import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 rounded-2xl shadow-lg bg-gray-800 max-w-lg"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
          className="flex justify-center"
        >
          <AlertTriangle size={50} className="text-yellow-400" />
        </motion.div>
        <h1 className="text-3xl font-bold mt-4">Unauthorized Access</h1>
        <p className="text-gray-300 mt-2">
          You do not have permission to view this page.
        </p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6"
        >
          <Link
            to="/"
            className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            Go to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}