import { defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Страницы',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название страницы',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Секции страницы',
      type: 'array',
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
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'ogImage',
          title: 'OG изображение',
          type: 'image',
        },
        {
          name: 'noindex',
          title: 'Запретить индексацию',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
  ],
});
