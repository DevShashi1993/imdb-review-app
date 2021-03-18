import React, { useState } from 'react';
import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
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
