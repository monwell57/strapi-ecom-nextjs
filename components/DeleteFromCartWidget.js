const { useState } = require('react');
import { useMutation } from 'react-query';
import { fetchJson } from '../lib/api';
import Button from './Button';

function DeleteFromCartWidget({ productId }) {
 
  const mutation = useMutation(() =>
    fetchJson('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId})
    }));

  const handleRemoveClick = async () => {
    await mutation.mutateAsync();
  };

  return (
    <div className="py-2">
      {mutation.isLoading ? (
        <p>Loading...</p>
      ) : (
        <Button onClick={handleRemoveClick}>
          Remove
        </Button>
      )}
    </div>
  );
}

export default DeleteFromCartWidget;