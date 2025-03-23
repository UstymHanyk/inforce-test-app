import React, { useState } from 'react';
import { CommentFormData } from '../../types/Comment';
import Button from '../common/Button';

interface CommentFormProps {
  productId: number;
  onSubmit: (comment: CommentFormData) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ productId, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    
    onSubmit({
      productId,
      description: description.trim(),
    });
    
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Add a comment
        </label>
        <div className="mt-1">
          <textarea
            id="comment"
            name="comment"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
            placeholder="Write your comment here..."
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="sm">
          Add Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
