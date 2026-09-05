import { supabase } from '@/lib/supabase';
import type { Address } from '@/types/supabase';

export async function fetchDefaultAddress(userId: string): Promise<Address | null> {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createAddress(input: {
  userId: string;
  label: string;
  line1: string;
  city: string | null;
  lat: number;
  lng: number;
  deliveryInstructions?: string;
}) {
  const { error } = await supabase.from('addresses').insert({
    user_id: input.userId,
    label: input.label,
    line1: input.line1,
    line2: null,
    city: input.city,
    postal_code: null,
    country: null,
    lat: input.lat,
    lng: input.lng,
    delivery_instructions: input.deliveryInstructions ?? null,
    is_default: true,
  });

  if (error) throw error;
}
