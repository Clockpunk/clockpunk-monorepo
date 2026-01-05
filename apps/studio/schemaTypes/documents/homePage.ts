import { defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Главная страница',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название (техническое)',
      type: 'string',
      initialValue: 'Главная страница',
      readOnly: true,
    },
    {
      name: 'sections',
      title: 'Секции главной страницы',
      type: 'array',
      description: 'Перетаскивайте секции для изменения порядка',
      of: [
        { type: 'heroSection' },
        { type: 'featuredArtworksSection' },
        { type: 'galleryGridSection' },
        { type: 'brandStorySection' },
        { type: 'processSection' },
        { type: 'pressSection' },
        { type: 'ctaSection' },
      ],
    },
  ],
});
