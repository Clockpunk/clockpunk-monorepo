import { defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название сайта',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Описание сайта',
      type: 'text',
      rows: 3,
    },
    {
      name: 'ogImage',
      title: 'OG изображение',
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
      name: 'logo',
      title: 'Логотип',
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
      name: 'socials',
      title: 'Социальные сети',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Название',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'contacts',
      title: 'Контакты',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Телефон',
          type: 'string',
        },
        {
          name: 'telegram',
          title: 'Telegram',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Адрес',
          type: 'text',
          rows: 3,
        },
      ],
    },
    {
      name: 'seoDefaults',
      title: 'SEO настройки по умолчанию',
      type: 'object',
      fields: [
        {
          name: 'noindex',
          title: 'Запретить индексацию',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'canonicalBase',
          title: 'Базовый URL для canonical',
          type: 'url',
          description: 'Например: https://clockpunks.ru',
        },
      ],
    },
  ],
});
