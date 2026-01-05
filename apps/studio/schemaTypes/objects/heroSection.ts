import { defineType } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero секция',
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
      description: 'Опционально, для якорных ссылок',
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
      name: 'headline',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subheadline',
      title: 'Подзаголовок',
      type: 'text',
      rows: 3,
    },
    {
      name: 'backgroundImage',
      title: 'Фоновое изображение',
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
    {
      name: 'videoUrl',
      title: 'URL видео (альтернатива изображению)',
      type: 'url',
      description: 'MP4 видео для фонового воспроизведения',
    },
    {
      name: 'primaryCta',
      title: 'Основная кнопка',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Текст кнопки',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Ссылка',
          type: 'string',
        },
      ],
    },
    {
      name: 'secondaryCta',
      title: 'Вторичная кнопка',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Текст кнопки',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Ссылка',
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
      enabled: 'enabled',
    },
    prepare(selection) {
      const { title, enabled } = selection;
      return {
        title: `Hero: ${title}`,
        subtitle: enabled ? '✓ Включена' : '✗ Выключена',
      };
    },
  },
});
