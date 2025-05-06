import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, createPost, updatePost, deletePost } from '../../store/postSlice';
import { toggleDarkMode } from '../../store/themeSlice';
import EditModal from '../../components/EditModal';
import DeleteModal from '../../components/DeleteModal';

const Home = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPostId, setDeletingPostId] = useState(null);

  const currentUser = useSelector((state) => state.user.name);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.list);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreate = () => {
    if (title && content) {
      const newPost = {
        id: Date.now(),
        title,
        content,
        author: currentUser,
        time: 'just now',
      };
      dispatch(createPost(newPost));
      setTitle('');
      setContent('');
    }
  };
  

  const handleSaveEdit = (updatedPost) => {
    dispatch(updatePost(updatedPost));
    setEditingPost(null);
  };
  
  const handleDelete = () => {
    dispatch(deletePost(deletingPostId));
    setDeletingPostId(null);
  };
  

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen flex justify-center px-4 sm:px-6 lg:px-8`}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <header className="bg-[#7494ec] text-white p-4 text-xl font-semibold flex justify-between items-center">
          <span>CodeLeap Network</span>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="text-xl"
            title="Toggle Dark Mode"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </header>

        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded p-6 space-y-6 shadow`}>
          {/* Formulário */}
          <div className={`${darkMode ? 'border-gray-600' : 'border-gray-300'} space-y-4 border rounded-md p-4 shadow-sm`}>
            <h2 className="font-semibold text-lg mb-4">What's on your mind?</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className={`w-full border rounded px-3 py-2 ${darkMode ? 'bg-gray-900 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                placeholder="Hello world"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                className={`w-full border rounded px-3 py-2 ${darkMode ? 'bg-gray-900 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
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
                onClick={handleCreate}
                disabled={!title || !content}
              >
                Create
              </button>
            </div>
          </form>
        </div>

        {/* Cards de Postagens */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded shadow`}>
              <div className="bg-[#7494ec] text-white px-4 py-2 flex justify-between items-center rounded-t">
                <span className="font-semibold">{post.title} at CodeLeap Network!</span>
                {post.author === currentUser && (
                  <div className="space-x-2 text-white text-lg">
                    <button title="Edit" onClick={() => setEditingPost(post)}>📝</button>
                    <button title="Delete" onClick={() => setDeletingPostId(post.id)}>🗑️</button>
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
          ))}
        </div>
      </div>
      </div>
      <EditModal
        isOpen={!!editingPost}
        onClose={() => setEditingPost(null)}
        onSave={handleSaveEdit}
        post={editingPost}
      />
      <DeleteModal
        isOpen={!!deletingPostId}
        onClose={() => setDeletingPostId(null)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
