import React, { useState } from 'react';

const CreatePostForm = ({ onCreate, darkMode }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    onCreate({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className={`${darkMode ? 'border-gray-600' : 'border-gray-300'} space-y-4 border rounded-md p-4 shadow-sm`}>
      <h2 className="font-semibold text-lg mb-4">What's on your mind?</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-5 py-2 rounded font-semibold text-white ${
              title && content
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!title || !content}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
