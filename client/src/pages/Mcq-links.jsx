import React, { useState } from "react";
import Sidebar from "../Components/SiderBar";

const MCQLinks = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle adding a new link resource
  const addLinkResource = () => {
    if (newResource.trim() === "") {
      alert("Please provide a valid URL.");
      return;
    }

    const newResourceData = {
      id: Date.now(),
      type: "link",
      value: newResource,
    };

    setResources([...resources, newResourceData]);
    setNewResource("");
  };

  // Handle uploading a new file resource
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);

      // Simulate a file upload
      setTimeout(() => {
        const newResourceData = {
          id: Date.now(),
          type: "file",
          value: file.name,
        };

        setResources([...resources, newResourceData]);
        setUploadFile(null);
        setIsUploading(false);
      }, 1000);
    }
  };

  // Handle deleting a resource
  const deleteResource = (id) => {
    setResources(resources.filter((res) => res.id !== id));
  };

  return (
    <div className="flex">
      {/* Sidebar Section */}
      <div className="w-1/4">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="w-3/4 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
          <h1 className="text-2xl font-bold mb-6">Link Resource Manager</h1>

          {/* Add a New Link Resource */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Add a Link Resource</h2>
            <input
              type="text"
              value={newResource}
              onChange={(e) => setNewResource(e.target.value)}
              placeholder="Enter a URL"
              className="w-full p-3 border rounded-md mb-4"
            />
            <button
              onClick={addLinkResource}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Link
            </button>
          </div>

          {/* Upload a File Resource */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Upload a File Resource</h2>
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-full p-3 border rounded-md"
            />
            {isUploading && (
              <p className="text-blue-500 mt-2">Uploading file...</p>
            )}
          </div>

          {/* Display Existing Resources */}
          {resources.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Uploaded Resources</h2>
              {resources.map((res) => (
                <div
                  key={res.id}
                  className="p-4 border rounded-md mb-6 shadow-sm bg-gray-50"
                >
                  <h3 className="text-lg font-bold mb-2">
                    {res.type === "link" ? "Link" : "File"}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {res.type === "link" ? (
                      <a
                        href={res.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {res.value}
                      </a>
                    ) : (
                      res.value
                    )}
                  </p>
                  <button
                    onClick={() => deleteResource(res.id)}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCQLinks;
