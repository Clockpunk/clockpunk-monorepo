import { defineType } from 'sanity';

export const pressSection = defineType({
  name: 'pressSection',
  title: 'Пресса и выставки',
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
      name: 'items',
      title: 'Публикации и события',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Название',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'place',
              title: 'Место/Издание',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'date',
              title: 'Дата',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Ссылка (опционально)',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'place',
            },
          },
        },
      ],
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
        title: `Пресса: ${title}`,
        subtitle: enabled ? '✓ Включена' : '✗ Выключена',
      };
    },
  },
});
