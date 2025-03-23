
import React from 'react';
import { Comment } from '../../types/Comment';
import Button from '../common/Button';
import { TrashIcon } from '@heroicons/react/24/outline';

interface CommentItemProps {
  comment: Comment;
  onDelete: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-700">{comment.description}</p>
          <p className="text-xs text-gray-500 mt-1">{comment.date}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CommentItem;