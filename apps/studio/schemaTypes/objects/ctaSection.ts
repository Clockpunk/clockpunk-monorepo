import { defineType } from 'sanity';

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'Призыв к действию (CTA)',
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
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Текст',
      type: 'text',
      rows: 3,
    },
    {
      name: 'cta',
      title: 'Кнопка',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Текст кнопки',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'href',
          title: 'Ссылка',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
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
        title: `CTA: ${title}`,
        subtitle: enabled ? '✓ Включена' : '✗ Выключена',
      };
    },
  },
});
