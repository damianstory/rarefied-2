// Tag categories for episode filtering

export type TagCategory = "type" | "region" | "habitat" | "status" | "topic";

export interface TagCategoryConfig {
  id: TagCategory;
  label: string;
  tags: string[];
}

// Map of all tags to their categories
export const TAG_CATEGORIES: TagCategoryConfig[] = [
  {
    id: "type",
    label: "Animal Type",
    tags: [
      "mammal",
      "birds",
      "fish",
      "insects",
      "amphibian",
      "reptile",
      "plants",
      "marine",
      "pollinators",
    ],
  },
  {
    id: "region",
    label: "Region",
    tags: [
      "ontario",
      "british columbia",
      "west coast",
      "arctic",
      "united states",
      "boreal forest",
      "carolinian forest",
    ],
  },
  {
    id: "habitat",
    label: "Habitat",
    tags: [
      "wetland",
      "ocean",
      "mountains",
      "riparian",
      "urban species",
      "old growth forest",
      "river",
      "alvar",
      "aquatic",
    ],
  },
  {
    id: "status",
    label: "Conservation Status",
    tags: ["endangered", "threatened", "special concern"],
  },
  {
    id: "topic",
    label: "Topic",
    tags: [
      "captive breeding program",
      "community science",
      "translocation",
      "headstarting",
      "road mortality",
      "noise pollution",
      "pest control",
      "genetics",
      "data gaps",
    ],
  },
];

// Get category for a tag
export function getCategoryForTag(tag: string): TagCategory | null {
  const normalizedTag = tag.toLowerCase();
  for (const category of TAG_CATEGORIES) {
    if (category.tags.includes(normalizedTag)) {
      return category.id;
    }
  }
  return null;
}

// Get all tags in a category
export function getTagsInCategory(categoryId: TagCategory): string[] {
  const category = TAG_CATEGORIES.find((c) => c.id === categoryId);
  return category?.tags || [];
}

// Get category config by id
export function getCategoryConfig(
  categoryId: TagCategory
): TagCategoryConfig | undefined {
  return TAG_CATEGORIES.find((c) => c.id === categoryId);
}

// Format tag for display (capitalize)
export function formatTag(tag: string): string {
  return tag
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Get categorized tags from an episode's tag list
export function categorizeEpisodeTags(
  tags: string[]
): Record<TagCategory, string[]> {
  const result: Record<TagCategory, string[]> = {
    type: [],
    region: [],
    habitat: [],
    status: [],
    topic: [],
  };

  tags.forEach((tag) => {
    const category = getCategoryForTag(tag);
    if (category) {
      result[category].push(tag);
    }
  });

  return result;
}
