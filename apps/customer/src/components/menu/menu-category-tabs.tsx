import { Pressable, ScrollView, Text } from 'react-native';

type MenuCategoryTabsProps = {
  categories: { id: string; name: string }[];
  activeIndex: number;
  onPress: (index: number) => void;
};

export function MenuCategoryTabs({ categories, activeIndex, onPress }: MenuCategoryTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 24, paddingVertical: 12 }}
      className="bg-surface">
      {categories.map((category, index) => {
        const active = index === activeIndex;
        return (
          <Pressable
            key={category.id}
            onPress={() => onPress(index)}
            className={`rounded-pill px-4 py-2 ${active ? 'bg-brand' : 'bg-surface-alt'}`}
            accessibilityRole="button">
            <Text className={active ? 'font-medium text-white' : 'text-ink'}>{category.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
