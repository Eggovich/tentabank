import React, { useState, useEffect } from 'react';
import './comments.css';

const Comments = ({ examId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/exams/${examId}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data.comments));
  }, [examId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file_id", examId);
    formData.append("user_id", userId);
    formData.append("content", newComment);

    fetch("http://localhost:5000/comments", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setComments([
          ...comments,
          { comment_id: Date.now(), comment: newComment, created_on: new Date() },
        ]);
        setNewComment('');
      });
  };

  
  return (
    <div className="comment-section">
      <div className="comment-input">
        <textarea
          placeholder="Add a comment..."
          rows="2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>Post</button>
      </div>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="comment-item">
            <li className="comment-author">{comment.username}</li>
            <li className='comment-author'>{comment.created_on}</li>
            <li className="comment-text">{comment.comment}</li>
          </li>
        ))}
      </ul>
    </div>
  );  
};

export default Comments;
