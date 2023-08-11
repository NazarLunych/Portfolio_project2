import Routes from '../../config/routes';

export const footerData = [
  {
    colName: 'Company',
    colItems: [
      {name: 'About', link: Routes.About},
      {name: 'Contact', link: Routes.Contact},
      {name: 'Blogs', link: Routes.Blog},
    ],
  },
  {
    colName: 'Legal',
    colItems: [
      {name: 'Privacy Policy', link: '#'},
      {name: 'Terms & Services', link: '#'},
      {name: 'Terms of Use', link: '#'},
      {name: 'Refund Policy', link: '#'},
    ],
  },
  {
    colName: 'Quick Links',
    colItems: [
      {name: 'Techlabz Keybox', link: '#'},
      {name: 'Downloads', link: '#'},
      {name: 'Forum', link: '#'},
    ],
  },
];
