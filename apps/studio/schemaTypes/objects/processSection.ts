import { defineType } from 'sanity';

export const processSection = defineType({
  name: 'processSection',
  title: 'Процесс создания',
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
      title: 'Этапы процесса',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Название этапа',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'text',
              title: 'Описание',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Иконка (опционально)',
              type: 'string',
              description: 'Название иконки или emoji',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'text',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
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
        title: `Процесс: ${title}`,
        subtitle: enabled ? '✓ Включена' : '✗ Выключена',
      };
    },
  },
});
