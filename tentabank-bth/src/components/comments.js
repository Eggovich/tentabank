import React, { useState, useEffect } from 'react';
import {confirmAlert} from "react-confirm-alert"
import './comments.css';

const Comments = ({ examId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [posted, setPosted] = useState(false);
  const [replyContents, setReplyContents] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/exams/${examId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, [examId, posted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleReplySubmit(e, null);
  };

  const handleReplySubmit = (e, parentCommentId) => {
    e.preventDefault();

    const content = parentCommentId === null ? newComment : replyContents[parentCommentId];

    const formData = new FormData();
    formData.append("file_id", examId);
    formData.append("user_id", userId);
    formData.append("content", content);
    formData.append("parent_comment_id", parentCommentId);

    fetch("http://localhost:5000/comments", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setNewComment('');
        setReplyContents({ ...replyContents, [parentCommentId]: '' });
        setPosted(!posted);
      });
  };

  const handleDeleteComment = (commentId) => {
    fetch(`http://localhost:5000/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        setPosted(!posted);
      });
  };

  const handleErase = (comment_id) => {
    var options = {
      title: 'Bekräftelse av radering',
      message: 'Är du säker på att du vill radera din kommentar?',
      buttons: [
        {
          label: 'Ja',
          onClick: () => handleDeleteComment(comment_id)
        },
        {
          label: 'Nej'
        }
      ]
    }
    confirmAlert(options)
  }
  const renderReplies = (replies) => {
    return (
      <ul className="comment-replies">
        {replies.map((reply, index) => (
          <li key={`${reply.comment_id}-${index}`} className="comment-item">
            {/* Similar structure as the original comment */}
            <div className="comment-header">
              <span className="comment-author">{reply.username}</span>
              <span className='comment-date'>{reply.created_on}</span>
              {reply.user_id.toString() === userId.toString() && (
                <button
                  className="delete-comment-button"
                  onClick={() => handleErase(reply.comment_id)}
                >
                  Delete
                </button>
              )}
            </div>
            <div className="comment-text">{reply.comment}</div>
          </li>
        ))}
      </ul>
    );
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
            <div className="comment-header">
              <span className="comment-author">{comment.username}</span>
              <span className='comment-date'>{comment.created_on}</span>
              {comment.user_id.toString() === userId.toString() && (
                <button
                  className="delete-comment-button"
                  onClick={() => handleErase(comment.comment_id)}
                >
                  Delete
                </button>
              )}
            </div>
            <div className="comment-text">{comment.comment}</div>
            {comment.replies && renderReplies(comment.replies)} {/* Render replies if available */}
            <div className="comment-reply">
              <textarea
                placeholder="Reply to this comment..."
                rows="1"
                value={replyContents[comment.comment_id] || ''}
                onChange={(e) => setReplyContents({ ...replyContents, [comment.comment_id]: e.target.value })}
              ></textarea>
              <button onClick={(e) => handleReplySubmit(e, comment.comment_id)}>Reply</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ); 
};

export default Comments;
