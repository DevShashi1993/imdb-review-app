import React, { useState } from 'react';
import {
  Box,
  Text,
  Skeleton,
  Stack,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';

export default function ChunkSkeleton() {
  const ChunkSkeletonItems = () => {
    return (
        <div className="review-chunk">
          <div className="review-chunk-details">
          <Skeleton width='15em' height="3em" />
          <Skeleton width='30em' height="1em" mt={4} />
          <Skeleton width='30em' height="1em" mt={4}/>
          </div>
          <div className="review-chunk-score">
            <Skeleton height="8em" />
          </div>
        </div>
    );
  };

  return [...Array(4)].map((e, i) => <ChunkSkeletonItems key={i} />);
}
