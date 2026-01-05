import { defineType } from 'sanity';

export const galleryGridSection = defineType({
  name: 'galleryGridSection',
  title: 'Галерея работ',
  type: 'object',
  fields: [
    {
      name: 'enabled',
      title: 'Включена',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'id',
      title: 'ID секции (anchor)',
      type: 'string',
    },
    {
      name: 'theme',
      title: 'Тема',
      type: 'string',
      options: {
        list: [
          { title: 'Темная', value: 'dark' },
          { title: 'Светлая', value: 'light' },
        ],
      },
      initialValue: 'dark',
    },
    {
      name: 'title',
      title: 'Заголовок секции',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'text',
      rows: 2,
    },
    {
      name: 'artworks',
      title: 'Работы',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
    },
    prepare(selection) {
      const { title, enabled } = selection;
      return {
        title: `Галерея: ${title}`,
        subtitle: enabled ? '✓ Включена' : '✗ Выключена',
      };
    },
  },
});
