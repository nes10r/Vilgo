// Minimal hand-written types for the Phase A tables (profiles, addresses).
// Once the Supabase CLI is wired up, replace this file with generated types:
//   supabase gen types typescript --project-id <id> > src/types/supabase.ts

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
        Relationships: [];
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          label: string;
          line1: string;
          line2: string | null;
          city: string | null;
          postal_code: string | null;
          country: string | null;
          lat: number;
          lng: number;
          delivery_instructions: string | null;
          is_default: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['addresses']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['addresses']['Row']>;
        Relationships: [];
      };
      restaurants: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          cover_image_url: string | null;
          logo_url: string | null;
          cuisine_tags: string[];
          rating: number;
          rating_count: number;
          price_range: number;
          lat: number;
          lng: number;
          address_line: string;
          delivery_fee_cents: number;
          min_order_cents: number;
          avg_prep_time_minutes: number;
          opening_hours: Record<string, string>;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['restaurants']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['restaurants']['Row']>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      nearby_restaurants: {
        Args: {
          user_lat: number;
          user_lng: number;
          radius_meters?: number;
          search_query?: string | null;
          cuisine_tag?: string | null;
          min_price?: number | null;
          max_price?: number | null;
          min_rating?: number | null;
          limit_count?: number;
          offset_count?: number;
        };
        Returns: (Database['public']['Tables']['restaurants']['Row'] & {
          distance_meters: number;
        })[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Address = Database['public']['Tables']['addresses']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Restaurant = Database['public']['Tables']['restaurants']['Row'];
export type RestaurantWithDistance = Restaurant & { distance_meters: number };
