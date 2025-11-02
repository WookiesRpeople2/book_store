import { useIsRestoring } from '@tanstack/react-query';
import { FC, PropsWithChildren, ReactNode } from 'react';

type Props = {
  fallback?: ReactNode | null;
};

export const PersistGate: FC<PropsWithChildren<Props>> = ({ children, fallback = null }) => {
  const isRestoring = useIsRestoring();
  return isRestoring ? fallback : children;
};
