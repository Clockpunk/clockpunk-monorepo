import { defineType } from 'sanity';

export const brandStorySection = defineType({
  name: 'brandStorySection',
  title: 'История бренда',
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
      name: 'body',
      title: 'Текст',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Альтернативный текст',
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      enabled: 'enabled',
      media: 'image',
    },
    prepare(selection) {
      const { title, enabled, media } = selection;
      return {
        title: `История: ${title}`,
        subtitle: enabled ? '✓ Включена' : '✗ Выключена',
        media,
      };
    },
  },
});
