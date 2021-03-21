import React from 'react';
import ChunkSkeleton from './ChunkSkeleton';

export default function MovieListSkeleton() {


  return (
    <>
      <div className="movie-list">
            <ChunkSkeleton/>
      </div>
    </>
  );
}
