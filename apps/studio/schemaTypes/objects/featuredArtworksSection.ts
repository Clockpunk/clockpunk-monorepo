import { defineType } from 'sanity';

export const featuredArtworksSection = defineType({
  name: 'featuredArtworksSection',
  title: 'Избранные работы',
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
      name: 'autoFeatured',
      title: 'Автоматический выбор',
      type: 'boolean',
      description: 'Автоматически показывать работы с флагом "Избранная работа"',
      initialValue: true,
    },
    {
      name: 'items',
      title: 'Работы (ручной выбор)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
      hidden: ({ parent }) => parent?.autoFeatured,
    },
    {
      name: 'showCount',
      title: 'Количество работ для отображения',
      type: 'number',
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(12),
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
      auto: 'autoFeatured',
    },
    prepare(selection) {
      const { title, enabled, auto } = selection;
      return {
        title: `Избранные: ${title}`,
        subtitle: `${enabled ? '✓' : '✗'} • ${auto ? 'Авто' : 'Ручной выбор'}`,
      };
    },
  },
});
