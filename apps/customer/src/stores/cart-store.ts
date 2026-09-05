import { create } from 'zustand';

export type CartSelectedOption = {
  optionId: string;
  groupId: string;
  name: string;
  priceDeltaCents: number;
};

export type CartLineItem = {
  id: string;
  menuItemId: string;
  name: string;
  basePriceCents: number;
  quantity: number;
  selectedOptions: CartSelectedOption[];
};

export type AddItemInput = {
  restaurantId: string;
  restaurantName: string;
  menuItemId: string;
  name: string;
  basePriceCents: number;
  quantity: number;
  selectedOptions: CartSelectedOption[];
};

export type AddItemResult =
  | { status: 'ok' }
  | { status: 'restaurant-conflict'; currentRestaurantName: string };

type CartState = {
  restaurantId: string | null;
  restaurantName: string | null;
  items: CartLineItem[];
  addItem: (input: AddItemInput) => AddItemResult;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
};

function generateLineId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function sortedOptionIds(options: CartSelectedOption[]): string {
  return options
    .map((o) => o.optionId)
    .sort()
    .join(',');
}

export const useCartStore = create<CartState>((set, get) => ({
  restaurantId: null,
  restaurantName: null,
  items: [],

  addItem: (input) => {
    const state = get();

    if (state.restaurantId && state.restaurantId !== input.restaurantId) {
      return { status: 'restaurant-conflict', currentRestaurantName: state.restaurantName ?? '' };
    }

    const incomingKey = sortedOptionIds(input.selectedOptions);
    const existing = state.items.find(
      (line) =>
        line.menuItemId === input.menuItemId && sortedOptionIds(line.selectedOptions) === incomingKey,
    );

    set({
      restaurantId: input.restaurantId,
      restaurantName: input.restaurantName,
      items: existing
        ? state.items.map((line) =>
            line.id === existing.id
              ? { ...line, quantity: line.quantity + input.quantity }
              : line,
          )
        : [
            ...state.items,
            {
              id: generateLineId(),
              menuItemId: input.menuItemId,
              name: input.name,
              basePriceCents: input.basePriceCents,
              quantity: input.quantity,
              selectedOptions: input.selectedOptions,
            },
          ],
    });

    return { status: 'ok' };
  },

  removeItem: (lineId) => {
    const items = get().items.filter((line) => line.id !== lineId);
    set(
      items.length === 0
        ? { items, restaurantId: null, restaurantName: null }
        : { items },
    );
  },

  updateQuantity: (lineId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(lineId);
      return;
    }
    set({
      items: get().items.map((line) => (line.id === lineId ? { ...line, quantity } : line)),
    });
  },

  clear: () => set({ items: [], restaurantId: null, restaurantName: null }),
}));

export function useCartItemCount() {
  return useCartStore((state) => state.items.reduce((sum, line) => sum + line.quantity, 0));
}

export function lineItemTotalCents(line: CartLineItem): number {
  const optionsTotal = line.selectedOptions.reduce((sum, o) => sum + o.priceDeltaCents, 0);
  return (line.basePriceCents + optionsTotal) * line.quantity;
}

export function useCartTotalCents() {
  return useCartStore((state) => state.items.reduce((sum, line) => sum + lineItemTotalCents(line), 0));
}
