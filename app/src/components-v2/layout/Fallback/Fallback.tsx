import React from 'react';

import styled from '@emotion/styled';

import Loader from '../Loader/Loader';

const StyledFallback = styled.div<{ minHeight: number }>`
  min-height: ${props => props.minHeight}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

type FallbackProps = {
  when: boolean;
  fallback?: string | React.ReactNode;
  minHeight?: number;
  render: () => React.ReactNode;
};

const Fallback: React.FC<FallbackProps> = ({ when, fallback = <Loader />, minHeight = 200, render }) => {
  if (when) {
    return <StyledFallback minHeight={minHeight}>{fallback}</StyledFallback>;
  }

  return <>{render()}</>;
};

export default Fallback;
