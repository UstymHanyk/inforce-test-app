import React from 'react';
import { Comment } from '../../types/Comment';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  productId: number;
  onDelete: (productId: number, commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, productId, onDelete }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  // Sort comments by date (newest first)
  const sortedComments = [...comments].sort((a, b) => {
    return new Date(b.date.split(' ').reverse().join(' ')).getTime() - 
           new Date(a.date.split(' ').reverse().join(' ')).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={() => onDelete(productId, comment.id)}
        />
      ))}
    </div>
  );
};

export default CommentList;
