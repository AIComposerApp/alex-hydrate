export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  featuredTag?: string;
  dropdownItems?: {
    title: string;
    description: string;
    tag?: string;
    href: string;
  }[];
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  edition: string;
  description: string;
  sliderImage: string;
  thumbImage: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  image: string;
  ctas: { label: string; href: string }[];
  restOffsetY: string;
}
