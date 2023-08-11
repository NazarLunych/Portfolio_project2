import Routes from '../../config/routes';

export const MenuItemName = {
  home: 'Home',
  features: 'Features',
  blog: 'Blog',
  shop: 'Shop',
  about: 'About',
  contact: 'Contact',
};

export const menu = [
  {name: MenuItemName.home, url: Routes.Home},
  {name: MenuItemName.features, url: '', subMenu: ['Item 1', 'Item 2', 'Item 3']},
  {name: MenuItemName.blog, url: Routes.Blog},
  {name: MenuItemName.shop, url: Routes.Shop},
  {name: MenuItemName.about, url: Routes.About},
  {name: MenuItemName.contact, url: Routes.Contact},
];
