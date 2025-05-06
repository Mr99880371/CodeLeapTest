import React from 'react';

const Post = ({ post, currentUser, onEdit, onDelete, darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded shadow`}>
      <div className="bg-[#7494ec] text-white px-4 py-2 flex justify-between items-center rounded-t">
        <span className="font-semibold">{post.title} at CodeLeap Network!</span>
        {post.author === currentUser && (
          <div className="space-x-2 text-white text-lg">
            <button title="Edit" onClick={() => onEdit(post)}>📝</button>
            <button title="Delete" onClick={() => onDelete(post.id)}>🗑️</button>
          </div>
        )}
      </div>
      <div className="px-4 py-2 text-sm flex justify-between">
        <span>@{post.author}</span>
        <span>{post.time}</span>
      </div>
      <div className="px-4 pb-4 text-sm whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
};

export default Post;
