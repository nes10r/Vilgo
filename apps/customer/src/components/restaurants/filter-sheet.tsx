import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { CUISINE_CATEGORIES } from '@/features/restaurants/cuisine-categories';
import { EMPTY_FILTERS, type RestaurantFilters } from '@/features/restaurants/types';

type FilterSheetProps = {
  filters: RestaurantFilters;
  onApply: (filters: RestaurantFilters) => void;
};

const PRICE_TIERS = [1, 2, 3, 4];
const RATING_TIERS = [3.5, 4.0, 4.5];

export const FilterSheet = forwardRef<BottomSheetModal, FilterSheetProps>(
  ({ filters, onApply }, ref) => {
    const [draft, setDraft] = useState<RestaurantFilters>(filters);

    return (
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing
        onChange={(index) => {
          if (index === 0) setDraft(filters);
        }}>
        <BottomSheetView className="gap-6 px-6 pb-10 pt-2">
          <View className="gap-3">
            <Text className="text-sm font-semibold text-ink-secondary">Mətbəx</Text>
            <View className="flex-row flex-wrap gap-2">
              {CUISINE_CATEGORIES.map((category) => {
                const selected = draft.cuisineTag === category.slug;
                return (
                  <Pressable
                    key={category.slug}
                    onPress={() =>
                      setDraft((prev) => ({
                        ...prev,
                        cuisineTag: selected ? null : category.slug,
                      }))
                    }
                    className={`rounded-pill px-4 py-2 ${selected ? 'bg-brand' : 'bg-surface-alt'}`}>
                    <Text className={selected ? 'text-white' : 'text-ink'}>{category.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-ink-secondary">Qiymət səviyyəsi</Text>
            <View className="flex-row gap-2">
              {PRICE_TIERS.map((tier) => {
                const selected = draft.priceTier === tier;
                return (
                  <Pressable
                    key={tier}
                    onPress={() =>
                      setDraft((prev) => ({ ...prev, priceTier: selected ? null : tier }))
                    }
                    className={`flex-1 items-center rounded-card py-3 ${selected ? 'bg-brand' : 'bg-surface-alt'}`}>
                    <Text className={selected ? 'text-white' : 'text-ink'}>{'₼'.repeat(tier)}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="gap-3">
            <Text className="text-sm font-semibold text-ink-secondary">Minimum reytinq</Text>
            <View className="flex-row gap-2">
              {RATING_TIERS.map((tier) => {
                const selected = draft.minRating === tier;
                return (
                  <Pressable
                    key={tier}
                    onPress={() =>
                      setDraft((prev) => ({ ...prev, minRating: selected ? null : tier }))
                    }
                    className={`flex-1 items-center rounded-card py-3 ${selected ? 'bg-brand' : 'bg-surface-alt'}`}>
                    <Text className={selected ? 'text-white' : 'text-ink'}>{tier.toFixed(1)}+</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="flex-row gap-3">
            <Button
              label="Sıfırla"
              variant="secondary"
              className="flex-1"
              onPress={() => setDraft(EMPTY_FILTERS)}
            />
            <Button
              label="Tətbiq et"
              className="flex-1"
              onPress={() => {
                onApply(draft);
                if (typeof ref !== 'function') ref?.current?.dismiss();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);
FilterSheet.displayName = 'FilterSheet';
