import { useQuery } from '@tanstack/react-query';

import { fetchDefaultAddress } from '@/features/addresses/api';
import { useAuth } from '@/features/auth/auth-provider';

export function useDefaultAddress() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['default-address', user?.id],
    queryFn: () => fetchDefaultAddress(user!.id),
    enabled: !!user,
  });
}
