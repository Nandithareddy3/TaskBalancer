import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

function CommentBox({ comments = [], onAddComment }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAddComment(text.trim());
            setText('');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 mt-4">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Internal Comments</h3>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {comments.length === 0 && (
                    <p className="text-gray-400 text-sm">No comments yet.</p>
                )}
                {comments.map((comment, idx) => (
                    <div key={idx} className="text-sm bg-gray-100 p-2 rounded-md">
                        {comment}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-3">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Add a private comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                    title="Send"
                >
                    <FaPaperPlane size={16} />
                </button>
            </form>
        </div>
    );
}

export default CommentBox;
