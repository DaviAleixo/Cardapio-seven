export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  subcategory: string;
  featured?: boolean;
  tags?: string[];
}

export type MenuCategory = 'food' | 'drinks' | 'cocktails' | 'chopp' | 'beer' | 'non-alcoholic' | 'combos' | 'doses' | 'challenge';

export interface CategoryInfo {
  id: MenuCategory;
  name: string;
  icon: string;
}

export interface SubcategoryInfo {
  id: string;
  name: string;
  categoryId: string;
}